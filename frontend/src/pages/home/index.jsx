import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
	Box,
	Card,
	CardActions,
	CardContent,
	Grid,
	IconButton,
	Paper,
	TextField,
	ThemeProvider,
	Tooltip,
	Typography,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import { SideMenu } from '../../components/SideMenu';
import { AlertDelete } from '../../components/AlertDelete';

import { theme } from '../../theme/theme';
import { chooseApi } from '../../api/chooseApi';

import { validatePrice } from '../services/utils/validatePrice';

import './styles.css';

import { CLOUD, LOCALHOST } from '../../constants/fetchURLs';

import { useAppContext } from '../../contexts/AppContext';
import { ModalFinish } from './components/ModalFinish';

export const Home = () => {
	const { isLocalHost } = useAppContext();

	const [attendances, setAttendances] = useState([]);
	const [attendancesReturned, setAttendancesReturned] = useState([]);

	const [clients, setClients] = useState([]);
	const [showValues, setShowValues] = useState(false);

	const [isDone, setIsDone] = useState(false);
	const [isPaid, setIsPaid] = useState(false);
	const [totalPaid, setTotalPaid] = useState(0);

	const [date, setDate] = useState(new Date());

	const [isInvalidPrice, setIsInvalidPrice] = useState(false);

	const [isOpenModalFinish, setIsOpenModalFinish] = useState(false);
	const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

	const [canDelete, setCanDelete] = useState(false);

	const [idCurrentAttendance, setidCurrentAttendance] = useState('');

	const [isLoadingButton, setIsLoadingButton] = useState(false);

	const handleGetAttendances = async () => {
		const attendancesResponse = await fetch(
			isLocalHost ? LOCALHOST.ATTENDANCES : CLOUD.ATTENDANCES
		);
		const attendancesJSON = await attendancesResponse.json();

		setAttendancesReturned(attendancesJSON);
	};

	const handleShowAttendances = () => {
		const attendancesForToday = [];

		for (let i = 0; i < attendancesReturned.length; i++) {
			const attendance = attendancesReturned[i];

			const attendanceDate = new Date(attendance.date);

			const dateParsed =
				date.getDate() +
				'/' +
				date.getMonth() +
				'/' +
				date.getFullYear();
			const attendanceDateParsed =
				attendanceDate.getDate() +
				'/' +
				attendanceDate.getMonth() +
				'/' +
				attendanceDate.getFullYear();

			if (dateParsed === attendanceDateParsed && attendance.isActive) {
				attendancesForToday.push(attendance);
			}
		}

		setAttendances(attendancesForToday);
	};

	const handleGetClients = async () => {
		const attendancesClients = [];

		for (let i = 0; i < attendances.length; i++) {
			const attendance = attendances[i];

			const clientsResponse = await fetch(
				isLocalHost
					? LOCALHOST.CLIENTS + attendance.client
					: CLOUD.CLIENTS + attendance.client
			);

			const clientsJSON = await clientsResponse.json();

			if (clientsJSON[0].isActive) {
				attendancesClients.push(clientsJSON[0]);
			}
		}

		setClients(attendancesClients);
	};

	const handleDeleteAttendance = async (attendance) => {
		setIsLoadingButton(true);

		await chooseApi(isLocalHost)
			.put(`atendimentos/${attendance}`, { isActive: false })
			.then(() => {
				setIsLoadingButton(false);
				setCanDelete(false);
				window.location.reload();
			})
			.catch((err) => {
				console.error('ops! ocorreu um erro --> ' + err);
			});
	};

	const handleSetAttendance = async (Attendance) => {
		if (validatePrice(totalPaid)) {
			setIsInvalidPrice(false);
			setIsLoadingButton(true);

			await chooseApi(isLocalHost)
				.put(`atendimentos/${Attendance}`, {
					isDone,
					isPaid,
					totalPaid,
				})
				.then((response) => {
					setIsLoadingButton(false);
					window.location.reload();

					return response.data;
				})
				.catch((err) => {
					console.error('ops! ocorreu um erro -->' + err);
				});
		} else {
			setIsInvalidPrice(true);
		}
	};

	const handleShowPayment = () => {
		setIsDone(!isDone);
	};

	const handleShowValues = () => {
		setShowValues(!showValues);
	};

	const handleChangeIsPaid = (e) => {
		setIsPaid(e.target.value);
		handleShowValues();
	};

	const handleChangeTotalPaid = (event) => {
		setTotalPaid(event.target.value);
		setIsInvalidPrice(false);
	};

	const handleChangeDate = (newValue) => {
		setDate(new Date(newValue));
	};

	const handleChangeAttendance = (event) => {
		setIsDone(event.target.value);
		handleShowPayment(!isPaid);
	};

	const handleOpenModal = (attendance) => {
		setIsOpenModalFinish(true);
		setidCurrentAttendance(attendance._id);
	};

	const handleCloseModalFinish = () => {
		setIsOpenModalFinish(false);

		setShowValues(false);
		setIsDone(false);
	};

	const handleCloseModalDelete = () => {
		setIsOpenModalDelete(false);
	};

	useEffect(() => {
		handleGetClients().catch((error) => console.error(error));
	}, [attendances]);

	useEffect(() => {
		handleShowAttendances();
	}, [attendancesReturned, date]);

	useEffect(() => {
		if (canDelete) handleDeleteAttendance(idCurrentAttendance);
	}, [canDelete, idCurrentAttendance]);

	useEffect(() => {
		handleGetAttendances().catch((error) => console.error(error));
	}, []);

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
								width: '500px',
								borderRadius: '5px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Typography variant="h6">
								Atendimentos para
							</Typography>

							<Box sx={{ marginLeft: '10px' }}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}
									adapterLocale="fr"
								>
									<DesktopDatePicker
										inputFormat="DD/MM/YYYY"
										value={date}
										onChange={handleChangeDate}
										renderInput={(params) => (
											<TextField {...params} />
										)}
									/>
								</LocalizationProvider>
							</Box>
						</Paper>

						<Grid container spacing={2}>
							{attendances.map((attendance, i) => {
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
															onClick={() =>
																handleOpenModal(
																	attendance
																)
															}
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
															onClick={() => {
																setIsOpenModalDelete(
																	true
																);
																setidCurrentAttendance(
																	attendance._id
																);
															}}
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

				{isOpenModalFinish && (
					<ModalFinish
						onClickCancel={handleCloseModalFinish}
						onClickSave={() =>
							handleSetAttendance(idCurrentAttendance)
						}
						isDone={isDone}
						isInvalidPrice={isInvalidPrice}
						isLoading={isLoadingButton}
						isOpen={isOpenModalFinish}
						onChangeAttendance={handleChangeAttendance}
						onChangeIsPaid={handleChangeIsPaid}
						onChangeTotalPaid={handleChangeTotalPaid}
						showValues={showValues}
					/>
				)}

				{isOpenModalDelete && (
					<AlertDelete
						handleCloseModal={handleCloseModalDelete}
						setCanDelete={setCanDelete}
						text="atendimento"
						showModal={isOpenModalDelete}
					/>
				)}
			</Grid>
		</ThemeProvider>
	);
};
