import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Box,
	FormControl,
	Grid,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import {
	ErrorMessage,
	SideMenu,
	ToastError,
	ToastSuccess,
	TooltipEdit,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { FooterSubmits, HeaderText, LoadingPage } from '../../../components';

import { clientReducer } from './state/clientReducer';
import { clientInitialState } from './state/clientInitialState';

import { useShowClient, useUpdateClient } from '../../../hooks/clients';

import {
	validateCPF,
	validatePhoneNumber,
	validateRG,
	validateText,
} from '../utils';

export const UpdateOneClientPage = () => {
	const { id } = useParams();

	const { data: client, isLoading: isLoadingClient } = useShowClient(id);

	const { mutateAsync: updateClient } = useUpdateClient();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	errors;

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
							<Box>
								<FormControl
									sx={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
									}}
								>
									<TextField
										{...register('name', {
											required: true,
											validate: (value) => validateText(value),
										})}
										fullWidth
										id="outlined-basic"
										label="Nome completo"
										disabled={clientState.name.disabled}
										variant="outlined"
										error={!!errors?.name}
									/>

									<TooltipEdit onClick={handleDisableName} />
								</FormControl>

								{errors?.name?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.name?.type === 'validate' && (
									<ErrorMessage message="Informe um nome válido." />
								)}
							</Box>

							<Box>
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
										{...register('phoneNumber', {
											required: true,
											validate: (value) => validatePhoneNumber(value),
										})}
										error={!!errors?.phoneNumber}
									/>

									<TooltipEdit onClick={handleDisablePhoneNumber} />
								</FormControl>

								{errors?.phoneNumber?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.phoneNumber?.type === 'validate' && (
									<ErrorMessage message="Informe um número de celular válido." />
								)}
							</Box>

							<Box>
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
										{...register('cpf', {
											required: true,
											validate: (value) => validateCPF(value),
										})}
										error={!!errors?.cpf}
									/>

									<TooltipEdit onClick={handleDisableCPF} />
								</FormControl>

								{errors?.cpf?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.cpf?.type === 'validate' && (
									<ErrorMessage message="Informe um CPF válido." />
								)}
							</Box>

							<Box>
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
										{...register('rg', {
											required: true,
											validate: (value) => validateRG(value),
										})}
										error={!!errors?.rg}
									/>

									<TooltipEdit onClick={handleDisableRG} />
								</FormControl>

								{errors?.rg?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.rg?.type === 'validate' && (
									<ErrorMessage message="Informe um RG válido." />
								)}
							</Box>

							<Box>
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
										error={!!errors?.address}
										{...register('address', {
											required: true,
											validate: (value) => validateText(value),
										})}
									/>

									<TooltipEdit onClick={handleDisableAddress} />
								</FormControl>

								{errors?.address?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.address?.type === 'validate' && (
									<ErrorMessage message="Informe um endereço válido." />
								)}
							</Box>
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

			<ToastError open={showToast.error} handleClose={handleCloseToastError} />

			<ToastSuccess
				open={showToast.success}
				handleClose={handleCloseToastSuccess}
			/>
		</ThemeProvider>
	);
};
