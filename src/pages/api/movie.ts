import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
import axios from 'axios';
import { Movie } from '../../types/appTypes';

const filterSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const input = req.body;

		let movies = [];
		if (input.genre != '') {
			movies = await prisma.movie.findMany({
				skip: input.page * 20,
				take: 20,
				where: {
					title: { contains: input.search_term, mode: 'insensitive' },
					year: { gte: input.fromYear, lte: input.toYear },
					language: { contains: input.language },
					runtime: {
						gte: input.fromRunTime,
						lte: input.toRunTime,
					},
					genres: {
						has: input.genre,
					},
					rating: {
						gte: input.imdbRating,
					},
					description_full: {
						contains: input.description,
						mode: 'insensitive',
					},
					torrent: {
						some: {
							quality: {
								contains: input.quality,
							},
							seeds: {
								gte: input.seeds,
							},
						},
					},
				},
				orderBy: [{ [input.sortBy]: input.orderBy }, { title: 'asc' }],
			});
		} else {
			movies = await prisma.movie.findMany({
				skip: input.page * 20,
				take: 20,
				where: {
					title: { contains: input.search_term, mode: 'insensitive' },
					year: { gt: input.fromYear, lt: input.toYear },
					language: { contains: input.language },
					runtime: {
						gt: input.fromRunTime,
						lt: input.toRunTime,
					},
					rating: {
						gt: input.imdbRating,
					},
					description_full: {
						contains: input.description,
						mode: 'insensitive',
					},
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
				},
				orderBy: [{ [input.sortBy]: input.orderBy }, { title: 'asc' }],
			});
		}

		res.status(200).json(movies);
	}
};

export default filterSearch;

/*
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
			


    // src/pages/api/examples.ts 
    */
