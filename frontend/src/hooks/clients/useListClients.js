import { useQuery } from 'react-query';

import { clientsService } from '../../services/api';

export function useListClients() {
	return useQuery('listClients', clientsService.listActiveClients);
}
