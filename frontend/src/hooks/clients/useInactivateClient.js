import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';
import { useInvalidateClients } from './useInvalidateClients';

export function useInactivateClient() {
	const invalidateClients = useInvalidateClients();

	return useMutation(
		'inactivateClient',
		(id) => clientsService.inactivateClient(id),
		{
			onSuccess: invalidateClients,
		}
	);
}
