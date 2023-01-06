import React, { useState } from 'react';
import { v4 } from 'uuid';

import {
	Grid,
	InputAdornment,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
} from '@mui/material';

import { validateName } from '../../clients/utils/validateName';
import { validatePrice } from '../utils/validatePrice';
import { validateDescription } from '../utils/validateDescription';

import { SideMenu } from '../../../components/SideMenu';
import { ModalSucess } from '../../../components/ModalSucess';

import { chooseApi } from '../../../api/chooseApi';
import { theme } from '../../../theme/theme';

import { useAppContext } from '../../../contexts/AppContext';
import { FooterSubmits } from '../../../components/FooterSubmits';
import { HeaderText } from '../../../components/HeaderText';

export const ServiceRegistrationPage = () => {
	const { isLocalHost } = useAppContext();

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');

	const [isInvalidName, setIsInvalidName] = useState(false);
	const [isInvalidPrice, setIsInvalidPrice] = useState(false);
	const [isInvalidDescription, setIsInvalidDescription] = useState(false);

	const warningMessage = 'Preencha corretamente este campo';
	const warningPriceMessage = 'Preencha corretamente, exemplo: 50,00';

	const [showModal, setShowModal] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const handleCloseModal = () => {
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

	const handleSubmit = async () => {
		setIsLoading(true);

		await chooseApi(isLocalHost)
			.post('novo_servico', {
				_id: v4(),
				name,
				isActive: true,
				price: Number(price.replace(',', '.')),
				description,
				createdAt: new Date(),
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('ops! ocorreu um erro --> ' + err);
			});

		setShowModal(true);
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
							<TextField
								fullWidth
								id="outlined-basic"
								label="Nome"
								variant="outlined"
								error={isInvalidName ? true : false}
								helperText={isInvalidName ? warningMessage : ''}
								sx={{ marginTop: '25px' }}
								onChange={handleChangeName}
							/>

							<TextField
								fullWidth
								id="outlined-basic"
								label="Preço"
								variant="outlined"
								error={isInvalidPrice ? true : false}
								helperText={
									isInvalidPrice ? warningPriceMessage : ''
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

							<TextField
								fullWidth
								id="outlined-basic"
								label="Descrição"
								variant="outlined"
								error={isInvalidDescription ? true : false}
								helperText={
									isInvalidDescription ? warningMessage : ''
								}
								onChange={handleChangeDescription}
							/>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo="/servicos"
						isDisabled={
							name !== '' && price !== '' && description !== ''
								? false
								: true
						}
						isLoading={isLoading}
						onClick={handleValidate}
						text="Fazer o cadastro"
					/>

					{showModal && (
						<ModalSucess
							handleClose={handleCloseModal}
							text="O serviço foi cadastrado com êxito!"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
