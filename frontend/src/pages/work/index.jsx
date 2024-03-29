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

import {
	SideMenu,
	AlertDelete,
	TablePaginationActions,
	FooterButtons,
	LoadingPage,
	ToastError,
	ToastSuccess,
} from '../../components';

import { theme } from '../../theme/theme';

import { useListActiveWorks, useInactivateWork } from '../../hooks/works';

export const WorkPage = () => {
	const { data: Works, isLoading } = useListActiveWorks();
	const { mutateAsync: inactivateWork, isSuccess: isSuccessInactivate } =
		useInactivateWork();

	const [worksToSearch, setWorksToSearch] = useState('');

	const [showModal, setShowModal] = useState(false);

	const [workToInactivate, setWorkToInactivate] = useState();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [showToast, setShowToast] = useState({
		error: false,
		success: false,
	});

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Works?.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeWorksToSearch = (event) => {
		setWorksToSearch(event.target.value);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleCloseToastSuccess = () => {
		setShowToast((current) => {
			return {
				...current,
				success: false,
			};
		});
	};

	const handleCloseToastError = () => {
		setShowToast((current) => {
			return {
				...current,
				error: false,
			};
		});
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleInactivateWork = async () => {
		try {
			await inactivateWork(workToInactivate);
			setShowToast((current) => {
				return {
					...current,
					success: true,
				};
			});
		} catch (error) {
			setShowToast((current) => {
				return {
					...current,
					error: true,
				};
			});
			console.error(error);
		}
	};

	if (isLoading) {
		return <LoadingPage />;
	}

	const filteredWorks = Works.filter((Work) => {
		return Work.name.toLowerCase().includes(worksToSearch.toLowerCase());
	});

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeWorks />
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
							onChange={handleChangeWorksToSearch}
						/>
					</Paper>

					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 500 }}>
							<TableHead sx={{ backgroundColor: 'primary.main' }}>
								<TableRow>
									<TableCell sx={{ color: 'color.white' }} align="left">
										Nome
									</TableCell>
									<TableCell sx={{ color: 'color.white' }} align="left">
										Preço
									</TableCell>
									<TableCell sx={{ color: 'color.white' }} align="left">
										Criado em
									</TableCell>
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? worksToSearch !== ''
										? filteredWorks.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: Works.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
									: Works
								).map((Work, i) => (
									<TableRow key={i}>
										<TableCell sx={{ color: 'text.primary' }}>
											<Typography variant="subtitle1">{Work.name}</Typography>
										</TableCell>
										<TableCell align="left" sx={{ color: 'text.primary' }}>
											<Typography variant="subtitle1">
												{Work.price.toLocaleString('pt-BR', {
													style: 'currency',
													currency: 'BRL',
												})}
											</Typography>
										</TableCell>
										<TableCell align="left" sx={{ color: 'text.primary' }}>
											<Typography variant="subtitle1">
												{moment(Work.createdAt).format('DD/MM/YYYY HH:mm')}
											</Typography>
										</TableCell>
										<TableCell align="center" sx={{ color: 'text.primary' }}>
											<Link to={`/servicos/${Work._id}`}>
												<Tooltip title="Ver mais" sx={{ marginRight: '10px' }}>
													<IconButton>
														<RemoveRedEyeIcon />
													</IconButton>
												</Tooltip>
											</Link>
											<Tooltip title="Excluir" sx={{ color: 'primary.red' }}>
												<IconButton
													onClick={() => {
														setWorkToInactivate(Work._id);
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
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}

								{filteredWorks.length === 0 && Works.length > 0 && (
									<Typography
										sx={{
											margin: '25px 0px 0px 20px',
										}}
									>
										Nenhum serviço foi encontrado.
									</Typography>
								)}

								{Works.length === 0 && (
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
							rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
							count={Works.length}
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
				</Grid>
			</Grid>

			<AlertDelete
				handleCloseModal={handleCloseModal}
				handleDelete={handleInactivateWork}
				showModal={showModal && !isSuccessInactivate}
				text="serviço"
			/>

			<ToastError open={showToast.error} handleClose={handleCloseToastError} />

			<ToastSuccess
				open={showToast.success}
				handleClose={handleCloseToastSuccess}
			/>
		</ThemeProvider>
	);
};
