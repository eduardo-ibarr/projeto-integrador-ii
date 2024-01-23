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

import { workReducer } from './state/workReducer';
import { workInitialState } from './state/workInitialState';

import { useShowWork, useUpdateWork } from '../../../hooks/works';
import { validatePrice, validateText } from '../utils';

export const UpdateOneWorkPage = () => {
	const { id } = useParams();
	const { mutateAsync: updateWork } = useUpdateWork();
	const { data: work, isLoading } = useShowWork(id);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [workState, dispatchWork] = useReducer(workReducer, workInitialState);

	const isDisabled = useMemo(
		() =>
			workState.name.disabled &&
			workState.price.disabled &&
			workState.description.disabled,
		[workState]
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
		dispatchWork({
			type: 'DISABLE_NAME',
			disabled: !workState.name.disabled,
		});
	};

	const handleDisablePrice = () => {
		dispatchWork({
			type: 'DISABLE_PRICE',
			disabled: !workState.price.disabled,
		});
	};

	const handleDisableDescription = () => {
		dispatchWork({
			type: 'DISABLE_DESCRIPTION',
			disabled: !workState.description.disabled,
		});
	};

	const generateWork = (data) => {
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
			const Work = generateWork(data);
			await updateWork({ id, data: Work });
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
			const { name, price, description } = work[0];
			reset({
				name,
				price,
				description,
			});
		}
	}, [work]);

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeWorks />
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
										disabled={workState.name.disabled}
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
										disabled={workState.price.disabled}
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
										disabled={workState.description.disabled}
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
