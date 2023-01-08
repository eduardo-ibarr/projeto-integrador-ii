import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { Grid, Paper, Stack, ThemeProvider, Typography } from '@mui/material';

import {
	HeaderText,
	SideMenu,
	LoadingPage,
	FooterButtons,
} from '../../../components';

import { theme } from '../../../theme/theme';

import { useShowService } from '../../../hooks/services';

export const FindOneServicePage = () => {
	const { id } = useParams();

	const { data: service, isLoading } = useShowService(id);

	console.log(service);

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeServices />
				</Grid>

				<Grid
					item
					xl={10}
					lg={9}
					md={8}
					sm={7}
					xs={6}
					sx={{ padding: '20px 60px 0 0px' }}
				>
					<Stack>
						<HeaderText text="Consulte os dados do serviço" />

						<Paper
							sx={{
								padding: '20px',
								marginTop: '20px',
								color: 'text.primary',
							}}
						>
							<Typography variant="h6">
								Nome do serviço:{' '}
								<strong>{service[0].name}</strong>
							</Typography>

							<Typography variant="h6">
								Preço:{' '}
								<strong>
									{Number(service[0].price).toLocaleString(
										'pt-BR',
										{
											style: 'currency',
											currency: 'BRL',
										}
									)}
								</strong>
							</Typography>

							<Typography variant="h6">
								Descrição:{' '}
								<strong>{service[0].description}</strong>
							</Typography>

							<Typography variant="h6">
								Serviço criado em:{' '}
								<strong>
									{moment(service[0].createdAt).format(
										'DD/MM/YYYY HH:mm'
									)}
								</strong>
							</Typography>

							{service[0].updatedAt && (
								<Typography variant="h6">
									Serviço alterado por último em:{' '}
									<strong>
										{moment(service[0].updatedAt).format(
											'DD/MM/YYYY HH:mm'
										)}
									</strong>
								</Typography>
							)}
						</Paper>
					</Stack>

					<FooterButtons
						backTo="/servicos"
						goTo={`/servicos/${id}/alterar`}
						text="Atualizar os dados"
					/>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
};
