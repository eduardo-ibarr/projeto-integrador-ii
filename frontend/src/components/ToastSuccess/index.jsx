import React from 'react';

import { Snackbar, Alert } from '@mui/material';

export const ToastSuccess = ({ open, handleClose }) => {
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity="success"
				sx={{ width: '100%' }}
			>
				<b>Sucesso!</b> Operação realizada com êxito.
			</Alert>
		</Snackbar>
	);
};
