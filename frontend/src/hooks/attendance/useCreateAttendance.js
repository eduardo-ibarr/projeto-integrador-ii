import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';
import { useInvalidateAttendances } from './useInvalidateAttendances';

export function useCreateAttendance() {
	const invalidateAttendances = useInvalidateAttendances();

	return useMutation(
		'createNewAttendance',
		(values) => attendancesServices.createNewAttendance(values),
		{
			onSuccess: invalidateAttendances,
		}
	);
}
