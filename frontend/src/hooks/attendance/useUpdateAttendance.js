import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useUpdateAttendance() {
	return useMutation('updateAttendance', ({ id, data }) =>
		attendancesServices.updateAttendance({ id, data })
	);
}
