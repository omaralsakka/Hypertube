import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
import axios from 'axios';

const filterSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const input = req.body;
		console.log('bodybody');
		console.log(req.body);
		console.log('bodybody');
		const movies: any = await prisma.movie.findMany({
			skip: 0,
			take: 20,
			where: {
				// title: { contains: input.search_term, mode: 'insensitive' },
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
		});
		// console.log(movies);

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
			// console.log(input);
			


    // src/pages/api/examples.ts 
    */
