import client from './instance';

export const createNewService = async (values) => {
	const response = await client.post('/services', values);

	return response.data;
};

export const listActiveServices = async () => {
	const response = await client.get('/services');

	const activeServices = response.data.filter((services) => services.isActive);

	return activeServices;
};

export const showService = async (id) => {
	const response = await client.get(`/services/${id}`);

	return response.data;
};

export const updateService = async ({ id, data }) => {
	const response = await client.patch(`/services/${id}`, data);

	return response.data;
};

export const inactivateService = async (id) => {
	const response = await client.patch(`/services/${id}`, { isActive: false });

	return response.data;
};

export const deleteService = async (id) => {
	const response = await client.delete(`/services/${id}`);

	return response.data;
};
