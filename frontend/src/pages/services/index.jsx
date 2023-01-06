/* eslint-disable indent */
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

export const ServicePage = () => {
	const { isLocalHost } = useAppContext();

	const [services, setServices] = useState([]);

	const [servicesToSearch, setServicesToSearch] = useState('');

	const [showModal, setShowModal] = useState(false);

	const [canDelete, setCanDelete] = useState(false);
	const [IDToDelete, setIDToDelete] = useState(0);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const filteredServices = services.filter((services) => {
		return services.name
			.toLowerCase()
			.includes(servicesToSearch.toLowerCase());
	});

	const handleGetServices = async () => {
		const servicesResponse = await fetch(
			isLocalHost ? LOCALHOST.SERVICES : CLOUD.SERVICES
		);
		const servicesJSON = await servicesResponse.json();

		const activeServices = servicesJSON.filter((service) => {
			if (service.isActive) {
				return service;
			}
		});

		setServices(activeServices);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - services.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeServicesToSearch = (event) => {
		setServicesToSearch(event.target.value);
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

	const handleDelete = async (id) => {
		const response = await chooseApi(isLocalHost).put(`servicos/${id}`, {
			isActive: false,
		});

		setServices(response);
		setCanDelete(false);

		window.location.reload();
	};

	useEffect(() => {
		if (canDelete) {
			handleDelete(IDToDelete);
		}
	}, [canDelete, IDToDelete]);

	useEffect(() => {
		handleGetServices();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeServices />
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
							color: 'text.primary',
						}}
					>
						<TextField
							fullWidth
							id="standard-basic"
							label="Busque por um serviço"
							variant="standard"
							onChange={handleChangeServicesToSearch}
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
										Preço
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
									? servicesToSearch !== ''
										? filteredServices.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: services.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
									: services
								).map((service, i) => (
									<TableRow key={i}>
										<TableCell
											sx={{ color: 'text.primary' }}
										>
											<Typography variant="subtitle1">
												{service.name}
											</Typography>
										</TableCell>
										<TableCell
											align="left"
											sx={{ color: 'text.primary' }}
										>
											<Typography variant="subtitle1">
												{service.price.toLocaleString(
													'pt-BR',
													{
														style: 'currency',
														currency: 'BRL',
													}
												)}
											</Typography>
										</TableCell>
										<TableCell
											align="left"
											sx={{ color: 'text.primary' }}
										>
											<Typography variant="subtitle1">
												{moment(
													service.createdAt
												).format('DD/MM/YYYY HH:mm')}
											</Typography>
										</TableCell>
										<TableCell
											align="center"
											sx={{ color: 'text.primary' }}
										>
											<Link
												to={`/servicos/${service._id}`}
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
															service._id
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

								{filteredServices.length === 0 &&
									services.length > 0 && (
										<Typography
											sx={{
												margin: '25px 0px 0px 20px',
											}}
										>
											Nenhum serviço foi encontrado.
										</Typography>
									)}

								{services.length === 0 && (
									<Typography
										sx={{
											margin: '25px 0px 0px 20px',
										}}
									>
										Não há serviços na base de dados.
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
							count={services.length}
							component="div"
							rowsPerPage={rowsPerPage}
							page={page}
							sx={{ color: 'text.primary' }}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableContainer>

					<FooterButtons
						backTo="/home"
						goTo="/servicos/novo"
						text="Cadastrar novo serviço"
					/>

					{showModal && (
						<AlertDelete
							handleCloseModal={handleCloseModal}
							setCanDelete={setCanDelete}
							showModal={showModal}
							text="serviço"
						/>
					)}
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
