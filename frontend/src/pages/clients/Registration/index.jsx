import React, { useState } from 'react';
import { v4 } from 'uuid';

import {
	Grid,
	Paper,
	TextField,
	ThemeProvider,
	FormControl,
} from '@mui/material';

import { Stack } from '@mui/system';

import { useForm } from 'react-hook-form';

import {
	SideMenu,
	FooterSubmits,
	HeaderText,
	ToastError,
	ToastSuccess,
	ErrorMessage,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { useCreateClient } from '../../../hooks/clients';

import {
	validateCPF,
	validatePhoneNumber,
	validateRG,
	validateText,
} from '../utils';

export const ClientRegistrationPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { mutateAsync: createNewClient, isLoading } = useCreateClient();

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

	const generateClient = (data) => {
		return {
			_id: v4(),
			name: data.name,
			isActive: true,
			phoneNumber: data.phoneNumber,
			cpf: data.cpf,
			rg: data.rg,
			address: data.address,
			services: [],
			createdAt: new Date(),
		};
	};

	const onSubmit = async (data) => {
		try {
			const client = generateClient(data);
			await createNewClient(client);
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

	errors;

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
					<HeaderText text="Área de cadastro de novos clientes" />

					<Paper sx={{ padding: '20px', marginTop: '20px' }}>
						<Stack spacing={2}>
							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Nome completo"
									variant="outlined"
									error={!!errors?.name}
									{...register('name', {
										required: true,
										validate: (value) => validateText(value),
									})}
								/>

								{errors?.name?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.name?.type === 'validate' && (
									<ErrorMessage message="Informe um nome válido." />
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Número de celular com DDD"
									variant="outlined"
									error={!!errors?.phoneNumber}
									{...register('phoneNumber', {
										required: true,
										validate: (value) => validatePhoneNumber(value),
									})}
								/>

								{errors?.phoneNumber?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.phoneNumber?.type === 'validate' && (
									<ErrorMessage message="Informe um número de celular válido." />
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="CPF"
									variant="outlined"
									error={!!errors?.cpf}
									{...register('cpf', {
										required: true,
										validate: (value) => validateCPF(value),
									})}
								/>

								{errors?.cpf?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.cpf?.type === 'validate' && (
									<ErrorMessage message="Informe um CPF válido." />
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="RG"
									variant="outlined"
									error={!!errors?.rg}
									{...register('rg', {
										required: true,
										validate: (value) => validateRG(value),
									})}
								/>

								{errors?.rg?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.rg?.type === 'validate' && (
									<ErrorMessage message="Informe um RG válido." />
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Endereço"
									variant="outlined"
									error={!!errors?.address}
									{...register('address', {
										required: true,
										validate: (value) => validateText(value),
									})}
								/>

								{errors?.address?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.address?.type === 'validate' && (
									<ErrorMessage message="Informe um endereço válido." />
								)}
							</FormControl>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/clientes"
						isDisabled={false}
						isLoading={isLoading}
						onClick={handleSubmit(onSubmit)}
						text="Fazer o cadastro"
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
