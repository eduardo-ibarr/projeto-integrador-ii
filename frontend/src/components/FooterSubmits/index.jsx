import React from 'react';

import { Box, Button, CircularProgress, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/theme';

export const FooterSubmits = ({
	backTo,
	isLoading,
	onClick,
	isDisabled,
	text,
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '20px',
				}}
			>
				<Link to={backTo} style={{ textDecoration: 'none' }}>
					<Button sx={{ right: 'auto' }} variant="outlined">
						Voltar
					</Button>
				</Link>

				{isLoading ? (
					<CircularProgress sx={{ color: 'primary.main' }} />
				) : (
					<Button
						variant="contained"
						onClick={onClick}
						disabled={isDisabled}
					>
						{text}
					</Button>
				)}
			</Box>
		</ThemeProvider>
	);
};
