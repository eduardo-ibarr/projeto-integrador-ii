import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Box,
	FormControl,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import { FooterSubmits } from '../../../components/FooterSubmits';

import {
	SideMenu,
	LoadingPage,
	HeaderText,
	ToastError,
	ToastSuccess,
	ErrorMessage,
	TooltipEdit,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { serviceReducer } from './state/serviceReducer';
import { serviceInitialState } from './state/serviceInitialState';

import { useShowService, useUpdateService } from '../../../hooks/services';
import { validatePrice, validateText } from '../utils';

export const UpdateOneServicePage = () => {
	const { id } = useParams();
	const { mutateAsync: updateService } = useUpdateService();
	const { data: service, isLoading } = useShowService(id);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [serviceState, dispatchService] = useReducer(
		serviceReducer,
		serviceInitialState
	);

	const isDisabled = useMemo(
		() =>
			serviceState.name.disabled &&
			serviceState.price.disabled &&
			serviceState.description.disabled,
		[serviceState]
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
		dispatchService({
			type: 'DISABLE_NAME',
			disabled: !serviceState.name.disabled,
		});
	};

	const handleDisablePrice = () => {
		dispatchService({
			type: 'DISABLE_PRICE',
			disabled: !serviceState.price.disabled,
		});
	};

	const handleDisableDescription = () => {
		dispatchService({
			type: 'DISABLE_DESCRIPTION',
			disabled: !serviceState.description.disabled,
		});
	};

	const generateService = (data) => {
		const { name, price, description } = data;
		return {
			name,
			price,
			description,
			updatedAt: new Date(),
		};
	};

	const onSubmit = async (data) => {
		try {
			const service = generateService(data);
			await updateService({ id, data: service });
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
		if (!isLoading) {
			const { name, price, description } = service[0];
			reset({
				name,
				price,
				description,
			});
		}
	}, [service]);

	if (isLoading) {
		return <LoadingPage />;
	}

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
					<HeaderText text="Atualização de cadastro do serviço" />

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
										fullWidth
										id="outlined-basic"
										label="Nome do servico"
										disabled={serviceState.name.disabled}
										variant="outlined"
										error={!!errors?.name}
										{...register('name', {
											required: true,
											validate: (value) => validateText(value),
										})}
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
										label="Preço"
										disabled={serviceState.price.disabled}
										variant="outlined"
										error={!!errors?.price}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">R$</InputAdornment>
											),
										}}
										{...register('price', {
											required: true,
											validate: (value) => validatePrice(value),
										})}
									/>

									<TooltipEdit onClick={handleDisablePrice} />
								</FormControl>

								{errors?.price?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.price?.type === 'validate' && (
									<ErrorMessage message="Informe um preço válido." />
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
										label="Descrição"
										disabled={serviceState.description.disabled}
										variant="outlined"
										error={!!errors?.description}
										{...register('description', {
											required: true,
											validate: (value) => validateText(value),
										})}
									/>

									<TooltipEdit onClick={handleDisableDescription} />
								</FormControl>

								{errors?.description?.type === 'required' && (
									<ErrorMessage message="Esse campo é requerido." />
								)}

								{errors?.description?.type === 'validate' && (
									<ErrorMessage message="Informe uma descrição válida." />
								)}
							</Box>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo={`/servicos/${id}`}
						isDisabled={isDisabled}
						isLoading={isLoading}
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
