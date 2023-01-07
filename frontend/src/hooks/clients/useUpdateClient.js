import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';
import { useInvalidateClients } from './useInvalidateClients';

export function useUpdateClient() {
	const invalidateClients = useInvalidateClients();

	return useMutation(
		'updateClient',
		({ value, id }) => clientsService.updateClient({ value, id }),
		{
			onSuccess: invalidateClients,
		}
	);
}
