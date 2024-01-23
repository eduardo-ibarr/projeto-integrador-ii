import { useQuery } from 'react-query';

import { worksService } from '../../services/api';

export function useShowWork(id) {
	return useQuery('showWork', () => worksService.showWork(id), {
		cacheTime: 100,
	});
}
