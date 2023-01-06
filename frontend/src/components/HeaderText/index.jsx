import React from 'react';
import { Paper, ThemeProvider, Typography } from '@mui/material';
import { theme } from '../../theme/theme';

export const HeaderText = ({ text }) => {
	return (
		<ThemeProvider theme={theme}>
			<Paper sx={{ marginTop: '20px' }}>
				<Typography variant="h5" sx={{ padding: '20px' }}>
					{text}
				</Typography>
			</Paper>
		</ThemeProvider>
	);
};
