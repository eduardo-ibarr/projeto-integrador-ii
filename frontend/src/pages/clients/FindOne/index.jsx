import React, { useEffect, useMemo, useReducer, useState } from 'react';
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

import { Stack } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import {
	SideMenu,
	LoadingPage,
	TablePaginationActions,
	FooterButtons,
	HeaderText,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { useShowClient } from '../../../hooks/clients';

import { canShowReducer } from './state/canShowReducer';
import { canShowInitialState } from './state/canShowInitialState';

import { attendancesServices } from '../../../services/api';

export const FindOneClientPage = () => {
	const { id } = useParams();

	const { data: client, isLoading: isLoadingClient } = useShowClient(id);

	const [attendancesByClient, setAttendancesByClient] = useState([]);

	const [canShowState, dispatchCanShow] = useReducer(
		canShowReducer,
		canShowInitialState
	);

	const [isLoadingAttendances, setIsLoadingAttendances] = useState(true);

	const [page, setPage] = useState(0);

	const [rowsPerPage, setRowsPerPage] = useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = useMemo(
		() =>
			page > 0
				? Math.max(
						0,
						(1 + page) * rowsPerPage - attendancesByClient.length
				  )
				: 0,
		[attendancesByClient]
	);

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

	const handleGetAttendancesByClient = async () => {
		if (client[0].services) {
			const ids = client[0].services;
			const attendances = [];

			for await (const id of ids) {
				const attendance = await attendancesServices.showAttendance(id);

				attendances.push(attendance);
			}

			setAttendancesByClient(attendancesByClient.concat(attendances));
			setIsLoadingAttendances(false);
		}
	};

	useEffect(() => {
		if (!isLoadingClient) {
			handleGetAttendancesByClient();
		}
	}, [client]);

	if (isLoadingClient || isLoadingAttendances) {
		return <LoadingPage />;
	}

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
										'oculto'
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
										'oculto'
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
										'oculto'
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
									? attendancesByClient.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: attendancesByClient
								).map((attendance, i) => {
									if (!attendance) {
										return;
									}

									attendance = attendance[0];

									return (
										<TableRow key={i}>
											<TableCell>
												<Typography variant="subtitle1">
													{attendance.services.map(
														(service) =>
															service.name
													)}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{moment(
														attendance.date
													).format(
														'DD/MM/YYYY HH:mm'
													)}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{Number(
														attendance.total
													).toLocaleString('pt-BR', {
														style: 'currency',
														currency: 'BRL',
													})}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{attendance.totalPaid
														? Number(
																attendance.totalPaid
														  ).toLocaleString(
																'pt-BR',
																{
																	style: 'currency',
																	currency:
																		'BRL',
																}
														  )
														: 0}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{attendance.isPaid === true
														? 'Sim'
														: 'Não'}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{attendance.isDone === true
														? 'Sim'
														: 'Não'}
												</Typography>
											</TableCell>
											<TableCell align="left">
												<Typography variant="subtitle1">
													{moment(
														attendance.createdAt
													).format(
														'DD/MM/YYYY HH:mm'
													)}
												</Typography>
											</TableCell>
										</TableRow>
									);
								})}

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
							count={attendancesByClient.length}
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
