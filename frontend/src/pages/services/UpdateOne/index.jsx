import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
	Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import * as yup from 'yup';

import { FooterSubmits } from '../../../components/FooterSubmits';

import { SideMenu } from '../../../components/SideMenu';
import { ModalSucess } from '../../../components/ModalSucess';

import { theme } from '../../../theme/theme';

import { serviceReducer } from './state/serviceReducer';
import { serviceInitialState } from './state/serviceInitialState';

import { HeaderText } from '../../../components/HeaderText';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useShowService, useUpdateService } from '../../../hooks/services';
import { LoadingPage } from '../../../components/LoadingPage';

const warningMessage = 'Preencha corretamente este campo';

let schema = yup.object().shape({
	name: yup.string().required(warningMessage),
	price: yup.string().required(warningMessage),
	description: yup.string().required(warningMessage),
});

export const UpdateOneServicePage = () => {
	const { id } = useParams();
	const { mutateAsync: createService } = useUpdateService();
	const { data: service, isLoading } = useShowService(id);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

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

	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => {
		setShowModal(false);
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
			await createService(service);
			setShowModal(true);
		} catch (error) {
			throw new Error(error);
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
									label="Nome do servico"
									disabled={serviceState.name.disabled}
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
									{...register('price')}
									fullWidth
									id="outlined-basic"
									label="Preço"
									disabled={serviceState.price.disabled}
									variant="outlined"
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
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.price?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisablePrice}>
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
									{...register('description')}
									fullWidth
									id="outlined-basic"
									label="Descrição"
									disabled={serviceState.description.disabled}
									variant="outlined"
									error={!!errors?.description}
								/>
								{!!errors?.description && (
									<FormHelperText
										sx={{ color: 'red', width: '20rem' }}
									>
										{errors?.description?.message}
									</FormHelperText>
								)}
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										onClick={handleDisableDescription}
									>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</FormControl>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo={`/servicos/${id}`}
						isDisabled={isDisabled}
						isLoading={isLoading}
						onClick={handleSubmit(onSubmit)}
						text="Alterar o cadastro"
					/>

					{showModal && (
						<ModalSucess
							handleClose={handleCloseModal}
							text="O serviço foi atualizado com êxito!"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
