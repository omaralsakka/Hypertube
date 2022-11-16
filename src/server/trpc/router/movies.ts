import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { WatchedMoviesUpsert } from '../../../types/appTypes';

export const moviesRouter = router({
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
			if(userData !== null && userData.movies.includes(input.movie_id)) {
				isWatched = true;
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

	updateMovieDate: publicProcedure
	.input(
		z.object({ imdbCode: z.string().min(1) })
	).mutation(async ({input, ctx}) => {
		let timestamp: Date | string = new Date();
		timestamp = timestamp.toString();
		const newDate = await ctx.prisma.movies.update({
			where: {
				imdb_code: input.imdbCode,
			  },
			  data: {
				date: timestamp
			  }
		});
	}),

	getAllMovies: publicProcedure
	.query(async ({ ctx }) => {
		const movies: any = await ctx.prisma.movies.findMany();
		console.log(movies);
		return {
			movies,
		};
	}),

	getWatchedMovies: publicProcedure
	.input(z.string())
	.query(async ({ input, ctx }) => {
		const movies: any = await ctx.prisma.watchedMovies.findFirst({
			where: {
				user_id: input,
			},
		});
		console.log(movies);
		return {
			movies,
		};
	}),

	deleteMovie: publicProcedure
	.input(z.string())
	.query(async ({input, ctx}) => { // give the imdbCode as input
		const deletedMovies: any = await ctx.prisma.movies.delete({
			where: {
				imdb_code: input
			}
		})
	}),
});
