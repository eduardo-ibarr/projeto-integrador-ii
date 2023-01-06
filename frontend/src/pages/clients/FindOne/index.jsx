import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import {
	Box,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { SideMenu } from '../../../components/SideMenu';
import { Stack } from '@mui/system';

import { theme } from '../../../theme/theme';
import { chooseApi } from '../../../api/chooseApi';

import { CLOUD, LOCALHOST } from '../../../constants/fetchURLs';

import { useAppContext } from '../../../contexts/AppContext';
import { FooterButtons } from '../../../components/FooterButtons';
import { HeaderText } from '../../../components/HeaderText';
import canShowReducer from './reducers/canShowReducer';
import { canShowInitialState } from './state/canShowInitialState';
import { TablePaginationActions } from '../../../components/TablePaginationActions';

export const FindOneClientPage = () => {
	const { id } = useParams();
	const { isLocalHost } = useAppContext();

	const [client, setClient] = useState([0]);
	const [servicesByClient, setServicesByClient] = useState([]);

	const [canShowState, dispatchCanShow] = useReducer(
		canShowReducer,
		canShowInitialState
	);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleShowClientPhoneNumber = () => {
		dispatchCanShow({
			type: 'PHONE_NUMBER',
			value: !canShowState.phoneNumber,
		});
	};

	const handleShowClientCPF = () => {
		dispatchCanShow({
			type: 'CPF',
			value: !canShowState.cpf,
		});
	};

	const handleShowClientRG = () => {
		dispatchCanShow({
			type: 'RG',
			value: !canShowState.rg,
		});
	};

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * rowsPerPage - servicesByClient.length)
			: 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleGetClient = async () => {
		const clientResponse = await fetch(
			isLocalHost ? LOCALHOST.CLIENTS + id : CLOUD.CLIENTS + id
		);
		const clientJSON = await clientResponse.json();

		setClient(clientJSON);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleGetServicesByClient = async () => {
		if (client[0] !== 0) {
			const ids = client[0].services;

			for (let i = 0; i < ids.length; i++) {
				const response = await chooseApi(isLocalHost)
					.get(`atendimentos/${ids[i]}`)
					.then((response) => response.data)
					.catch((err) => {
						console.error('ops! ocorreu um erro --> ' + err);
					});

				if (response[0].isActive) {
					setServicesByClient((current) => [...current, response[0]]);
				}
			}
		}
	};

	useEffect(() => {
		handleGetClient();
	}, []);

	useEffect(() => {
		handleGetServicesByClient();
	}, [client]);

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeClients />
				</Grid>

				<Grid
					item
					xl={10}
					lg={9}
					md={8}
					sm={7}
					xs={6}
					sx={{ padding: '20px 60px 0 0px' }}
				>
					<Stack spacing={2}>
						<HeaderText text="Consulte os dados do cliente" />

						<Paper sx={{ padding: '20px', marginTop: '20px' }}>
							<Typography variant="h6">
								Nome do cliente: <b>{client[0].name}</b>
							</Typography>

							<Box sx={{ display: 'flex' }}>
								<Typography variant="h6">
									Contato:{' '}
									{canShowState.phoneNumber ? (
										<b>{client[0].phoneNumber}</b>
									) : (
										<b style={{ filter: 'blur(5px)' }}>
											{client[0].phoneNumber}
										</b>
									)}
								</Typography>

								<Tooltip
									title="Mostrar"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										size="small"
										onClick={handleShowClientPhoneNumber}
									>
										<RemoveRedEyeIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex' }}>
								<Typography variant="h6">
									CPF:{' '}
									{canShowState.cpf ? (
										<b>{client[0].cpf}</b>
									) : (
										<b style={{ filter: 'blur(5px)' }}>
											{client[0].cpf}
										</b>
									)}
								</Typography>

								<Tooltip
									title="Mostrar"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										size="small"
										onClick={handleShowClientCPF}
									>
										<RemoveRedEyeIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>

							<Box sx={{ display: 'flex' }}>
								<Typography variant="h6">
									RG:{' '}
									{canShowState.rg ? (
										<b>{client[0].rg}</b>
									) : (
										<b style={{ filter: 'blur(5px)' }}>
											{client[0].rg}
										</b>
									)}
								</Typography>

								<Tooltip
									title="Mostrar"
									sx={{ marginLeft: '10px' }}
								>
									<IconButton
										size="small"
										onClick={handleShowClientRG}
									>
										<RemoveRedEyeIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Box>

							<Typography variant="h6">
								Endereço: <b>{client[0].address}</b>
							</Typography>

							<Typography variant="h6">
								Cliente criado em:{' '}
								<b>
									{moment(client[0].createdAt).format(
										'DD/MM/YYYY HH:mm'
									)}
								</b>
							</Typography>

							{client[0].updatedAt && (
								<Typography variant="h6">
									Cliente alterado por último em:{' '}
									<b>
										{moment(client[0].updatedAt).format(
											'DD/MM/YYYY HH:mm'
										)}
									</b>
								</Typography>
							)}
						</Paper>
					</Stack>

					<TableContainer
						component={Paper}
						sx={{ marginTop: '20px' }}
					>
						<Table sx={{ minWidth: 500 }}>
							<TableHead sx={{ backgroundColor: 'primary.main' }}>
								<TableRow>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Serviço
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Data
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Total
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Total pago
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Pago
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Finalizado
									</TableCell>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Criado em
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? servicesByClient.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: servicesByClient
								).map((service, i) => (
									<TableRow key={i}>
										<TableCell>
											<Typography variant="subtitle1">
												{service.services[0].name}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{moment(service.date).format(
													'DD/MM/YYYY HH:mm'
												)}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{Number(
													service.total
												).toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{service.totalPaid
													? Number(
															service.totalPaid
													  ).toLocaleString(
															'pt-BR',
															{
																style: 'currency',
																currency: 'BRL',
															}
													  )
													: 0}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{service.isPaid === true
													? 'Sim'
													: 'Não'}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{service.isDone === true
													? 'Sim'
													: 'Não'}
											</Typography>
										</TableCell>
										<TableCell align="left">
											<Typography variant="subtitle1">
												{moment(
													service.createdAt
												).format('DD/MM/YYYY HH:mm')}
											</Typography>
										</TableCell>
									</TableRow>
								))}

								{emptyRows > 0 && (
									<TableRow
										style={{ height: 53 * emptyRows }}
									>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
						</Table>

						<TablePagination
							rowsPerPageOptions={[
								5,
								10,
								25,
								{ label: 'Todos', value: -1 },
							]}
							count={servicesByClient.length}
							component="div"
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableContainer>

					<FooterButtons
						backTo="/clientes"
						goTo={`/clientes/${id}/alterar`}
						text="Atualizar os dados"
					/>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
