export const clientReducer = (state, action) => {
	switch (action.type) {
		case 'DISABLE_NAME':
			return {
				...state,
				name: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_RG':
			return {
				...state,
				rg: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_CPF':
			return {
				...state,
				cpf: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_PHONE_NUMBER':
			return {
				...state,
				phoneNumber: {
					disabled: action.disabled,
				},
			};
		case 'DISABLE_ADDRESS':
			return {
				...state,
				address: {
					disabled: action.disabled,
				},
			};
		default:
			break;
	}
};
