import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../db/client';
import { MdDescription } from 'react-icons/md';

export const movieRouter = router({
	search: publicProcedure
		.input(
			z.object({
				search_term: z.string(),
				genre: z.string(),
				fromYear: z.number(),
				toYear: z.number(),
				fromRunTime: z.number(),
				toRunTime: z.number(),
				imdbRating: z.number(),
				orderBy: z.string(),
				sortBy: z.string(),
				quality: z.string(),
				seeds: z.number(),
				description: z.string(),
				// limit: z.number(),
			})
		)
		.query(async ({ input, ctx }) => {
			// console.log(input);
			const movies: any = await ctx.prisma.movie.findMany({
				skip: 0,
				take: 20,
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
					// description_full: {
					// 	contains: input.description,
					// 	mode: 'insensitive',
					// },
					torrent: {
						some: {
							quality: {
								contains: input.quality,
							},
							seeds: {
								gt: input.seeds,
							},
						},
					},
					genre: {
						some: {
							genreName: {
								contains: input.genre,
							},
						},
					},
				},
				orderBy: { [input.sortBy]: input.orderBy },
				include: {
					genre: true,
				},
			});
			console.log(movies);
			return {
				movies,
			};
		}),
});
