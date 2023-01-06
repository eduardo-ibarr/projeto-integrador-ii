function clientReducer(state, action) {
	switch (action.type) {
		case 'SET_NAME':
			return {
				...state,
				name: {
					value: action.value,
					invalid: action.invalid,
					disabled: action.disabled,
				},
			};
		case 'SET_RG':
			return {
				...state,
				rg: {
					value: action.value,
					invalid: action.invalid,
					disabled: action.disabled,
				},
			};
		case 'SET_CPF':
			return {
				...state,
				cpf: {
					value: action.value,
					invalid: action.invalid,
					disabled: action.disabled,
				},
			};
		case 'SET_PHONE_NUMBER':
			return {
				...state,
				phoneNumber: {
					value: action.value,
					invalid: action.invalid,
					disabled: action.disabled,
				},
			};
		case 'SET_ADDRESS':
			return {
				...state,
				address: {
					value: action.value,
					invalid: action.invalid,
					disabled: action.disabled,
				},
			};
		default:
			break;
	}
}

export default clientReducer;
