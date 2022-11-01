import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const commentRouter = router({
	getMovieComments: publicProcedure
		.input(z.object({ imdb_code: z.string() }))
		.query(async ({ input, ctx }) => {
			const comments: any = await ctx.prisma.comment.fidMany({
				where: { imdb_code: input.imdb_code },
			});
			console.log(comments);
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
				comment_text: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);
			const newMovie: any = await ctx.prisma.comment.create({
				data: {
					imdb_code: input.imdb_code,
					comment_text: input.comment_text,
				},
			});
			console.log(newMovie);
			return {
				message: 'Comment inserted into table successfully',
			};
		}),
});
