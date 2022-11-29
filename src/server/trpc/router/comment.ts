import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const commentRouter = router({
	getMovieComments: publicProcedure
		.input(z.object({ imdb_code: z.string().min(1) }))
		.query(async ({ input, ctx }) => {
			console.log(input);
			const comments: any = await ctx.prisma.comment.findMany({
				where: { imdb_code: input.imdb_code as string },
				select: {
					id: true,
					imdb_code: true,
					comment_text: true,
					created_at: true,
					user: {
						select: {
							id: true,
							name: true,
							image: true,
						},
					},
				},
			});

			if (!comments)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No comments found',
					cause: input.imdb_code,
				});
			return {
				comments,
			};
		}),

	createComment: publicProcedure
		.input(
			z.object({
				imdb_code: z.string().min(1),
				comment_text: z.string().min(1).max(250),
				user_id: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const newComment: any = await ctx.prisma.comment.create({
				data: {
					imdb_code: input.imdb_code,
					comment_text: input.comment_text,
					userId: input.user_id,
				},
			});
			//console.log(newComment);
			return {
				message: 'Comment inserted into table successfully',
				newComment,
			};
		}),
});
