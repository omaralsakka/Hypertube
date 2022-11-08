import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { WatchedMoviesUpsert } from '../../../types/appTypes';

export const moviesRouter = router({
	/* getMovieByImdb: publicProcedure
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
		}), */

	setMovieAsWatched: publicProcedure
		.input(
			z.object({ user_id: z.string().min(1), movie_id: z.string().min(1) })
		)
		.mutation(async ({ input, ctx }) => {
			let isWatched: boolean = false;
			const userData = await ctx.prisma.watchedMovies.findFirst({
				where: {
					user_id: input.user_id,
				},
			})
			if(userData) {
				userData.movies.map((movie) => {
					if(movie === input.movie_id){
						isWatched = true;
					}
				})
			}
			if(isWatched === false){
				const watchedMovie = await ctx.prisma.watchedMovies.upsert({
					where: {
						user_id: input.user_id,
					  },
					update: {
						movies: {
							push: input.movie_id,
						}
					},
					create: {
					  user_id: input.user_id,
					  movies: input.movie_id,
					} as WatchedMoviesUpsert
				});
			}
			return {
				message: 'Movie set as watched into table successfully',
			};
		}),
});
