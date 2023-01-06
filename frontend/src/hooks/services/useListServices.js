import { useQuery } from 'react-query';

import { servicesService } from '../../services/api';

export function useListServices() {
	return useQuery('listServices', servicesService.listActiveServices);
}
