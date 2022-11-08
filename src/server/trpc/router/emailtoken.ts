import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';
import { signEmailToken, verifyJWT } from '../../../utils/promisifyJWT';

// Email verification endpoints
export const tokenRouter = router({
	// Resend email verification on request
	resend: publicProcedure
		.input(
			z.object({
				email: z.string().email()
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);
			// Check if exists
			const checkUser = await ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
			});
			if (!checkUser)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No matching user found',
					cause: input.email,
				});
			// Create token
			const token = await signEmailToken(input.email);
			// Send verification email
			if (await sendEmailVerification(input.email, token))
				return {
					message: 'User created successfully',
				};
		}),
	// Verify email
	verify: publicProcedure
		.input(
			z.object({
				token: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);
			const serverToken = process.env.NEXTAUTH_SECRET;
			if (!serverToken) {
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
				});
			}
			// Verify email token
			const payload = await verifyJWT(input.token, serverToken);
			console.log(payload);
			if (typeof payload === 'undefined' || typeof payload === 'string')
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Invalid token',
					cause: input.token,
				});
			// Update db
			const updated = await ctx.prisma.user.update({
				data: {
					emailVerified: new Date(),
				},
				where: {
					email: payload.email,
				},
			});
			console.log(updated);
			if (!updated)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No matching user found',
				});
			return {
				message: 'Email verified successfully',
			};
		}),
});
