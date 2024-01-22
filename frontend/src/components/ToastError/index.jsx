import React from 'react';

import { Snackbar, Alert } from '@mui/material';

export const ToastError = ({ open, handleClose }) => {
	return (
		<Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
				<b>Erro...</b> Aconteceu uma falha de comunicação com o servidor.
			</Alert>
		</Snackbar>
	);
};
