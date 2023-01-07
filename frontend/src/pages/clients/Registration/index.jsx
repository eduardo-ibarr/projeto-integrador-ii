import React, { useState } from 'react';
import { v4 } from 'uuid';

import {
	Grid,
	Paper,
	TextField,
	ThemeProvider,
	FormControl,
	FormHelperText,
} from '@mui/material';

import * as yup from 'yup';

import { Stack } from '@mui/system';

import { useForm } from 'react-hook-form';

import { SideMenu } from '../../../components/SideMenu';
import { ModalSucess } from '../../../components/ModalSucess';

import { theme } from '../../../theme/theme';

import { yupResolver } from '@hookform/resolvers/yup';

import { FooterSubmits } from '../../../components/FooterSubmits';
import { HeaderText } from '../../../components/HeaderText';

import { useCreateClient } from '../../../hooks/clients';

const warningMessage = 'Preencha corretamente este campo';

let schema = yup.object().shape({
	name: yup.string().required(warningMessage),
	phoneNumber: yup.number().required(warningMessage),
	rg: yup.string().required(warningMessage),
	cpf: yup.string().required(warningMessage),
	address: yup.string().required(warningMessage),
});

export const ClientRegistrationPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const { mutateAsync: createNewClient, isLoading } = useCreateClient();

	const [showModal, setShowModal] = useState(false);

	const handleClose = () => {
		setShowModal(false);
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

			setShowModal(true);
		} catch (error) {
			console.error(error);
		}
	};

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
									{...register('name')}
									fullWidth
									id="outlined-basic"
									label="Nome completo"
									variant="outlined"
									error={!!errors?.name}
								/>
								{!!errors?.name && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.name?.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Número de celular com DDD"
									variant="outlined"
									{...register('phoneNumber')}
									error={!!errors?.phoneNumber}
								/>
								{errors?.phoneNumber?.type === 'typeError' && (
									<FormHelperText sx={{ color: 'red' }}>
										Preencha apenas numeros.
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="CPF"
									variant="outlined"
									{...register('cpf')}
									error={!!errors?.cpf}
								/>
								{errors?.cpf && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.cpf?.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="RG"
									variant="outlined"
									{...register('rg')}
									error={!!errors?.rg}
								/>
								{errors?.rg && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.rg?.message}
									</FormHelperText>
								)}
							</FormControl>

							<FormControl>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Endereço"
									variant="outlined"
									{...register('address')}
									error={!!errors?.address}
								/>
								{errors?.address && (
									<FormHelperText sx={{ color: 'red' }}>
										{errors?.address?.message}
									</FormHelperText>
								)}
							</FormControl>
						</Stack>

						{showModal && (
							<ModalSucess
								handleClose={handleClose}
								text="O cliente foi cadastrado com êxito!"
							/>
						)}
					</Paper>

					<FooterSubmits
						backTo="/servicos"
						isDisabled={false}
						isLoading={isLoading}
						onClick={handleSubmit(onSubmit)}
						text="Fazer o cadastro"
					/>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
