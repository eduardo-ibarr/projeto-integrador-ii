import { useQuery } from 'react-query';

import { clientsService } from '../../services/api';

export function useShowClient(id) {
	return useQuery('showClient', () => clientsService.showClient(id), {
		cacheTime: 100,
	});
}
