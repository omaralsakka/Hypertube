import { DefaultSession, TokenSet } from 'next-auth';
import { User } from './next-auth.d'
declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user?: {
			id: string;
		} & DefaultSession['user'];
		token: TokenSet & { user: User}
	}
}

declare module '*.jpg';
declare module '*.png';
