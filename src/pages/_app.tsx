// src/pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'i18next';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import LanguageProvider from '../components/languageProvider';
import { Provider } from 'react-redux';
import store from '../store/store';
import Head from 'next/head';
import Layout from '../components/layout';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<>
			<SessionProvider session={session}>
				<Head>
					<title>Hypertube</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Provider store={store}>
					<LanguageProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</LanguageProvider>
				</Provider>
			</SessionProvider>
		</>
	);
};

export default trpc.withTRPC(MyApp);
