import { useQuery } from 'react-query';

import { servicesService } from '../../services/api';

export function useShowService() {
	return useQuery('showService', servicesService.showService);
}
