import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';
import { signEmailToken } from '../../../utils/promisifyJWT';

// User creation and update
export const userRouter = router({
	// Create user for signup form
	create: publicProcedure
		.input(
			z.object({
				name: z.string().min(1),
				email: z.string().email(),
				password: z.string().min(1).max(32),
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
			if (checkUser)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User already exists',
					cause: input.email,
				});
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
			console.log(newUser);
			// Send verification email
			if (await sendEmailVerification(input.email, token))
				return {
					message: 'User created successfully',
				};
		}),
	// Update user for Settings page
	update: publicProcedure
		.input(
			z.object({
				email: z.string().email(),
				password: z
					.string()
					.regex(new RegExp('^$|.*[A-Z].*'), {
						message: 'One uppercase character required',
					})
					.regex(new RegExp('^$|.*[a-z].*'), {
						message: 'One lowercase character required',
					})
					.regex(new RegExp('^$|.*\\d.*'), { message: 'One number required' })
					.regex(new RegExp('^$|(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8}'), {
						message: 'The password must be more than 8 characters in length',
					})
					.max(255, {
						message: "The password can't be more than 255 characters in length",
					}),
				name: z.string().min(1).max(30),
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);

			// Hash password if given
			let hashedPassword;
			if (input.password) hashedPassword = await hash(input.password);
			// Update user. Undefined values are ignored
			const updated = await ctx.prisma.user.update({
				data: {
					name: input.name,
					email: input.email,
					password: hashedPassword,
				},
				where: {
					email: input.email,
				},
			});
			if (!updated)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No matching user found',
					cause: input.email,
				});
			return {
				message: 'User information updated successfully',
			};
		}),
	// Get user for Settings and Profile pages
	get: publicProcedure
		.input(
			z.object({
				id: z.string().min(1).max(30),
			})
		)
		.query(async ({ input, ctx }) => {
			console.log(input);
			const user = await ctx.prisma.user.findUnique({
				where: {
					id: input.id,
				},
				select: {
					name: true,
					email: true,
					image: true,
				},
			});
			if (!user)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No matching user found',
					cause: input.id,
				});
			return {
				message: 'User information retrieved successfully',
				user: user,
			};
		}),
});
