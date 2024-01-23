import { useMutation } from 'react-query';

import { worksService } from '../../services/api';
import { useInvalidateWorks } from './useInvalidateWorks';

export function useCreateWork() {
	const invalidateWorks = useInvalidateWorks();

	return useMutation(
		'createWork',
		(values) => worksService.createWork(values),
		{
			onSuccess: invalidateWorks,
		}
	);
}
