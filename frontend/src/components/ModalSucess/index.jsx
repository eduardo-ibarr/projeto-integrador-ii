import React from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

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

export const ModalSucess = ({ handleClose, text }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Sucesso!
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					{text}
				</Typography>
				<Box
					style={{
						display: 'flex',
						justifyContent: 'right',
						marginTop: '30px',
					}}
				>
					<Button
						variant="text"
						sx={{ marginRight: '10px' }}
						onClick={handleClose}
					>
						Ok
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};
