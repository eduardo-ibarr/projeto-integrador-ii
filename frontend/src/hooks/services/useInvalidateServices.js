import { useQueryClient } from 'react-query';

export function useInvalidateServices() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries('listActiveServices');
		queryClient.invalidateQueries('showService');
	};

	return onSuccessFn;
}
