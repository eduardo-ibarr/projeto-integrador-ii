import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
	Typography,
	Table,
	TextField,
	TableBody,
	Tooltip,
	TableCell,
	TableContainer,
	TablePagination,
	TableRow,
	TableHead,
	Paper,
	IconButton,
	Grid,
} from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

import { TablePaginationActions } from '../../components/TablePaginationActions';
import { SideMenu } from '../../components/SideMenu';
import { AlertDelete } from '../../components/AlertDelete';
import { LoadingPage } from '../../components/LoadingPage';
import { FooterButtons } from '../../components/FooterButtons';

import { theme } from '../../theme/theme';

import { useListActiveClients, useInactivateClient } from '../../hooks/clients';

export const ClientsPage = () => {
	const { data: clients, isLoading } = useListActiveClients();

	const { mutateAsync: inactivateClient } = useInactivateClient();

	const [clientToSearch, setClientToSearch] = useState('');

	const [showModal, setShowModal] = useState(false);

	const [clientToInactivate, setClientToInactivate] = useState();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSetClientsToSearch = (event) => {
		setClientToSearch(event.target.value);
	};

	const handleInactivateClient = async () => {
		try {
			await inactivateClient(clientToInactivate);
		} catch (error) {
			throw new Error(error);
		}
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	const filteredClients = clients.filter((client) => {
		return client.name.toLowerCase().includes(clientToSearch.toLowerCase());
	});

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
					<Paper
						sx={{
							margin: '20px 0 20px 0',
							padding: '20px',
							width: '300px',
						}}
					>
						<TextField
							fullWidth
							id="standard-basic"
							label="Busque por um cliente"
							variant="standard"
							onChange={handleSetClientsToSearch}
						/>
					</Paper>

					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 500 }}>
							<TableHead sx={{ backgroundColor: 'primary.main' }}>
								<TableRow>
									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Nome
									</TableCell>

									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Endereço
									</TableCell>

									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Contato
									</TableCell>

									<TableCell
										sx={{ color: 'color.white' }}
										align="left"
									>
										Criado em
									</TableCell>

									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? clientToSearch !== ''
										? filteredClients.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: clients.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
									: clients
								).map((client, i) => (
									<TableRow key={i}>
										<TableCell>
											<Typography variant="subtitle1">
												{client.name}
											</Typography>
										</TableCell>

										<TableCell align="left">
											<Typography variant="subtitle1">
												{client.address}
											</Typography>
										</TableCell>

										<TableCell align="left">
											<Typography variant="subtitle1">
												{client.phoneNumber}
											</Typography>
										</TableCell>

										<TableCell align="left">
											<Typography variant="subtitle1">
												{moment(
													client.createdAt
												).format('DD/MM/YYYY HH:mm')}
											</Typography>
										</TableCell>

										<TableCell align="center">
											<Link
												to={`/clientes/${client._id}`}
											>
												<Tooltip
													title="Ver mais"
													sx={{ marginRight: '10px' }}
												>
													<IconButton>
														<RemoveRedEyeIcon />
													</IconButton>
												</Tooltip>
											</Link>

											<Tooltip
												title="Excluir"
												sx={{ color: 'primary.red' }}
											>
												<IconButton
													onClick={() => {
														setClientToInactivate(
															client._id
														);
														setShowModal(true);
													}}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
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

								{filteredClients.length === 0 &&
									clients.length > 0 && (
										<Typography
											sx={{
												margin: '25px 0px 0px 20px',
											}}
										>
											Nenhum cliente foi encontrado.
										</Typography>
									)}

								{clients.length === 0 && (
									<Typography
										sx={{
											margin: '25px 0px 0px 20px',
										}}
									>
										Não há clientes na base de dados.
									</Typography>
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
							count={clients.length}
							component="div"
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableContainer>

					<FooterButtons
						backTo="/home"
						goTo="/clientes/novo"
						text="Cadastrar novo cliente"
					/>

					{showModal && (
						<AlertDelete
							handleCloseModal={handleCloseModal}
							handleDelete={handleInactivateClient}
							showModal={showModal}
							text="cliente"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
