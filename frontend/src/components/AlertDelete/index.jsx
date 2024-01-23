import React from 'react';
import { Button, Modal, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { theme } from '../../theme/theme';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { modalStyle } from '../../theme/modalStyle';

export const AlertDelete = ({
	showModal,
	handleCloseModal,
	text,
	handleDelete,
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Modal
				open={showModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography
						id="modal-modal-title"
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
						variant="h6"
						component="h2"
					>
						<WarningAmberIcon sx={{ marginRight: '10px' }} />
						Atenção
					</Typography>

					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Tem certeza de que deseja excluir este {text}?
					</Typography>

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
							onClick={handleCloseModal}
						>
							Cancelar
						</Button>

						<Button
							variant="text"
							sx={{ color: 'color.red' }}
							onClick={handleDelete}
						>
							Excluir
						</Button>
					</Box>
				</Box>
			</Modal>
		</ThemeProvider>
	);
};
