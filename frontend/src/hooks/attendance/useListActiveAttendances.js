import { useQuery } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useListActiveAttendances() {
	return useQuery(
		'listActiveAttendances',
		attendancesServices.listActiveAttendances,
		{ cacheTime: 0 }
	);
}
