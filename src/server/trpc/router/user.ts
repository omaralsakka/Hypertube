import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';

export const userRouter = router({
	create: publicProcedure
		.input(z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(1).max(5) }))
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
			const hashedPassword = await hash(input.password)
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
			return {
				message: 'User created successfully',
			};
		}),
		update: publicProcedure
		.input(z.object({ email: z.string().email(), password: z.string().min(1).max(30), name: z.string().min(1).max(30)}))
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
			const hashedPassword = await hash(input.password)
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
			return {
				message: 'User created successfully',
			};
		}),
	// history: publicProcedure
	// .input(z.object({ id: z.string()}))
	// .query(({ input, ctx }) => {
	// 	const user = ctx.prisma.history.findMany({where: { email: input.email}});
	// 	if (!user)
	// 		throw new TRPCError({
	// 			code: 'BAD_REQUEST',
	// 			message: 'No user found',
	// 			cause: input.email,
	// 		});
	// 	return { 
	// 		name: user.name,
	// 		image: user.image
	// 	}
	// }),
});
