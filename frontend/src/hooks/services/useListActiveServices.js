import { useQuery } from 'react-query';

import { servicesService } from '../../services/api';

export function useListActiveServices() {
	return useQuery('listActiveServices', servicesService.listActiveServices, {
		cacheTime: 100,
	});
}
