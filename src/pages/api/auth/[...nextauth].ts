import NextAuth, { Session, User, type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import FortyTwoProvider from 'next-auth/providers/42-school';
import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { verify } from 'argon2';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	// callbacks: {
	// 	async jwt({token,account}) {
	// 		if (account) {
	// 			token.accessToken = account.access_token
	// 		  }
	// 		  return token
	// 	},
	// 	async session({session, user, token}) {
	// 		console.log('User in session callback', user)
	// 		if (user) {
	// 			session.user = user
	// 		}
	// 		if (session.user && token) {
	// 			session.user.id = token.id as string;
	// 		}
	// 		console.log('Session in callback', session)
	// 		return session;
	// 	},
	// },
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {},
			async authorize(credentials: any) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				if (!credentials || !credentials.email || !credentials.password)
					return null;
				const user = await prisma.user.findFirst({
					where: { email: credentials.email },
				});
				console.log('user from db', user);
				if (!user || !user.password || user.id.length < 1) return null;
				// Check password validity
				const validPassword = await verify(user.password, credentials.password);
				if (!validPassword) return null;
				console.log('Password valid. Returning', {
					id: user.id,
					email: user.email,
					name: user.name,
				});
				return {
					id: user.id,
					email: user.email,
					name: user.name,
				};
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || '0',
			clientSecret: process.env.GITHUB_SECRET || '0',
		}),
		FortyTwoProvider({
			clientId: process.env.FORTY_TWO_CLIENT_ID || '0',
			clientSecret: process.env.FORTY_TWO_CLIENT_SECRET || '0',
		}),
		// ...add more providers here
	],
	pages: {
		signIn: '/signin',
	},
	session: {
		// Must be set to jwt for sessions to work properly with credentials provider
		strategy: 'jwt',
	},
	debug: true,
};

export default NextAuth(authOptions);
