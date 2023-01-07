import client from './instance';

export const createNewAttendance = async (values) => {
	const response = await client.post('/novo_atendimento', values);

	return response.data;
};

export const listActiveAttendances = async () => {
	const response = await client.get('/atendimentos');

	const activeAttendances = response.data.filter((s) => s.isActive);

	return activeAttendances;
};

export const showAttendance = async (id) => {
	const response = await client.get(`/atendimentos/${id}`);

	return response.data;
};

export const updateAttendance = async ({ id, data }) => {
	const response = await client.patch(`/atendimentos/${id}`, data);

	return response.data;
};

export const inactivateAttendance = async (id) => {
	const response = await client.patch(`/atendimentos/${id}`, {
		isActive: false,
	});

	return response.data;
};

export const deleteAttendance = async (id) => {
	const response = await client.delete(`/atendimentos/${id}`);

	return response.data;
};
