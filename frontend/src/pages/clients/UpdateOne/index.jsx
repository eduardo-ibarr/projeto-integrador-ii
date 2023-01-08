import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
	Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { SideMenu, ToastError, ToastSuccess } from '../../../components';

import { theme } from '../../../theme/theme';

import { FooterSubmits, HeaderText, LoadingPage } from '../../../components';

import { clientReducer } from './state/clientReducer';
import { clientInitialState } from './state/clientInitialState';

import { useShowClient, useUpdateClient } from '../../../hooks/clients';

const warningMessage = 'Preencha corretamente este campo';

let schema = yup.object().shape({
	name: yup.string().required(warningMessage),
	phoneNumber: yup.number().required(warningMessage),
	rg: yup.string().required(warningMessage),
	cpf: yup.string().required(warningMessage),
	address: yup.string().required(warningMessage),
});

export const UpdateOneClientPage = () => {
	const { id } = useParams();

	const { data: client, isLoading: isLoadingClient } = useShowClient(id);

	const { mutateAsync: updateClient } = useUpdateClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [clientState, dispatchClient] = useReducer(
		clientReducer,
		clientInitialState
	);

	const isDisabled = useMemo(
		() =>
			clientState.name.disabled &&
			clientState.phoneNumber.disabled &&
			clientState.cpf.disabled &&
			clientState.rg.disabled &&
			clientState.address.disabled,
		[clientState]
	);

	const [showToast, setShowToast] = useState({
		error: false,
		success: false,
	});

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

	const handleDisableName = () => {
		dispatchClient({
			type: 'DISABLE_NAME',
			disabled: !clientState.name.disabled,
		});
	};

	const handleDisablePhoneNumber = () => {
		dispatchClient({
			type: 'DISABLE_PHONE_NUMBER',
			disabled: !clientState.phoneNumber.disabled,
		});
	};

	const handleDisableCPF = () => {
		dispatchClient({
			type: 'DISABLE_CPF',
			disabled: !clientState.cpf.disabled,
		});
	};

	const handleDisableRG = () => {
		dispatchClient({
			type: 'DISABLE_RG',
			disabled: !clientState.rg.disabled,
		});
	};

	const handleDisableAddress = () => {
		dispatchClient({
			type: 'DISABLE_ADDRESS',
			disabled: !clientState.address.disabled,
		});
	};

	const generateClient = (data) => {
		const { name, phoneNumber, rg, cpf, address } = data;

		return {
			name,
			phoneNumber,
			rg,
			cpf,
			address,
			updatedAt: new Date(),
		};
	};

	const onSubmit = async (data) => {
		clearErrors();

		try {
			const client = generateClient(data);

			await updateClient({ id, data: client });

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

	useEffect(() => {
		if (!isLoadingClient) {
			const { name, phoneNumber, rg, cpf, address } = client[0];

			reset({
				name,
				phoneNumber,
				rg,
				cpf,
				address,
			});
		}
	}, [client]);

	if (isLoadingClient) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeClients />
				</Grid>

				<Grid
					item
					xl={6}
					lg={9}
					md={8}
					sm={7}
					xs={6}
					sx={{ padding: '20px 60px 0 0px' }}
				>
					<HeaderText text="Atualização de cadastro do cliente" />

					<Paper sx={{ padding: '20px', marginTop: '20px' }}>
						<Stack spacing={2}>
							<FormControl
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<TextField
									{...register('name')}
									fullWidth
									id="outlined-basic"
									label="Nome completo"
									disabled={clientState.name.disabled}
									variant="outlined"
									error={!!errors?.name}
								/>
								{!!errors?.name && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.name?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableName}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>

							<FormControl
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Número de celular com DDD"
									variant="outlined"
									disabled={clientState.phoneNumber.disabled}
									{...register('phoneNumber')}
									error={!!errors?.phoneNumber}
								/>
								{errors?.phoneNumber?.type === 'typeError' && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										Preencha apenas numeros.
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										onClick={handleDisablePhoneNumber}
									>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>

							<FormControl
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<TextField
									fullWidth
									id="outlined-basic"
									label="CPF"
									disabled={clientState.cpf.disabled}
									variant="outlined"
									{...register('cpf')}
									error={!!errors?.cpf}
								/>
								{errors?.cpf && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.cpf?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableCPF}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>

							<FormControl
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<TextField
									fullWidth
									id="outlined-basic"
									label="RG"
									disabled={clientState.rg.disabled}
									variant="outlined"
									{...register('rg')}
									error={!!errors?.rg}
								/>
								{errors?.rg && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.rg?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableRG}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>

							<FormControl
								sx={{
									display: 'flex',
									alignItems: 'center',
									flexDirection: 'row',
								}}
							>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Endereço"
									disabled={clientState.address.disabled}
									variant="outlined"
									{...register('address')}
									error={!!errors?.address}
								/>
								{errors?.address && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.address?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableAddress}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo={`/clientes/${id}`}
						isDisabled={isDisabled}
						onClick={handleSubmit(onSubmit)}
						text="Alterar o cadastro"
					/>
				</Grid>
			</Grid>

			<ToastError
				open={showToast.error}
				handleClose={handleCloseToastError}
			/>

			<ToastSuccess
				open={showToast.success}
				handleClose={handleCloseToastSuccess}
			/>
		</ThemeProvider>
	);
};
