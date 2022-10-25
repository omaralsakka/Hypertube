// src/pages/_app.tsx
import 'i18next';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from '../store/store';
import LanguageProvider from '../LanguageProvider';
const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<LanguageProvider>
					<Component {...pageProps} />
				</LanguageProvider>
			</Provider>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
