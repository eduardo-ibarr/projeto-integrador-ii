import { useMutation } from 'react-query';

import { servicesService } from '../../services/api';
import { useInvalidateServices } from './useInvalidateServices';

export function useInactivateService() {
	const invalidateServices = useInvalidateServices();

	return useMutation(
		'inactivateService',
		(id) => servicesService.inactivateService(id),
		{
			onSuccess: invalidateServices,
		}
	);
}
