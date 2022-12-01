import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';
import { signEmailToken } from '../../../utils/promisifyJWT';

// User creation and update
export const userRouter = router({
	// Create user for signup form
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1).max(255),
				email: z.string().email().max(255),
				password: z.string().min(1).max(255),
			})
		)
		.mutation(async ({ input, ctx }) => {
			// Check if exists
			const checkUser = await ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
			});
			if (checkUser) return 'User already exists';

			// Hash password
			const hashedPassword = await hash(input.password);
			// Create token
			const token = await signEmailToken(input.email);
			// Create new user if not exists
			const newUser = await ctx.prisma.user.upsert({
				where: {
					email: input.email,
				},
				update: {},
				create: {
					name: input.name,
					email: input.email,
					password: hashedPassword,
				} as Prisma.UserCreateInput,
			});
			// Send verification email
			if (await sendEmailVerification(input.email, token))
				return 'User created successfully';
		}),
	// Update user for Settings page
	update: publicProcedure
		.input(
			z.object({
				id: z.string().min(1),
				email: z.string().email().max(255),
				password: z
					.string()
					.regex(new RegExp('.*[A-Z].*'), {
						message: 'One uppercase character required',
					})
					.regex(new RegExp('.*[a-z].*'), {
						message: 'One lowercase character required',
					})
					.regex(new RegExp('.*\\d.*'), { message: 'One number required' })
					.min(8, {
						message: 'The password must be more than 8 characters in length',
					})
					.max(255, {
						message: "The password can't be more than 255 characters in length",
					}),
				name: z.string().min(1).max(255),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				select: {
					name: true,
					email: true,
					image: true,
					emailVerified: true,
				},
			});
			if (!user) return 'No matching user found';
			// Check if email has changed
			const verified = input.email === user.email ? user.emailVerified : null;
			if (!verified) {
				// Check that email is not already in use
				const checkUser = await ctx.prisma.user.findUnique({
					where: {
						email: input.email,
					},
				});
				if (checkUser && checkUser.email !== user.email)
					return 'Email address is already in use';
				// Create token
				const token = await signEmailToken(input.email);
				// Send verification email
				await sendEmailVerification(input.email, token);
			}
			// Hash password if given
			let hashedPassword;
			if (input.password) hashedPassword = await hash(input.password);
			// Update user. Undefined values are ignored
			const updated = await ctx.prisma.user.update({
				data: {
					name: input.name,
					email: input.email,
					password: hashedPassword,
					emailVerified: verified,
				},
				where: {
					id: input.id,
				},
			});
			if (!updated) return 'No matching user found';
			return 'User information updated successfully';
		}),
	// Get user for Settings and Profile pages
	get: publicProcedure
		.input(
			z.object({
				id: z.string().min(1).max(30),
			})
		)
		.query(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				select: {
					name: true,
					email: true,
					image: true,
					emailVerified: true,
					firstLogin: true,
					accounts: {
						select: {
							type: true,
						},
					},
				},
			});
			// if (!user)
			//	return ('No matching user found')
			// 	throw new TRPCError({
			// 		code: 'BAD_REQUEST',
			// 		message: 'No matching user found',
			// 		cause: input.id,
			// 	});
			return {
				message: 'User information updated successfully',
			};
		}),

	getProfile: publicProcedure
		.input(z.string().min(1).max(30))
		.query(async ({ input, ctx }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input,
				},
				select: {
					id: true,
					name: true,
					email: true,
					image: true,
					emailVerified: true,
					accounts: {
						select: {
							type: true,
						},
					},
					firstLogin: true,
				},
			});
			return {
				user,
			};
		}),

	updateFirstLogin: publicProcedure
		.input(z.string().min(1).max(30))
		.mutation(async ({ input, ctx }) => {
			const updatedUser = await ctx.prisma?.user.update({
				where: {
					id: input,
				},
				data: {
					firstLogin: 0,
				},
			});
		}),
});