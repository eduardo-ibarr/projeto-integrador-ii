import { useQuery } from 'react-query';

import { worksService } from '../../services/api';

export function useListActiveWorks() {
	return useQuery('listActiveWorks', worksService.listActiveWorks, {
		cacheTime: 100,
	});
}
