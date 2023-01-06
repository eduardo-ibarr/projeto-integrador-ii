import axios from 'axios';

const [urlLocalhost, urlCloud] = ['http://localhost:5050/', ''];

export const chooseApi = (isLocalHost) => {
	const localhost = axios.create({
		baseURL: urlLocalhost,
	});

	const cloud = axios.create({
		baseURL: urlCloud,
	});

	if (isLocalHost) {
		return localhost;
	} else {
		return cloud;
	}
};
