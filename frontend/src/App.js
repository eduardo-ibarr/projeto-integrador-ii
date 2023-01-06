import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Button, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
					color: 'color.white',
				}}
			>
				<Link to="/home" style={{ textDecoration: 'none' }}>
					<Button variant="contained" size="large">
						Entrar
					</Button>
				</Link>
			</Box>
		</ThemeProvider>
	);
};
