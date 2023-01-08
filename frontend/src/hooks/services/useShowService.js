import { useQuery } from 'react-query';

import { servicesService } from '../../services/api';

export function useShowService(id) {
	return useQuery('showService', () => servicesService.showService(id), {
		cacheTime: 100,
	});
}
