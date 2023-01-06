import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
	Box,
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

import { ThemeProvider, useTheme } from '@mui/material/styles';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import { SideMenu } from '../../components/SideMenu';
import { AlertDelete } from '../../components/AlertDelete';

import { chooseApi } from '../../api/chooseApi';
import { theme } from '../../theme/theme';

import { useAppContext } from '../../contexts/AppContext';
import { CLOUD, LOCALHOST } from '../../constants/fetchURLs';
import { FooterButtons } from '../../components/FooterButtons';

const TablePaginationActions = (props) => {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
			>
				{theme.direction === 'rtl' ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0}>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
			>
				{theme.direction === 'rtl' ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</Box>
	);
};

export const ClientsPage = () => {
	const { isLocalHost } = useAppContext();

	const [clients, setClients] = useState([]);

	const [clientToSearch, setClientToSearch] = useState('');

	const [showModal, setShowModal] = useState(false);

	const [canDelete, setCanDelete] = useState(false);
	const [IDToDelete, setIDToDelete] = useState(0);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const filteredClients = clients.filter((client) => {
		return client.name.toLowerCase().includes(clientToSearch.toLowerCase());
	});

	const handleGetClients = async () => {
		const clientsResponse = await fetch(
			isLocalHost ? LOCALHOST.CLIENTS : CLOUD.CLIENTS
		);
		const clientsJSON = await clientsResponse.json();

		const activeClients = clientsJSON.filter((client) => {
			if (client.isActive) {
				return client;
			}
		});

		setClients(activeClients);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleShowModal = (id) => {
		setShowModal(true);
		setIDToDelete(id);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSetClientsToSearch = (event) => {
		setClientToSearch(event.target.value);
	};

	const handleDelete = async (id) => {
		const response = await chooseApi(isLocalHost).put(`clientes/${id}`, {
			isActive: false,
		});

		setClients(response);
		setCanDelete(false);

		window.location.reload();
	};

	useEffect(() => {
		handleGetClients();
	}, []);

	useEffect(() => {
		if (canDelete) {
			handleDelete(IDToDelete);
		}
	}, [canDelete, IDToDelete]);

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
													onClick={() =>
														handleShowModal(
															client._id
														)
													}
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
							setCanDelete={setCanDelete}
							showModal={showModal}
							text="cliente"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
