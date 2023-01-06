import React from 'react';

import { Box, Button, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { theme } from '../../theme/theme';

export const FooterButtons = ({ backTo, goTo, text }) => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Link to={backTo} style={{ textDecoration: 'none' }}>
					<Button variant="outlined" sx={{ marginTop: '25px' }}>
						Voltar
					</Button>
				</Link>

				<Link to={goTo} style={{ textDecoration: 'none' }}>
					<Button variant="contained" sx={{ marginTop: '25px' }}>
						{text}
					</Button>
				</Link>
			</Box>
		</ThemeProvider>
	);
};
