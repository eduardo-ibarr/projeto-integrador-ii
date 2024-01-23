import React from 'react';
import { FormHelperText } from '@mui/material';

export const ErrorMessage = ({ message }) => {
	return (
		<FormHelperText sx={{ color: 'red', marginLeft: '1rem' }}>
			{message}
		</FormHelperText>
	);
};
