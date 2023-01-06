import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { App } from '../../App';

import { Home } from '../../pages/home';

import { ClientsPage } from '../../pages/clients';
import { ClientRegistrationPage } from '../../pages/clients/Registration';
import { FindOneClientPage } from '../../pages/clients/FindOne';
import { UpdateOneClientPage } from '../../pages/clients/UpdateOne';

import { ServicePage } from '../../pages/services';
import { ServiceRegistrationPage } from '../../pages/services/Registration';
import { FindOneServicePage } from '../../pages/services/FindOne';
import { UpdateOneServicePage } from '../../pages/services/UpdateOne';

import { AttendancePage } from '../../pages/attendance';

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/home" element={<Home />}></Route>

				<Route path="clientes" element={<ClientsPage />} />
				<Route path="clientes/:id" element={<FindOneClientPage />} />
				<Route
					path="clientes/:id/alterar"
					element={<UpdateOneClientPage />}
				/>
				<Route
					path="clientes/novo"
					element={<ClientRegistrationPage />}
				/>

				<Route path="servicos" element={<ServicePage />} />
				<Route path="servicos/:id" element={<FindOneServicePage />} />
				<Route
					path="servicos/:id/alterar"
					element={<UpdateOneServicePage />}
				/>
				<Route
					path="servicos/novo"
					element={<ServiceRegistrationPage />}
				/>

				<Route path="atendimentos" element={<AttendancePage />} />
			</Routes>
		</BrowserRouter>
	);
};
