import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
import axios from 'axios';
const { Console } = require('console');
const fs = require('fs');

const myLogger = new Console({
	stdout: fs.createWriteStream('normalStdout.txt'),
	stderr: fs.createWriteStream('errStdErr.txt'),
});
const filterSearch = async (req: NextApiRequest, res: NextApiResponse) => {
	myLogger.log(req);
	if (req.method === 'POST') {
		const input = req.body;

		const movies: any = await prisma.movie.findMany({
			skip: input.page * 20,
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
			orderBy: [{ [input.sortBy]: input.orderBy }, { title: 'asc' }],
		});
		// console.log(movies);

		res.status(200).json(movies);
		return res;
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
