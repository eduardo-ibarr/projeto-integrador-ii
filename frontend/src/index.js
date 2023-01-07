import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<QueryClientProvider client={queryClient}>
		<AppRoutes />
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
);
