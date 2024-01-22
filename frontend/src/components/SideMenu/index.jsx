import React from 'react';
import { Link } from 'react-router-dom';

import {
	Paper,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	Box,
	ThemeProvider,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import { theme } from '../../theme/theme';

export const SideMenu = ({
	activeHome,
	activeClients,
	activeServices,
	activeAttendances,
}) => {
	return (
		<ThemeProvider theme={theme}>
			<Paper
				sx={{
					width: 250,
					backgroundColor: 'primary.main',
					minHeight: '100vh',
					height: '100%',
					borderRadius: '0',
				}}
				role="presentation"
				elevation={3}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '30px',
						color: 'color.white',
					}}
				>
					<Typography variant="h5">Salão de Beleza</Typography>
				</Box>

				<List>
					<ListItem
						disablePadding
						sx={{
							backgroundColor: activeHome ? 'color.lightBlue' : '',
						}}
					>
						<Link
							to="/home"
							style={{
								textDecoration: 'none',
								width: '100%',
							}}
						>
							<ListItemButton>
								<ListItemIcon sx={{ color: 'color.white' }}>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary="Home" sx={{ color: 'color.white' }} />
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
				<List>
					<ListItem
						disablePadding
						sx={{
							backgroundColor: activeClients ? 'color.lightBlue' : '',
						}}
					>
						<Link
							to="/clientes"
							style={{
								textDecoration: 'none',
								width: '100%',
							}}
						>
							<ListItemButton>
								<ListItemIcon sx={{ color: 'color.white' }}>
									<PersonIcon />
								</ListItemIcon>
								<ListItemText
									primary="Clientes"
									sx={{ color: 'color.white' }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
				<List>
					<ListItem
						disablePadding
						sx={{
							backgroundColor: activeServices ? 'color.lightBlue' : '',
						}}
					>
						<Link
							to="/servicos"
							style={{
								textDecoration: 'none',
								width: '100%',
							}}
						>
							<ListItemButton>
								<ListItemIcon sx={{ color: 'color.white' }}>
									<DesignServicesIcon />
								</ListItemIcon>
								<ListItemText
									primary="Serviços"
									sx={{ color: 'color.white' }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
				<List>
					<ListItem
						disablePadding
						sx={{
							backgroundColor: activeAttendances ? 'color.lightBlue' : '',
						}}
					>
						<Link
							to="/atendimentos"
							style={{
								textDecoration: 'none',
								width: '100%',
							}}
						>
							<ListItemButton>
								<ListItemIcon sx={{ color: 'color.white' }}>
									<AccessTimeIcon />
								</ListItemIcon>
								<ListItemText
									primary="Atendimentos"
									sx={{ color: 'color.white' }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</Paper>
		</ThemeProvider>
	);
};
