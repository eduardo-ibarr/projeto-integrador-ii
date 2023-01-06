function canShowReducer(state, action) {
	switch (action.type) {
		case 'RG':
			return { ...state, rg: action.value };
		case 'CPF':
			return { ...state, cpf: action.value };
		case 'PHONE_NUMBER':
			return { ...state, phoneNumber: action.value };
		default:
			break;
	}
}

export default canShowReducer;
