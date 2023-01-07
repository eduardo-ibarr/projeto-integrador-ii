import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useInactivateAttendance() {
	return useMutation('inactivateAttendance', (id) =>
		attendancesServices.inactivateAttendance(id)
	);
}
