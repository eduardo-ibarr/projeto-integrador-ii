export const serviceReducer = (state, action) => {
	switch (action.type) {
		case 'DISABLE_NAME':
			return {
				...state,
				name: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_PRICE':
			return {
				...state,
				price: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_DESCRIPTION':
			return {
				...state,
				description: {
					disabled: action.disabled,
				},
			};
		default:
			break;
	}
};
