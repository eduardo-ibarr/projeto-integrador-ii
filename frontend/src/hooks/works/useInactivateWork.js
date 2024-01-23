import { useMutation } from 'react-query';

import { worksService } from '../../services/api';
import { useInvalidateWorks } from './useInvalidateWorks';

export function useInactivateWork() {
	const invalidateWorks = useInvalidateWorks();

	return useMutation(
		'inactivateWork',
		(id) => worksService.inactivateWork(id),
		{
			onSuccess: invalidateWorks,
		}
	);
}
