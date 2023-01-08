import { useQueryClient } from 'react-query';

export function useInvalidateAttendances() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries('listActiveAttendances');
		queryClient.invalidateQueries('listActiveClients');
		queryClient.invalidateQueries('showAttendance');
	};

	return onSuccessFn;
}
