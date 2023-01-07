import { useQueryClient } from 'react-query';

export function useInvalidateAttendances() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries([
			'listActiveAttendances',
			'showAttendances',
		]);
	};

	return onSuccessFn;
}
