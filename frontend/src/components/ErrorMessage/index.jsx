import { FormHelperText } from '@mui/material';
import React from 'react';

export const ErrorMessage = ({ message, isUpdate }) => {
	return (
		<FormHelperText
			sx={{ color: 'red', marginLeft: isUpdate ? '1rem' : '0' }}
		>
			{message}
		</FormHelperText>
	);
};
