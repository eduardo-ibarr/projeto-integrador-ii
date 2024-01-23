import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export const TooltipEdit = ({ onClick }) => {
	return (
		<Tooltip title="Editar este campo" sx={{ marginLeft: '10px' }}>
			<IconButton onClick={onClick}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
};
