import { useMutation } from 'react-query';

import { clientsService } from '../../services/api';

export function useUpdateClient() {
	return useMutation('updateClient', ({ value, id }) =>
		clientsService.updateClient({ value, id })
	);
}
