import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
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
			if (!checkUser){
				return ('No matching user found.')
			}
			// Create token
			const token = await signEmailToken(input.email);
			// Send verification email
			if (await sendEmailVerification(input.email, token))
				return ('User created successfully')
		}),
	// Verify email
	verify: publicProcedure
		.input(
			z.object({
				token: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const serverToken = process.env.NEXTAUTH_SECRET;
			if (!serverToken) {
				return ('no server token.')
			}
			// Verify email token
			const payload = await verifyJWT(input.token, serverToken);
			if (typeof payload === 'undefined' || typeof payload === 'string') {
				return ('invalid token.')
			} else {
				const updated = await ctx.prisma.user.update({
					data: {
						emailVerified: new Date(),
					},
					where: {
						email: payload.email,
					},
				});
				if (!updated){
					return ('No matching user.')
				}
				return ('Email verified successfully.');
			}
			// Update db
		}),
});
