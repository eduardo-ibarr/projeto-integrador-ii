import { useMutation } from 'react-query';

import { servicesService } from '../../services/api';

export function useUpdateService() {
	return useMutation('updateService', ({ value, id }) =>
		servicesService.updateService({ value, id })
	);
}
