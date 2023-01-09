import { FormHelperText } from '@mui/material';
import React from 'react';

export const ErrorMessage = ({ message }) => {
	return (
		<FormHelperText sx={{ color: 'red', marginLeft: '1rem' }}>
			{message}
		</FormHelperText>
	);
};
