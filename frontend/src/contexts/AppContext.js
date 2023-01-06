import { createContext, useContext } from 'react';

export const AppContext = createContext({
	isLocalHost: false,
});

export function useAppContext() {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error('use app context must be used within an AppProvider');
	}

	return context;
}
