import React, { useMemo } from 'react';
import { useState } from 'react';

import { v4 } from 'uuid';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import {
	Autocomplete,
	Box,
	FormControl,
	FormHelperText,
	Grid,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

import { theme } from '../../theme/theme';

import { SideMenu } from '../../components/SideMenu/index';
import { ModalSucess } from '../../components/ModalSucess/index';

import { FooterSubmits } from '../../components/FooterSubmits';
import { HeaderText } from '../../components/HeaderText';
import { useListClients } from '../../hooks/clients/useListClients';
import { useListServices } from '../../hooks/services/useListServices';
import { useForm } from 'react-hook-form';
import { useCreateAttendance } from '../../hooks/attendance/useCreateAttendance';
import { useUpdateClient } from '../../hooks/clients/useUpdateClient';

export const AttendancePage = () => {
	const { data: clients, isLoading: isLoadingClients } = useListClients();
	const { data: services, isLoading: isLoadingServices } = useListServices();

	const { mutateAsync: updateService } = useUpdateClient();
	const { mutateAsync: createAttendance } = useCreateAttendance();

	const { register, handleSubmit } = useForm();

	const [showModal, setShowModal] = useState(false);

	if (isLoadingClients) {
		return <h3>Carregando...</h3>;
	}

	if (isLoadingServices) {
		return <h3>Carregando...</h3>;
	}

	const clientsNames = clients.map((client) => client.name);
	const servicesNames = services.map((service) => service.name);

	// const isDisabled = useMemo(
	// 	() =>
	// 		client === null ||
	// 		service === null ||
	// 		dateValue === null,
	// 	[clientsState, servicesState, dateValue]
	// );

	const onSubmit = async (data) => {
		const clientSelected = clients.find(
			(client) => client.name === data.client
		);
		const serviceSelected = services.find(
			(service) => service.name === data.service
		);

		const attendance = {
			_id: v4(),
			client: clientSelected._id,
			isActive: true,
			date: new Date(data.day + ' ' + data.hours),
			services: serviceSelected,
			total: serviceSelected.price,
			isPaid: false,
			isDone: false,
			createdAt: new Date(),
		};

		clientSelected.services.push(attendance._id);

		try {
			await createAttendance(attendance);
			await updateService({
				id: clientSelected._id,
				data: clientSelected,
			});
		} catch (error) {
			console.error(error);
		}

		// setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		window.location.reload();
	};

	if (isLoadingClients) {
		return <h3>Carregando...</h3>;
	}

	if (isLoadingServices) {
		return <h3>Carregando...</h3>;
	}
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
							<Box>
								<FormControl>
									<Autocomplete
										disablePortal
										options={clientsNames}
										renderInput={(params) => (
											<TextField
												{...params}
												{...register('client')}
												label="Escolha um cliente"
											/>
										)}
									/>
									<FormHelperText></FormHelperText>
								</FormControl>

								<FormControl>
									<Autocomplete
										{...register('service')}
										disablePortal
										options={servicesNames}
										sx={{ margin: '20px 0 10px 0' }}
										renderInput={(params) => (
											<TextField
												{...params}
												{...register('service')}
												label="Escolha um serviço"
											/>
										)}
									/>
									<FormHelperText></FormHelperText>
								</FormControl>
							</Box>

							<Box>
								<FormControl>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
										adapterLocale="pt-br"
									>
										<DatePicker
											label="Escolha uma data"
											renderInput={(params) => (
												<TextField
													{...params}
													{...register('day')}
												/>
											)}
										/>
									</LocalizationProvider>
									<FormHelperText></FormHelperText>
								</FormControl>
							</Box>

							<Box>
								<FormControl>
									<LocalizationProvider
										dateAdapter={AdapterDayjs}
										adapterLocale="pt-br"
									>
										<TimePicker
											label="Escolha um horario"
											renderInput={(params) => (
												<TextField
													{...params}
													{...register('hours')}
												/>
											)}
										/>
									</LocalizationProvider>
									<FormHelperText></FormHelperText>
								</FormControl>
							</Box>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/home"
						isDisabled={false}
						isLoading={false}
						onClick={handleSubmit(onSubmit)}
						text="Marcar atendimento"
					/>
				</Grid>
			</Grid>

			{showModal && (
				<ModalSucess
					handleClose={handleClose}
					text="O atendimento foi criado com êxito!"
				/>
			)}
		</ThemeProvider>
	);
};
