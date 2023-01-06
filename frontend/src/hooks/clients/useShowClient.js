import { useQuery } from 'react-query';

import { clientsService } from '../../services/api';

export function useShowClient() {
	return useQuery('showClient', clientsService.showClient);
}
