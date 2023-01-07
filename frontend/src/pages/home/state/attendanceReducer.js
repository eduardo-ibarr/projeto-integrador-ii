export const attendanceReducer = (state, action) => {
	switch (action.type) {
		case 'SET_OPEN_FINISH_MODAL':
			return {
				...state,
				openFinishModal: action.values.openFinishModal,
				id: action.values.id,
			};
		case 'SET_OPEN_INACTIVATE_MODAL':
			return {
				...state,
				openInactivateModal: action.values.openInactivateModal,
				id: action.values.id,
			};
		case 'SET_CLOSE_INACTIVATE_MODAL':
			return {
				...state,
				openInactivateModal: action.value,
			};
		case 'SET_CLOSE_FINISH_MODAL':
			return {
				...state,
				openFinishModal: action.value,
			};
		default:
			break;
	}
};
