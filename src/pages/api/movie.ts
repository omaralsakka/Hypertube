import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

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
