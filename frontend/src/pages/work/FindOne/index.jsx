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

import { useShowWork } from '../../../hooks/works';

export const FindOneWorkPage = () => {
	const { id } = useParams();

	const { data: work, isLoading } = useShowWork(id);
	console.log(work);

	if (isLoading || !work) {
		return <LoadingPage />;
	}

	return (
		<ThemeProvider theme={theme}>
			<Grid container spacing={2}>
				<Grid item xl={2} lg={3} md={4} sm={5} xs={6}>
					<SideMenu activeWorks />
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
								Nome do serviço: <strong>{work.name}</strong>
							</Typography>

							<Typography variant="h6">
								Preço:{' '}
								<strong>
									{Number(work.price).toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</strong>
							</Typography>

							<Typography variant="h6">
								Descrição: <strong>{work.description}</strong>
							</Typography>

							<Typography variant="h6">
								Serviço criado em:{' '}
								<strong>
									{moment(work.createdAt).format('DD/MM/YYYY HH:mm')}
								</strong>
							</Typography>

							{work.updatedAt && (
								<Typography variant="h6">
									Serviço alterado por último em:{' '}
									<strong>
										{moment(work.updatedAt).format('DD/MM/YYYY HH:mm')}
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
