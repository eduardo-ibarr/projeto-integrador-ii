import {
	FormControl,
	FormControlLabel,
	FormLabel,
	InputAdornment,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FooterCard } from '../FooterCard';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

export const ModalFinish = ({
	isOpen,
	isDone,
	isLoading,
	showValues,
	onChangeAttendance,
	onChangeIsPaid,
	onChangeTotalPaid,
	isInvalidPrice,
	onClickSave,
	onClickCancel,
}) => {
	return (
		<Modal
			open={isOpen}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					id="modal-modal-title"
					component={'span'}
					variant="h6"
				>
					Finalizar atendimento
				</Typography>

				<Typography
					id="modal-modal-description"
					component={'span'}
					sx={{ mt: 2 }}
				>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<FormControl>
							<FormControl>
								<FormLabel
									id="demo-radio-buttons-group-label"
									sx={{ mt: 1 }}
								>
									Status de serviço
								</FormLabel>

								<RadioGroup
									aria-labelledby="demo-radio-buttons-group-label"
									name="radio-buttons-group"
									defaultValue="false"
									onChange={onChangeAttendance}
								>
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
							</FormControl>
							{isDone && (
								<>
									<FormControl>
										<FormLabel id="demo-radio-buttons-group-label">
											Status de pagamento
										</FormLabel>
										<RadioGroup
											aria-labelledby="demo-radio-buttons-group-label"
											name="radio-buttons-group"
											defaultValue="false"
											onChange={onChangeIsPaid}
										>
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
										{showValues && (
											<TextField
												fullWidth
												id="outlined-basic"
												label="Valor pago"
												variant="outlined"
												sx={{ mt: 1, mb: 1 }}
												error={
													isInvalidPrice
														? true
														: false
												}
												helperText={
													isInvalidPrice
														? 'Preencha corretamente, exemplo: 50,00'
														: ''
												}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															R$
														</InputAdornment>
													),
												}}
												onChange={onChangeTotalPaid}
											/>
										)}
									</FormControl>
								</>
							)}
						</FormControl>
					</Box>
				</Typography>

				<FooterCard
					isLoading={isLoading}
					onClickCancel={onClickCancel}
					onClickSave={onClickSave}
				/>
			</Box>
		</Modal>
	);
};
