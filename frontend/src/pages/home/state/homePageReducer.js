export const homePageReducer = (state, action) => {
	switch (action.type) {
		case 'SET_OPEN_FINISH_MODAL':
			return {
				...state,
				openFinishModal: action.values.openFinishModal,
				selectedAttendanceId: action.values.selectedAttendanceId,
			};
		case 'SET_OPEN_INACTIVATE_MODAL':
			return {
				...state,
				openInactivateModal: action.values.openInactivateModal,
				selectedAttendanceId: action.values.selectedAttendanceId,
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
		case 'SET_TOAST_SUCCESS':
			return {
				...state,
				openSuccessToast: action.value,
			};
		case 'SET_TOAST_ERROR':
			return {
				...state,
				openErrorToast: action.value,
			};
		default:
			break;
	}
};
