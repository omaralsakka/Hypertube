import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../../server/db/client';

export const moviesRouter = router({
	getMovieByImdb: publicProcedure
		.input(z.object({ imdb_code: z.string() }))
		.query(async ({ input, ctx }) => {
			const movies: any = await ctx.prisma.movies.findFirst({
				where: { imdb_code: input.imdb_code },
			});
			console.log(movies);
			if (!movies)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'No movies found',
					cause: input.imdb_code,
				});
			return {
				movies,
			};
		}),

	addMovie: publicProcedure
		.input(
			z.object({ imdb_code: z.string().min(1), movie_path: z.string().min(1) })
		)
		.mutation(async ({ input, ctx }) => {
			console.log(input);
			const newMovie: any = await ctx.prisma.movies.create({
				data: {
					imdb_code: input.imdb_code,
					movie_path: input.movie_path,
				},
			});
			console.log(newMovie);
			return {
				message: 'Movie inserted into table successfully',
			};
		}),
});
