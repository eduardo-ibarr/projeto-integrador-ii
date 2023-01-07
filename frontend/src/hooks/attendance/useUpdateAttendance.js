import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';
import { useInvalidateAttendances } from './useInvalidateAttendances';

export function useUpdateAttendance() {
	const invalidateAttendances = useInvalidateAttendances();

	return useMutation(
		'updateAttendance',
		({ id, data }) => attendancesServices.updateAttendance({ id, data }),
		{
			onSuccess: invalidateAttendances,
		}
	);
}
