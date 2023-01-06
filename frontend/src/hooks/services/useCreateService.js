import { useMutation } from 'react-query';

import { servicesService } from '../../services/api';

export function useCreateService() {
	return useMutation('createNewService', servicesService.createNewService);
}
