// src/pages/_app.tsx
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Head>
				<title>Hypertube</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<link
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Provider store={store}>
				<LanguageProvider>
					<Component {...pageProps} />
				</LanguageProvider>
			</Provider>
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
