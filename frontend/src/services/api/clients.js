import client from './instance';

export const createNewClient = async (values) => {
	const response = await client.post('/clients', values);
	return response.data;
};

export const listActiveClients = async () => {
	const response = await client.get('/clients');
	const activeClients = response.data.filter((clients) => clients.isActive);
	return activeClients;
};

export const showClient = async (id) => {
	const response = await client.get(`/clients/${id}`);
	return response.data;
};

export const updateClient = async ({ id, data }) => {
	const response = await client.patch(`/clients/${id}`, data);
	return response.data;
};

export const inactivateClient = async (id) => {
	const response = await client.patch(`/clients/${id}`, { isActive: false });
	return response.data;
};

export const deleteClient = async (id) => {
	const response = await client.delete(`/clients/${id}`);
	return response.data;
};
