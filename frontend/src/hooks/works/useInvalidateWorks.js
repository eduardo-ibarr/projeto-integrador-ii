import { useQueryClient } from 'react-query';

export function useInvalidateWorks() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries('listActiveWorks');
		queryClient.invalidateQueries('showWork');
	};

	return onSuccessFn;
}
