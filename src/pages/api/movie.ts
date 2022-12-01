import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
import axios from 'axios';
import { Movie } from '../../types/appTypes';
import { z } from 'zod';

const schema = z.object({
	search_term: z.string().max(50),
	genre: z.string().max(10),
	fromYear: z.string().max(10),
	toYear: z.string().max(10),
	fromRunTime: z.string().max(10),
	toRunTime: z.string().max(10),
	imdbRating: z.string().max(10),
	orderBy: z.string().max(10),
	sortBy: z.string().max(10),
	quality: z.string().max(10),
	seeds: z.string().max(10),
	description: z.string().max(50),
	page: z.number().max(10),
});

const filterSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		// try {
		// 	const data = schema.parse(req.body.input);
		// } catch (e) {
		// 	console.log(req.body);
		// 	return res.status(400).send({
		// 		message: `Yo, bad payload!`,
		// 	});
		// }

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
					year: { gte: input.fromYear, lte: input.toYear + 1 },
					language: { contains: input.language },
					runtime: {
						gte: input.fromRunTime,
						lte: input.toRunTime,
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
		}

		res.status(200).json(movies);
	}
};

export default filterSearch;
