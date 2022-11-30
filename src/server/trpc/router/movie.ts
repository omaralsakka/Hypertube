import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../../db/client';
import { MdDescription } from 'react-icons/md';

export const movieRouter = router({
	search: publicProcedure
		.input(
			z.object({
				search_term: z.string().max(50),
				genre: z.string().max(10),
				fromYear: z.number().max(4),
				toYear: z.number().max(4),
				fromRunTime: z.number().max(3),
				toRunTime: z.number().max(3),
				imdbRating: z.number().max(1),
				orderBy: z.string().max(3),
				sortBy: z.string().max(4),
				quality: z.string().max(5),
				seeds: z.number().max(2),
				description: z.string().max(50),
				page: z.number().max(10),
				// limit: z.number(),
			})
		)
		.query(async ({ input, ctx }) => {
			const movies: any = await ctx.prisma.movie.findMany({
				skip: 0,
				take: 0,
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
			return {
				movies,
			};
		}),
});
