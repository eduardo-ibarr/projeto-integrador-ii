import { useQuery } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useListAttendances() {
	return useQuery(
		'listAttendances',
		attendancesServices.listActiveAttendances
	);
}
