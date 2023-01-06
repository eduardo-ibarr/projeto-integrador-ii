import React from 'react';
import { Box, Button, CircularProgress, ThemeProvider } from '@mui/material';
import { theme } from '../../../../theme/theme';

export const FooterCard = ({ isLoading, onClickSave, onClickCancel }) => {
	return (
		<ThemeProvider theme={theme}>
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
					onClick={onClickCancel}
				>
					Cancelar
				</Button>
				{isLoading ? (
					<CircularProgress sx={{ color: 'primary.main' }} />
				) : (
					<Button
						variant="text"
						sx={{ marginRight: '10px' }}
						onClick={onClickSave}
					>
						Salvar
					</Button>
				)}
			</Box>
		</ThemeProvider>
	);
};
