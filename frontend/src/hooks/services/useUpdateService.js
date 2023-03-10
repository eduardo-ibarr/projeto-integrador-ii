import { useMutation } from 'react-query';

import { servicesService } from '../../services/api';
import { useInvalidateServices } from './useInvalidateServices';

export function useUpdateService() {
	const invalidateServices = useInvalidateServices();

	return useMutation(
		'updateService',
		({ id, data }) => servicesService.updateService({ id, data }),
		{ onSuccess: invalidateServices }
	);
}
