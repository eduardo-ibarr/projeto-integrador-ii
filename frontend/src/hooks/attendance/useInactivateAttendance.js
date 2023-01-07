import { useMutation } from 'react-query';

import { attendancesServices } from '../../services/api';
import { useInvalidateAttendances } from './useInvalidateAttendances';

export function useInactivateAttendance() {
	const invalidateAttendances = useInvalidateAttendances();

	return useMutation(
		'inactivateAttendance',
		(id) => attendancesServices.inactivateAttendance(id),
		{
			onSuccess: invalidateAttendances,
		}
	);
}
