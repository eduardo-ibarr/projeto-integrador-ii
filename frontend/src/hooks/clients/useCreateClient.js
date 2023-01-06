import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';

export function useCreateClient() {
	return useMutation('createNewClient', clientsService.createNewClient);
}
