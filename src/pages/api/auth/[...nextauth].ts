import NextAuth, { type NextAuthOptions } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import GitHubProvider from 'next-auth/providers/github';
import FortyTwoProvider from 'next-auth/providers/42-school';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { verify } from 'argon2';

export const authOptions: NextAuthOptions = {
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
					emailVerified: user.emailVerified,
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
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: Number(process.env.EMAIL_SERVER_PORT),
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		// ...add more providers here
	],
	pages: {
		signIn: '/login',
	},
	session: {
		// Must be set to jwt for sessions to work properly with credentials provider
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (user) {
				token.user = user;
				return token;
			}
			if (account) {
				token.user = account;
			}
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.token = token;
			return session;
		},
		async signIn({ user, account, profile }) {
			console.log('user in signin callback', user);
			// Check if user's email has been verified
			console.log('account in signin callback', account);
			// OAuth providers are trusted by default. Other OAuth providers should be added here too.
			if (account?.provider === '42-school' || account?.provider === 'github')
				return true;
			if (account?.provider === 'email') {
				if (user.name)
					return true;
				else
					return '/signupfirst';
			}
			const user2 = user as AdapterUser;
			// For credentials login is rejected if email hasn't been verified
			if (account?.provider === 'credentials' && user2.emailVerified)
				return true;
			// Return false to display a default error message
			return '/notverified';
			// Or you can return a URL to redirect to:
			// return '/unauthorized'
		},
	},
	debug: true,
};

export default NextAuth(authOptions);
