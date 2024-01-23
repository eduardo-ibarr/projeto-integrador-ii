import React, { useState } from 'react';

import { v4 } from 'uuid';
import 'dayjs/locale/pt-br';

import {
	Autocomplete,
	Box,
	FormControl,
	Grid,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
	Typography,
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';

import { theme } from '../../theme/theme';

import {
	SideMenu,
	FooterSubmits,
	HeaderText,
	LoadingPage,
	ToastSuccess,
	ToastError,
	ErrorMessage,
} from '../../components';

import { useListActiveClients, useUpdateClient } from '../../hooks/clients';
import { useListActiveWorks } from '../../hooks/works';
import { useCreateAttendance } from '../../hooks/attendance';

export const AttendancePage = () => {
	const { data: clients, isLoading: isLoadingClients } = useListActiveClients();
	const { data: works, isLoading: isLoadingWorks } = useListActiveWorks();

	const { mutateAsync: updateClient } = useUpdateClient();
	const { mutateAsync: createAttendance } = useCreateAttendance();

	const [showToast, setShowToast] = useState({
		error: false,
		success: false,
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	if (isLoadingClients || isLoadingWorks) {
		return <LoadingPage />;
	}

	const clientsNames = clients.map((client) => client.name);
	const worksNames = works.map((service) => service.name);

	const handleCloseToastSuccess = () => {
		setShowToast((current) => {
			return {
				...current,
				success: false,
			};
		});
	};

	const handleCloseToastError = () => {
		setShowToast((current) => {
			return {
				...current,
				error: false,
			};
		});
	};

	const generateAttendance = ({ clientSelected, data, workselected }) => {
		return {
			_id: v4(),
			client: clientSelected._id,
			isActive: true,
			date: new Date(data.date + ' ' + data.time),
			works: workselected,
			total: workselected.price,
			isPaid: false,
			isDone: false,
			createdAt: new Date(),
		};
	};

	const updateClientSelectedWithAttendance = ({
		clientSelected,
		attendance,
	}) => {
		clientSelected.works.push(attendance._id);
	};

	const findSelectedValuesOn = (data) => {
		const clientSelected = clients.find(
			(client) => client.name === data.client
		);
		const workselected = works.find((service) => service.name === data.service);
		return {
			clientSelected,
			workselected,
		};
	};

	const sendRequests = async ({ attendance, clientSelected }) => {
		try {
			await createAttendance(attendance);
			await updateClient({
				data: clientSelected,
				id: clientSelected._id,
			});
			setShowToast((current) => {
				return {
					...current,
					success: true,
				};
			});
		} catch (error) {
			setShowToast((current) => {
				return {
					...current,
					error: true,
				};
			});
			console.error(error);
		}
	};

	const onSubmit = async (data) => {
		const { clientSelected, workselected } = findSelectedValuesOn(data);
		const attendance = generateAttendance({
			clientSelected,
			data,
			workselected,
		});
		updateClientSelectedWithAttendance({ clientSelected, attendance });
		await sendRequests({ attendance, clientSelected });
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeAttendances />
				</Grid>

				<Grid
					item
					xl={6}
					lg={9}
					md={8}
					sm={7}
					xs={6}
					sx={{
						padding: '20px 60px 0 0px',
					}}
				>
					<HeaderText text="Marque um novo horário de atendimento por aqui" />

					<Paper sx={{ padding: '20px', marginTop: '20px' }}>
						<Stack spacing={2}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									width: '60%',
								}}
							>
								<FormControl>
									<Autocomplete
										disablePortal
										options={clientsNames}
										renderInput={(params) => (
											<TextField
												{...params}
												label="Selecione um cliente"
												error={!!errors.client}
												{...register('client', {
													required: true,
												})}
											/>
										)}
									/>
									{!!errors.client && (
										<ErrorMessage message="O campo é obrigatório." />
									)}
								</FormControl>

								<FormControl>
									<Autocomplete
										{...register('service')}
										disablePortal
										options={worksNames}
										sx={{ marginTop: '1rem' }}
										renderInput={(params) => (
											<TextField
												{...params}
												error={!!errors.service}
												label="Selecione um serviço"
												{...register('service', {
													required: true,
												})}
											/>
										)}
									/>

									{!!errors.service && (
										<ErrorMessage message="O campo é obrigatório." />
									)}
								</FormControl>
							</Box>

							<Typography>
								Selecione uma data e um horário para o atendimento
							</Typography>

							<Box sx={{ display: 'flex' }}>
								<FormControl sx={{ width: '20%', marginRight: '2rem' }}>
									<Controller
										render={(props) => (
											<TextField
												{...props}
												error={!!errors.date}
												type="date"
												{...register('date', {
													required: true,
												})}
											/>
										)}
										name="date"
										control={control}
									/>

									{!!errors.date && (
										<ErrorMessage message="O campo é obrigatório." />
									)}
								</FormControl>

								<FormControl sx={{ width: '15%' }}>
									<Controller
										render={(props) => (
											<TextField
												{...props}
												error={!!errors.time}
												type="time"
												{...register('time', {
													required: true,
												})}
											/>
										)}
										name="time"
										control={control}
									/>

									{!!errors.time && (
										<ErrorMessage message="O campo é obrigatório." />
									)}
								</FormControl>
							</Box>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/home"
						isLoading={false}
						onClick={handleSubmit(onSubmit)}
						text="Marcar atendimento"
					/>
				</Grid>
			</Grid>

			<ToastError open={showToast.error} handleClose={handleCloseToastError} />

			<ToastSuccess
				open={showToast.success}
				handleClose={handleCloseToastSuccess}
			/>
		</ThemeProvider>
	);
};
