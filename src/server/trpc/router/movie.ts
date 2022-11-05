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

	searchMovie: publicProcedure
	.input(
		z.object({ fromYear: z.number(), toYear: z.number(), genre: z.string(), imdbRating: z.number(), orderBy: z.string(), sortBy: z.string(), quality: z.string(), search_term: z.string() })
	)
	.query( async ({input, ctx})=> {
		console.log(input);
		const movies: any = await ctx.prisma.movie.findMany({
			where: {
				title: {
					has: input.search_term
				},
				genre: {
					has: input.genre
				},
				quality: {
					has: input.quality
				},
				fromYear: {
					gt: input.fromYear
		
				},
				toYear: {
					lt: input.toYear
				},
				imdbRating: {
		
					gt: input.imdbRating
				},
				orderBy: { input.orderBy: input.sortBy}
	}

});


// fromYear: number;
// toYear: number;
// genre: string;
// imdbRating: string;
// orderBy: string;
// sortBy: string;
// quality: string;
