import client from './instance';

export const createNewService = async (values) => {
	const response = await client.post('/servicos', values);

	return response.data;
};

export const listActiveServices = async () => {
	const response = await client.get('/servicos');

	const activeServices = response.data.filter((s) => s.isActive);

	return activeServices;
};

export const showService = async (id) => {
	const response = await client.get(`/servicos/${id}`);

	return response.data;
};

export const updateService = async ({ id, data }) => {
	const response = await client.put(`/servicos/${id}`, data);

	return response.data;
};

export const inactivateService = async (id, active) => {
	const response = await client.patch(`/servicos/${id}`, active);

	return response.data;
};

export const deleteService = async (id) => {
	const response = await client.delete(`/servicos/${id}`);

	return response.data;
};
