import React, { useState } from 'react';
import { v4 } from 'uuid';

import {
	FormControl,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import { validatePrice, validateText } from '../utils';

import {
	SideMenu,
	FooterSubmits,
	HeaderText,
	ToastError,
	ToastSuccess,
	ErrorMessage,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { useCreateService } from '../../../hooks/services';

export const ServiceRegistrationPage = () => {
	const { mutateAsync: createService } = useCreateService();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

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

	const generateService = (data) => {
		const { name, price, description } = data;
		return {
			_id: v4(),
			name,
			isActive: true,
			price: Number(price.replace(',', '.')),
			description,
			createdAt: new Date(),
		};
	};

	const onSubmit = async (data) => {
		try {
			const service = generateService(data);
			await createService(service);
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

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeServices />
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
					<HeaderText text="Área de cadastro de novos serviços" />

					<Paper sx={{ padding: '20px', marginTop: '20px' }}>
						<Stack spacing={2}>
							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Nome"
									variant="outlined"
									error={!!errors.name}
									sx={{ marginTop: '25px' }}
									{...register('name', {
										required: true,
										validate: (value) =>
											validateText(value),
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
									id="outlined-basic"
									label="Preço"
									variant="outlined"
									error={!!errors?.price}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												R$
											</InputAdornment>
										),
									}}
									{...register('price', {
										required: true,
										validate: (value) =>
											validatePrice(value),
									})}
								/>

								{errors?.name?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.name?.type === 'validate' && (
									<ErrorMessage message="Informe um preço válido." />
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Descrição"
									variant="outlined"
									error={!!errors.description}
									{...register('description', {
										required: true,
										validate: (value) =>
											validateText(value),
									})}
								/>

								{errors?.name?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.name?.type === 'validate' && (
									<ErrorMessage message="Informe uma descrição válida." />
								)}
							</FormControl>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/servicos"
						onClick={handleSubmit(onSubmit)}
						text="Fazer o cadastro"
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
