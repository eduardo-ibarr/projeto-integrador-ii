import React, { useMemo, useState } from 'react';
import { v4 } from 'uuid';

import {
	FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	SideMenu,
	FooterSubmits,
	HeaderText,
	ToastError,
	ToastSuccess,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { useCreateService } from '../../../hooks/services';

const warningMessage = 'Preencha corretamente este campo';

let schema = yup.object().shape({
	name: yup.string().required(warningMessage),
	price: yup.string().required(warningMessage),
	description: yup.string().required(warningMessage),
});

export const ServiceRegistrationPage = () => {
	const { mutateAsync: createService } = useCreateService();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { name, price, description } = watch();

	const isDisabled = useMemo(
		() => name === '' && price === '' && description === '',
		[name, price, description]
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
									{...register('name')}
									label="Nome"
									variant="outlined"
									error={!!errors.name}
									sx={{ marginTop: '25px' }}
								/>
								{!!errors?.name && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.name?.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									id="outlined-basic"
									label="Preço"
									variant="outlined"
									{...register('price')}
									error={!!errors?.price}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												R$
											</InputAdornment>
										),
									}}
								/>
								{!!errors?.price && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.name?.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									{...register('description')}
									id="outlined-basic"
									label="Descrição"
									variant="outlined"
									error={!!errors.description}
								/>
								{!!errors?.description && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.description?.message}
									</FormHelperText>
								)}
							</FormControl>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/servicos"
						isDisabled={isDisabled}
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
