import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Box,
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

import { FooterSubmits } from '../../../components/FooterSubmits';

import { validatePrice } from '../utils/validatePrice';
import { validateDescription } from '../utils/validateDescription';
import { validateName } from '../../clients/utils/validateName';

import { SideMenu } from '../../../components/SideMenu';
import { ModalSucess } from '../../../components/ModalSucess';

import { chooseApi } from '../../../api/chooseApi';
import { theme } from '../../../theme/theme';

import { useAppContext } from '../../../contexts/AppContext';
import { CLOUD, LOCALHOST } from '../../../constants/fetchURLs';
import { HeaderText } from '../../../components/HeaderText';

export const UpdateOneServicePage = () => {
	const { id } = useParams();
	const { isLocalHost } = useAppContext();

	const [service, setService] = useState([0]);

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	const [isInvalidName, setIsInvalidName] = useState(false);
	const [isInvalidPrice, setIsInvalidPrice] = useState(false);
	const [isInvalidDescription, setIsInvalidDescription] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const [isDisabledName, setIsDisabledName] = useState(true);
	const [isDisabledPrice, setIsDisabledPrice] = useState(true);
	const [isDisabledDescription, setIsDisabledDescription] = useState(true);

	const [showModal, setShowModal] = useState(false);

	const warningMessage = 'Preencha corretamente este campo';
	const warningPriceMessage = 'Preencha corretamente, exemplo: 50,00';

	const handleGetService = async () => {
		const servicesResponse = await fetch(
			isLocalHost ? LOCALHOST.SERVICES + id : CLOUD.SERVICES + id
		);
		const servicesJSON = await servicesResponse.json();

		setService(servicesJSON);
	};

	const handleClose = () => {
		setShowModal(false);
		window.location.reload();
	};

	const handleValidate = () => {
		let isAllValid = true;

		if (validateName(name) === false) {
			setIsInvalidName(true);
			isAllValid = false;
		}

		if (validatePrice(price) === false) {
			setIsInvalidPrice(true);
			isAllValid = false;
		}
		if (validateDescription(description) === false) {
			setIsInvalidDescription(true);
			isAllValid = false;
		}

		if (isAllValid) {
			handleSubmit();
		}
	};

	const handleChangeName = (event) => {
		setName(event.target.value);
		setIsInvalidName(false);
	};

	const handleChangePrice = (event) => {
		setPrice(event.target.value);
		setIsInvalidPrice(false);
	};

	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
		setIsInvalidDescription(false);
	};

	const handleDisableName = () => {
		setIsDisabledName(!isDisabledName);
	};

	const handleDisablePrice = () => {
		setIsDisabledPrice(!isDisabledPrice);
	};

	const handleDisableDescription = () => {
		setIsDisabledDescription(!isDisabledDescription);
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		await chooseApi(isLocalHost)
			.put(`servicos/${id}`, {
				name,
				price,
				description,
				updatedAt: new Date(),
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('ops! ocorreu um erro --> ' + err);
			});

		setShowModal(true);
	};

	useEffect(() => {
		if (isDisabledName) {
			setName(service[0].name);
		}

		if (isDisabledPrice) {
			setPrice(service[0].phoneNumber);
		}

		if (isDisabledDescription) {
			setDescription(service[0].cpf);
		}
	}, [isDisabledName, isDisabledPrice, isDisabledDescription, service]);

	useEffect(() => {
		handleGetService();
	}, []);

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
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									id="outlined-basic"
									label={`Nome: ${service[0].name}`}
									variant="outlined"
									fullWidth
									disabled={isDisabledName}
									error={isInvalidName ? true : false}
									helperText={
										isInvalidName ? warningMessage : ''
									}
									onChange={handleChangeName}
								/>
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableName}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									id="outlined-basic"
									label={`Descrição: ${service[0].description}`}
									variant="outlined"
									fullWidth
									disabled={isDisabledDescription}
									error={isInvalidDescription ? true : false}
									helperText={
										isInvalidDescription
											? warningMessage
											: ''
									}
									onChange={handleChangeDescription}
								/>

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
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									id="outlined-basic"
									label={`Preço: ${Number(
										service[0].price
									).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}`}
									variant="outlined"
									disabled={isDisabledPrice}
									error={isInvalidPrice ? true : false}
									helperText={
										isInvalidPrice
											? warningPriceMessage
											: ''
									}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												R$
											</InputAdornment>
										),
									}}
									onChange={handleChangePrice}
								/>
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisablePrice}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo={`/servicos/${id}`}
						isDisabled={
							isDisabledName &&
							isDisabledPrice &&
							isDisabledDescription
						}
						isLoading={isLoading}
						onClick={handleValidate}
						text="Alterar o cadastro"
					/>

					{showModal && (
						<ModalSucess
							handleClose={handleClose}
							text="O serviço foi atualizado com êxito!"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
