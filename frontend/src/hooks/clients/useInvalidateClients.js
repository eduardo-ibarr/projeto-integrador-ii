import { useQueryClient } from 'react-query';

export function useInvalidateClients() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries(['listActiveClients', 'showClients']);
	};

	return onSuccessFn;
}
