import { useQuery } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useShowAttendance() {
	return useQuery(
		'showAttendance',
		(id) => attendancesServices.showAttendance(id),
		{ cacheTime: 100 }
	);
}
