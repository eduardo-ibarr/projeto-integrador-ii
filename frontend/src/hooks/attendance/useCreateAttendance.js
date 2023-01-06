import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';

export function useCreateAttendance() {
	return useMutation('createNewAttendance', (values) =>
		attendancesServices.createNewAttendance(values)
	);
}
