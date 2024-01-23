import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from '../../App';

import { Home } from '../../pages/home';

import { ClientsPage } from '../../pages/clients';
import { ClientRegistrationPage } from '../../pages/clients/Registration';
import { FindOneClientPage } from '../../pages/clients/FindOne';
import { UpdateOneClientPage } from '../../pages/clients/UpdateOne';

import { WorkPage } from '../../pages/work';
import { WorkRegistrationPage } from '../../pages/work/Registration';
import { FindOneWorkPage } from '../../pages/work/FindOne';
import { UpdateOneWorkPage } from '../../pages/work/UpdateOne';

import { AttendancePage } from '../../pages/attendance';

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/home" element={<Home />}></Route>

				<Route path="clientes" element={<ClientsPage />} />
				<Route path="clientes/:id" element={<FindOneClientPage />} />
				<Route path="clientes/:id/alterar" element={<UpdateOneClientPage />} />
				<Route path="clientes/novo" element={<ClientRegistrationPage />} />

				<Route path="servicos" element={<WorkPage />} />
				<Route path="servicos/:id" element={<FindOneWorkPage />} />
				<Route path="servicos/:id/alterar" element={<UpdateOneWorkPage />} />
				<Route path="servicos/novo" element={<WorkRegistrationPage />} />

				<Route path="atendimentos" element={<AttendancePage />} />
			</Routes>
		</BrowserRouter>
	);
};
