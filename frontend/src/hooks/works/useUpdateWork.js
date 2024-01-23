import { useMutation } from 'react-query';

import { worksService } from '../../services/api';
import { useInvalidateWorks } from './useInvalidateWorks';

export function useUpdateWork() {
	const invalidateWorks = useInvalidateWorks();

	return useMutation(
		'updateWork',
		({ id, data }) => worksService.updateWork({ id, data }),
		{ onSuccess: invalidateWorks }
	);
}
