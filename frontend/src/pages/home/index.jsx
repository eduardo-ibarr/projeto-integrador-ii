import React, { useMemo, useReducer, useState } from 'react';
import moment from 'moment';

import { Navigate } from 'react-router-dom';

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	Modal,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	ThemeProvider,
	Tooltip,
	Typography,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { Controller, useForm } from 'react-hook-form';

import {
	SideMenu,
	AlertDelete,
	LoadingPage,
	ToastError,
	ToastSuccess,
	ErrorMessage,
} from '../../components';

import { theme } from '../../theme/theme';

import { modalStyle } from '../../theme/modalStyle';
import './styles.css';

import {
	useListActiveAttendances,
	useInactivateAttendance,
	useUpdateAttendance,
} from '../../hooks/attendance';

import { useListActiveClients } from '../../hooks/clients/useListActiveClients';

import { homePageReducer } from './state/homePageReducer';
import { homePageInitialState } from './state/homePageInitialState';

export const Home = () => {
	const { data: attendances, isLoading: isLoadingAttendances } =
		useListActiveAttendances();
	const { data: clients, isLoading: isLoadingClients } =
		useListActiveClients();
	const {
		mutateAsync: inactivateAttendance,
		isSuccess: isSuccessInactivate,
	} = useInactivateAttendance();

	const { mutateAsync: updateAttendance, isSuccess: isSuccessUpdate } =
		useUpdateAttendance();

	const {
		handleSubmit,
		register,
		control,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			isDone: false,
			isPaid: false,
			totalPaid: 0,
		},
	});

	const { isDone, isPaid } = watch();

	const [day, setDay] = useState();

	const [homePageState, dispatchHomePage] = useReducer(
		homePageReducer,
		homePageInitialState
	);

	const hasSomeData = useMemo(
		() =>
			!isLoadingAttendances && !isLoadingClients && attendances && clients
	);

	const attendancesForTheDay = useMemo(() => {
		if (hasSomeData) {
			const results = [];
			for (const attendance of attendances) {
				const isSameDate =
					moment(attendance.date).format('DD/MM/yyyy') ===
					moment(day).format('DD/MM/yyyy');
				const isAlreadyEddited = moment(attendance.updatedAt).isBefore(
					day
				);
				if (isSameDate && !isAlreadyEddited) {
					const clientOfTheAttendance = clients.find(
						(client) => client._id === attendance.client
					);
					const attendanceWithClientName = {
						...attendance,
						clientName: clientOfTheAttendance.name,
					};
					results.push(attendanceWithClientName);
				}
			}
			return results;
		}
		return;
	}, [day, isLoadingAttendances, isLoadingClients, attendances, clients]);

	if (isLoadingAttendances) {
		return <LoadingPage />;
	}

	if (isLoadingClients) {
		return <LoadingPage />;
	}

	if (!attendances || !clients) {
		return <Navigate to="/atendimentos" />;
	}

	const handleCloseFinishModal = () => {
		dispatchHomePage({ type: 'SET_CLOSE_FINISH_MODAL', value: false });
	};

	const handleCloseToastSuccess = () => {
		dispatchHomePage({ type: 'SET_TOAST_SUCCESS', value: false });
	};

	const handleCloseToastError = () => {
		dispatchHomePage({ type: 'SET_TOAST_ERROR', value: false });
	};

	const handleCloseInactivateModal = () => {
		dispatchHomePage({
			type: 'SET_CLOSE_INACTIVATE_MODAL',
			value: false,
		});
	};

	const handleChangeDate = (event) => {
		const input = moment(event.target.value);
		setDay(input);
	};

	const onSubmit = async (data) => {
		data;

		try {
			const { isDone, isPaid, totalPaid } = data;
			await updateAttendance({
				id: homePageState.selectedAttendanceId,
				data: {
					isDone,
					isPaid,
					totalPaid,
					updatedAt: new Date(),
				},
			});
			dispatchHomePage({ type: 'SET_TOAST_SUCCESS', value: true });
		} catch (error) {
			dispatchHomePage({ type: 'SET_TOAST_ERROR', value: true });
			console.error(error);
		}
	};

	const handleInactivateAttendance = async () => {
		try {
			await inactivateAttendance(homePageState.selectedAttendanceId);
			dispatchHomePage({ type: 'SET_TOAST_SUCCESS', value: true });
		} catch (error) {
			dispatchHomePage({ type: 'SET_TOAST_ERROR', value: true });
			console.error(error);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeHome />
				</Grid>

				<Grid item xl={10} lg={9} md={8} sm={7} xs={6}>
					<Box sx={{ padding: '20px 60px 0 0' }}>
						<Paper
							sx={{
								marginBottom: '20px',
								padding: '20px',
								width: '700px',
								borderRadius: '5px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Typography variant="h6">
								Atendimentos para hoje, ou selecione uma data:
							</Typography>

							<Box sx={{ marginLeft: '10px' }}>
								<TextField
									onChange={handleChangeDate}
									type="date"
								/>
							</Box>
						</Paper>

						<Grid container spacing={2}>
							{attendancesForTheDay.map((attendance, i) => {
								if (attendance.isDone === false) {
									return (
										<Grid item xs={3} key={i}>
											<Card>
												<CardContent>
													<Typography
														variant="h5"
														component="div"
													>
														{attendance.clientName}
													</Typography>
													<Typography
														sx={{ mb: 1.5 }}
														color="text.primary"
													>
														{
															attendance
																?.services[0]
																.name
														}{' '}
														-{' '}
														{attendance?.services[0].price.toLocaleString(
															'pt-BR',
															{
																style: 'currency',
																currency: 'BRL',
															}
														)}
													</Typography>
													<Typography variant="h5">
														{moment(
															attendance?.date
														).format(
															'DD/MM/YYYY HH:mm'
														)}
													</Typography>
												</CardContent>
												<CardActions
													sx={{
														display: 'flex',
														justifyContent:
															'space-between',
													}}
												>
													<Tooltip
														title="Concluído"
														sx={{
															color: 'color.green',
														}}
													>
														<IconButton
															size="large"
															onClick={() => {
																dispatchHomePage(
																	{
																		type: 'SET_OPEN_FINISH_MODAL',
																		values: {
																			selectedAttendanceId:
																				attendance._id,
																			openFinishModal: true,
																		},
																	}
																);
															}}
														>
															<CheckCircleOutlineIcon fontSize="inherit" />
														</IconButton>
													</Tooltip>
													<Tooltip
														title="Excluir"
														sx={{
															color: 'color.red',
														}}
													>
														<IconButton
															size="large"
															onClick={() =>
																dispatchHomePage(
																	{
																		type: 'SET_OPEN_INACTIVATE_MODAL',
																		values: {
																			selectedAttendanceId:
																				attendance._id,
																			openInactivateModal: true,
																		},
																	}
																)
															}
														>
															<DeleteIcon fontSize="inherit" />
														</IconButton>
													</Tooltip>
												</CardActions>
											</Card>
										</Grid>
									);
								}
							})}
						</Grid>
					</Box>
				</Grid>
			</Grid>

			<Modal open={homePageState.openFinishModal && !isSuccessUpdate}>
				<Box sx={modalStyle}>
					<Typography
						id="modal-modal-title"
						component={'span'}
						variant="h6"
					>
						Finalizar atendimento
					</Typography>

					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '1rem',
						}}
					>
						<FormControl>
							<FormControl component="fieldset">
								<FormLabel component="legend">
									Status do atendimento
								</FormLabel>
								<Controller
									control={control}
									name="isDone"
									render={({ field }) => (
										<RadioGroup {...field}>
											<FormControlLabel
												value="true"
												control={<Radio />}
												label="Finalizado"
											/>
											<FormControlLabel
												value="false"
												control={<Radio />}
												label="Não finalizado"
											/>
										</RadioGroup>
									)}
								/>
							</FormControl>
							<FormControl>
								<FormControl sx={{ marginTop: '1rem' }}>
									{isDone === 'true' && (
										<FormControl component="fieldset">
											<FormLabel component="legend">
												Status de pagamento
											</FormLabel>
											<Controller
												control={control}
												name="isPaid"
												render={({ field }) => (
													<RadioGroup {...field}>
														<FormControlLabel
															value="true"
															control={<Radio />}
															label="Pago"
														/>
														<FormControlLabel
															value="false"
															control={<Radio />}
															label="Não pago"
														/>
													</RadioGroup>
												)}
											/>
										</FormControl>
									)}

									{isPaid === 'true' && (
										<FormControl>
											<TextField
												fullWidth
												id="outlined-basic"
												label="Valor pago"
												variant="outlined"
												sx={{ marginTop: '2rem' }}
												error={!!errors.totalPaid}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															R$
														</InputAdornment>
													),
												}}
												{...register('totalPaid', {
													validate: (value) =>
														!isNaN(value) &&
														value > 0,
												})}
											/>

											{!!errors.totalPaid && (
												<ErrorMessage
													isUpdate
													message="Preencha com numeros maiores
													que zero."
												/>
											)}
										</FormControl>
									)}
								</FormControl>
							</FormControl>
						</FormControl>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'right',
							marginTop: '30px',
						}}
					>
						<Button
							variant="text"
							sx={{ marginRight: '10px' }}
							onClick={handleCloseFinishModal}
						>
							Cancelar
						</Button>
						<Button
							variant="text"
							sx={{ marginRight: '10px' }}
							onClick={handleSubmit(onSubmit)}
						>
							Salvar
						</Button>
					</Box>
				</Box>
			</Modal>

			<AlertDelete
				handleCloseModal={handleCloseInactivateModal}
				handleDelete={handleInactivateAttendance}
				showModal={
					homePageState.openInactivateModal && !isSuccessInactivate
				}
				text="atendimento"
			/>

			<ToastError
				open={homePageState.openErrorToast}
				handleClose={handleCloseToastError}
			/>

			<ToastSuccess
				open={homePageState.openSuccessToast}
				handleClose={handleCloseToastSuccess}
			/>
		</ThemeProvider>
	);
};
