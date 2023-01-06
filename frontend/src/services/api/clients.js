import client from './instance';

export const createNewClient = async (values) => {
	const response = await client.post('/clientes', values);

	return response.data;
};

export const listActiveClients = async () => {
	const response = await client.get('/clientes');

	const activeClients = response.data.filter((c) => c.isActive);

	return activeClients;
};

export const showClient = async (id) => {
	const response = await client.get(`/clientes/${id}`);

	return response.data;
};

export const updateClient = async ({ id, data }) => {
	const response = await client.put(`/clientes/${id}`, data);

	return response.data;
};

export const inactivateClient = async (id, active) => {
	const response = await client.patch(`/clientes/${id}`, active);

	return response.data;
};

export const deleteClient = async (id) => {
	const response = await client.delete(`/clientes/${id}`);

	return response.data;
};
