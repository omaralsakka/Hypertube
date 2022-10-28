import { router, publicProcedure } from '../trpc';
import * as z from 'zod';
import { hash, verify } from 'argon2';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
	authCredentials: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z.string().min(4).max(12),
			})
		)
		.query(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findFirst({
				where: { email: input.email },
			});
			console.log('User queried from db', user);
			if (!user)
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid user',
				});
			// Hash password
			const hashedPassword = await hash(input.password);
			// Check password validity
			const validPassword = verify(user.password, hashedPassword);
			if (!validPassword)
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'Invalid password',
				});
			return {
				id: user.id,
				email: user.email,
				name: user.name,
			};
		}),
});
