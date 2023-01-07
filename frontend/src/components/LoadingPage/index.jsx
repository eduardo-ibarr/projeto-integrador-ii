import React from 'react';

import { Box, CircularProgress } from '@mui/material';

export const LoadingPage = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
			}}
		>
			<CircularProgress sx={{ color: 'primary.main' }} />
		</Box>
	);
};
