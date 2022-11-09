import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../db/client';

export const movieRouter = router({
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
					size: 1, // property size is missing need add something
				},
			});
			console.log(newMovie);
			return {
				message: 'Movie inserted into table successfully',
			};
		}),

	search: publicProcedure
		.input(
			z.object({
				search_term: z.string(),
				// genre: z.string(),
				fromYear: z.number(),
				toYear: z.number(),
				fromRunTime: z.number(),
				toRunTime: z.number(),
				imdbRating: z.number(),
				orderBy: z.string(),
				sortBy: z.string(),
				// description: z.string(),
				// limit: z.number(),
				// seeds: z.number(),
			})
		)
		.query(async ({ input, ctx }) => {
			console.log(input);
			const movies: any = await ctx.prisma.movie.findMany({
				// include: { torrent: true },
				skip: 0,
				take: 50,
				where: {
					title: { contains: input.search_term, mode: 'insensitive' },
					year: { gt: input.fromYear, lt: input.toYear },
					runtime: {
						gt: input.fromRunTime,
						lt: input.toRunTime,
					},
					rating: {
						gt: input.imdbRating,
					},
				},
				orderBy: { [input.sortBy]: input.orderBy },
				// where: {
				// 	// torrent: {
				// 	// 	seeds: { gt: 5 },
				// 	// },
				// },
				// },
				// where: {
				// 	title: { contains: input.search_term, mode: 'insensitive' },
				// 	// genre.name {
				// 	// 	contains: input.genre,
				// 	// },

				// 	torrent: {
				// 		peers: { gt: 5 },
				// 	},

				// },
			});
			return {
				movies,
			};
		}),
});

// searchMovie: publicProcedure.input(
//
// )

// .query( async ({input, ctx})=> {
// 	console.log(input);
// 	const movies: any = await ctx.prisma.movie.findMany({
// 						where: {
//

// 		});
// 	}),

// fromYear: number;
// toYear: number;
// genre: string;
// imdbRating: string;
// orderBy: string;
// sortBy: string;
// quality: string;

//
