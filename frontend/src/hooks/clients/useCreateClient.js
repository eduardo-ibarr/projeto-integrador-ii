import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';
import { useInvalidateClients } from './useInvalidateClients';

export function useCreateClient() {
	const invalidateClients = useInvalidateClients();

	return useMutation(
		'createNewClient',
		(values) => clientsService.createNewClient(values),
		{
			onSuccess: invalidateClients,
		}
	);
}
