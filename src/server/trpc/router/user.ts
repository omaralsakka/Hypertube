import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';

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
			console.log('checkUser', checkUser);
			if (checkUser)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User already exists',
					cause: input.email,
				});

			// Create new user if not exists
			const newUser = await ctx.prisma.user.upsert({
				where: {
					email: input.email,
				},
				update: {},
				create: {
					name: input.name,
					email: input.email,
					password: input.password,
				} as Prisma.UserCreateInput,
			});
			console.log(newUser);
			return {
				message: 'User created successfully',
			};
		}),
	get: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.example.findMany();
	}),
});
