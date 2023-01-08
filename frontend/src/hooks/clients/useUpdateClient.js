import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';
import { useInvalidateClients } from './useInvalidateClients';

export function useUpdateClient() {
	const invalidateClients = useInvalidateClients();

	return useMutation(
		'updateClient',
		({ id, data }) => clientsService.updateClient({ id, data }),
		{
			onSuccess: invalidateClients,
		}
	);
}
