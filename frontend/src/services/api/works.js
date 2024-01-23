import client from './instance';

export const createWork = async (values) => {
	const response = await client.post('/works', values);
	return response.data;
};

export const listActiveWorks = async () => {
	const response = await client.get('/works');
	const activeWorks = response.data.filter((works) => works.isActive);
	return activeWorks;
};

export const showWork = async (id) => {
	const response = await client.get(`/works/${id}`);
	console.log(response.data);
	return response.data;
};

export const updateWork = async ({ id, data }) => {
	const response = await client.patch(`/works/${id}`, data);
	return response.data;
};

export const inactivateWork = async (id) => {
	const response = await client.patch(`/works/${id}`, { isActive: false });
	return response.data;
};

export const deleteWork = async (id) => {
	const response = await client.delete(`/works/${id}`);
	return response.data;
};
