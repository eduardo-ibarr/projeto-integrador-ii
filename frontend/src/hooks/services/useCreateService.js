import { useMutation } from 'react-query';

import { servicesService } from '../../services/api';
import { useInvalidateServices } from './useInvalidateServices';

export function useCreateService() {
	const invalidateServices = useInvalidateServices();

	return useMutation(
		'createNewService',
		(values) => servicesService.createNewService(values),
		{
			onSuccess: invalidateServices,
		}
	);
}
