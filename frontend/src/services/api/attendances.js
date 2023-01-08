import client from './instance';

export const createNewAttendance = async (values) => {
	const response = await client.post('/attendances', values);

	return response.data;
};

export const listActiveAttendances = async () => {
	const response = await client.get('/attendances');

	const activeAttendances = response.data.filter(
		(attendance) => attendance.isActive
	);

	return activeAttendances;
};

export const showAttendance = async (id) => {
	const response = await client.get(`/attendances/${id}`);

	if (response.data[0].isActive) {
		return response.data;
	}

	return null;
};

export const updateAttendance = async ({ id, data }) => {
	const response = await client.patch(`/attendances/${id}`, data);

	return response.data;
};

export const inactivateAttendance = async (id) => {
	const response = await client.patch(`/attendances/${id}`, {
		isActive: false,
	});

	return response.data;
};

export const deleteAttendance = async (id) => {
	const response = await client.delete(`/attendances/${id}`);

	return response.data;
};
