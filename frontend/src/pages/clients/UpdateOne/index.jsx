import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Box,
	Grid,
	IconButton,
	Paper,
	Stack,
	TextField,
	ThemeProvider,
	Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { validateName } from '../utils/validateName';
import { validatePhoneNumber } from '../utils/validatePhoneNumber';
import { validateCPF } from '../utils/validateCPF';
import { validateRG } from '../utils/validateRG';
import { validateAddress } from '../utils/validateAddress';

import { ModalSucess } from '../../../components/ModalSucess';
import { SideMenu } from '../../../components/SideMenu';

import { chooseApi } from '../../../api/chooseApi';
import { theme } from '../../../theme/theme';

import { useAppContext } from '../../../contexts/AppContext';
import { CLOUD, LOCALHOST } from '../../../constants/fetchURLs';
import { FooterSubmits } from '../../../components/FooterSubmits';
import { HeaderText } from '../../../components/HeaderText';

import clientReducer from './reducers/clientReducer';
import { clientInitialState } from './state/clientInitialState';

export const UpdateOneClientPage = () => {
	const { id } = useParams();
	const { isLocalHost } = useAppContext();

	const [client, setClient] = useState([0]);

	const [isLoading, setIsLoading] = useState(false);

	const [clientState, dispatchClient] = useReducer(
		clientReducer,
		clientInitialState
	);

	const clientData = useMemo(() => {
		const { name, phoneNumber, cpf, rg, address } = clientState;
		const {
			nameDefault,
			phoneNumberDefault,
			cpfDefault,
			rgDefault,
			addressDefault,
		} = client[0];

		return {
			name: name.disabled ? nameDefault : name.value,
			phoneNumber: phoneNumber.disabled
				? phoneNumberDefault
				: phoneNumber.value,
			cpf: cpf.disabled ? cpfDefault : cpf.value,
			rg: rg.disabled ? rgDefault : rg.value,
			address: address.disabled ? addressDefault : address.value,
		};
	}, [clientState, client]);

	const isDisabled = useMemo(
		() =>
			clientState.name.disabled &&
			clientState.phoneNumber.disabled &&
			clientState.cpf.disabled &&
			clientState.rg.disabled &&
			clientState.address.disabled,
		[clientState]
	);

	const [showModal, setShowModal] = useState(false);

	const warningMessage = 'Preencha corretamente este campo';

	const handleGetClient = async () => {
		const clientsResponse = await fetch(
			isLocalHost ? LOCALHOST.CLIENTS + id : CLOUD.CLIENTS + id
		);
		const clientsJSON = await clientsResponse.json();

		setClient(clientsJSON);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		window.location.reload();
	};

	const handleValidate = () => {
		let isAllValid = true;

		if (validateName(clientState.name.value) === false) {
			dispatchClient({ type: 'SET_NAME', invalid: true });
			isAllValid = false;
		}

		if (validatePhoneNumber(clientState.phoneNumber.value) === false) {
			dispatchClient({
				type: 'SET_PHONE_NUMBER',
				invalid: true,
			});
			isAllValid = false;
		}
		if (validateCPF(clientState.cpf.value) === false) {
			dispatchClient({ type: 'SET_CPF', invalid: true });
			isAllValid = false;
		}
		if (validateRG(clientState.rg.value) === false) {
			dispatchClient({ type: 'SET_RG', invalid: true });
			isAllValid = false;
		}

		if (validateAddress(clientState.address.value) === false) {
			dispatchClient({ type: 'SET_ADDRESS', invalid: true });
			isAllValid = false;
		}

		if (isAllValid) {
			handleSubmit();
		}
	};

	const handleChangeName = (event) => {
		dispatchClient({
			type: 'SET_NAME',
			invalid: false,
			value: event.target.value,
		});
	};

	const handleChangePhoneNumber = (event) => {
		dispatchClient({
			type: 'SET_PHONE_NUMBER',
			invalid: false,
			value: event.target.value,
		});
	};

	const handleChangeCPF = (event) => {
		dispatchClient({
			type: 'SET_CPF',
			invalid: false,
			value: event.target.value,
		});
	};

	const handleChangeRG = (event) => {
		dispatchClient({
			type: 'SET_RG',
			invalid: false,
			value: event.target.value,
		});
	};

	const handleChangeAddress = (event) => {
		dispatchClient({
			type: 'SET_ADDRESS',
			invalid: false,
			value: event.target.value,
		});

		console.log(clientData);
	};

	const handleDisableName = () => {
		dispatchClient({
			type: 'SET_NAME',
			disabled: !clientState.name.disabled,
		});
	};

	const handleDisablePhoneNumber = () => {
		dispatchClient({
			type: 'SET_PHONE_NUMBER',
			disabled: !clientState.phoneNumber.disabled,
		});
	};

	const handleDisableCPF = () => {
		dispatchClient({
			type: 'SET_CPF',
			disabled: !clientState.cpf.disabled,
		});
	};

	const handleDisableRG = () => {
		dispatchClient({
			type: 'SET_RG',
			disabled: !clientState.rg.disabled,
		});
	};

	const handleDisableAddress = () => {
		dispatchClient({
			type: 'SET_ADDRESS',
			disabled: !clientState.address.disabled,
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);

		const client = {
			...clientData,
			updatedAt: new Date(),
		};

		await chooseApi(isLocalHost)
			.put(`clientes/${id}`, client)
			.then(() => {
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('ops! ocorreu um erro --> ' + err);
			});

		setShowModal(true);
	};

	useEffect(() => {
		handleGetClient();
	}, []);

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
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									fullWidth
									id="outlined-basic"
									label={`Nome completo: ${client[0].name}`}
									variant="outlined"
									disabled={clientState.name.disabled}
									error={
										clientState.name.invalid ? true : false
									}
									helperText={
										clientState.name.invalid
											? warningMessage
											: ''
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
									fullWidth
									id="outlined-basic"
									label={`Número de celular: ${client[0].phoneNumber}`}
									variant="outlined"
									disabled={clientState.phoneNumber.disabled}
									error={
										clientState.phoneNumber.invalid
											? true
											: false
									}
									helperText={
										clientState.phoneNumber.invalid
											? warningMessage
											: ''
									}
									onChange={handleChangePhoneNumber}
								/>

								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										onClick={handleDisablePhoneNumber}
									>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									fullWidth
									id="outlined-basic"
									label={`CPF: ${client[0].cpf}`}
									variant="outlined"
									disabled={clientState.cpf.disabled}
									error={
										clientState.cpf.invalid ? true : false
									}
									helperText={
										clientState.cpf.invalid
											? warningMessage
											: ''
									}
									onChange={handleChangeCPF}
								/>

								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableCPF}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									fullWidth
									id="outlined-basic"
									label={`RG: ${client[0].rg}`}
									variant="outlined"
									disabled={clientState.rg.disabled}
									error={
										clientState.rg.invalid ? true : false
									}
									helperText={
										clientState.rg.invalid
											? warningMessage
											: ''
									}
									onChange={handleChangeRG}
								/>
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableRG}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<TextField
									fullWidth
									id="outlined-basic"
									label={`Endereço: ${client[0].address}`}
									variant="outlined"
									disabled={clientState.address.disabled}
									error={
										clientState.address.invalid
											? true
											: false
									}
									helperText={
										clientState.address.invalid
											? warningMessage
											: ''
									}
									onChange={handleChangeAddress}
								/>
								<Tooltip
									title="Editar este campo"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton onClick={handleDisableAddress}>
										<EditIcon />
									</IconButton>
								</Tooltip>
							</Box>
						</Stack>
					</Paper>

					<FooterSubmits
						backTo={`/clientes/${id}`}
						isDisabled={isDisabled}
						isLoading={isLoading}
						onClick={handleValidate}
						text="Alterar o cadastro"
					/>

					{showModal && (
						<ModalSucess
							handleClose={handleCloseModal}
							text="O cliente foi atualizado com êxito!"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
