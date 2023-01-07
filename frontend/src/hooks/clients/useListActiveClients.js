import { useQuery } from 'react-query';

import { clientsService } from '../../services/api';

export function useListActiveClients() {
	return useQuery('listActiveClients', clientsService.listActiveClients, {
		cacheTime: 0,
	});
}
