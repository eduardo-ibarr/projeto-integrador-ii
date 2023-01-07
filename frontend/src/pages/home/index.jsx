import React, { useMemo, useReducer, useState } from 'react';
import moment from 'moment';

import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormHelperText,
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

import { SideMenu } from '../../components/SideMenu';

import { Controller, useForm } from 'react-hook-form';

import { theme } from '../../theme/theme';

import './styles.css';

import { useListAttendances } from '../../hooks/attendance/useListAttendances';
import { useListClients } from '../../hooks/clients/useListClients';

import { modalStyle } from '../../theme/modalStyle';
import { useInactivateAttendance } from '../../hooks/attendance/useInactivateAttendance';
import { AlertDelete } from '../../components/AlertDelete';
import { useUpdateAttendance } from '../../hooks/attendance/useUpdateAttendance';
import { attendanceReducer } from './state/attendanceReducer';
import { attendanceInitialState } from './state/attendanceInitialState';

export const Home = () => {
	const { data: attendances, isLoading: isLoadingAttendances } =
		useListAttendances();

	const { data: clients, isLoading: isLoadingClients } = useListClients();

	const { mutateAsync: inactivateAttendance } = useInactivateAttendance();

	const { mutateAsync: updateAttendance, isLoading: isLoadingUpdate } =
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

	const [attendanceState, dispatchAttendance] = useReducer(
		attendanceReducer,
		attendanceInitialState
	);

	const attendancesForTheDay = useMemo(() => {
		if (!isLoadingAttendances && !isLoadingClients) {
			const results = [];

			for (const attendance of attendances) {
				const isSameDate =
					moment(attendance.date).format('DD/MM/yyyy') ===
					moment(day).format('DD/MM/yyyy');

				if (isSameDate) {
					results.push(attendance);
				}
			}

			return results;
		}

		return;
	}, [day, isLoadingAttendances, isLoadingClients]);

	if (isLoadingAttendances) {
		return <h3>carregando...</h3>;
	}

	if (isLoadingClients) {
		return <h3>carregando...</h3>;
	}

	const handleCloseFinishModal = () => {
		dispatchAttendance({ type: 'SET_CLOSE_FINISH_MODAL', value: false });
	};

	const handleCloseInactivateModal = () => {
		dispatchAttendance({
			type: 'SET_CLOSE_INACTIVATE_MODAL',
			value: false,
		});
	};

	const handleChangeDate = (event) => {
		const input = moment(event.target.value);
		setDay(input);
	};

	console.log('RENDER');

	const onSubmit = async (data) => {
		try {
			const { isDone, isPaid, totalPaid } = data;

			await updateAttendance({
				id: attendanceState.id,
				data: { isDone, isPaid, total: totalPaid },
			});
		} catch (error) {
			throw new Error(error);
		}
	};

	const handleInactivateAttendance = async () => {
		try {
			await inactivateAttendance(attendanceState.id);
			window.location.reload();
		} catch (error) {
			throw new Error(error);
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
														{clients[i]?.name}
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
																dispatchAttendance(
																	{
																		type: 'SET_OPEN_FINISH_MODAL',
																		values: {
																			openFinishModal: true,
																			id: attendance._id,
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
																dispatchAttendance(
																	{
																		type: 'SET_OPEN_INACTIVATE_MODAL',
																		values: {
																			openInactivateModal: true,
																			id: attendance._id,
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

			<Modal
				open={attendanceState.openFinishModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
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
									rules={{ required: true }}
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
												rules={{
													required: true,
												}}
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
												{...register('totalPaid', {
													required: true,
													validate: (value) =>
														Number(value) > 0,
												})}
												sx={{ marginTop: '2rem' }}
												error={!!errors.totalPaid}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															R$
														</InputAdornment>
													),
												}}
											/>
											{!!errors?.totalPaid && (
												<FormHelperText
													sx={{ color: 'red' }}
												>
													Preencha com numeros maiores
													que zero.
												</FormHelperText>
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
						{isLoadingUpdate ? (
							<CircularProgress sx={{ color: 'primary.main' }} />
						) : (
							<Button
								variant="text"
								sx={{ marginRight: '10px' }}
								onClick={handleSubmit(onSubmit)}
							>
								Salvar
							</Button>
						)}
					</Box>
				</Box>
			</Modal>

			{attendanceState.openInactivateModal && (
				<AlertDelete
					handleCloseModal={handleCloseInactivateModal}
					handleDelete={handleInactivateAttendance}
					showModal={attendanceState.openInactivateModal}
					text="atendimento"
				/>
			)}
		</ThemeProvider>
	);
};
