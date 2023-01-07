import { useQueryClient } from 'react-query';

export function useInvalidateServices() {
	const queryClient = useQueryClient();

	const onSuccessFn = () => {
		queryClient.invalidateQueries(['listActiveServices', 'showServices']);
	};

	return onSuccessFn;
}
