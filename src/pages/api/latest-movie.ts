import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const getLatestMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	const latest = await prisma.movie.findMany({
		orderBy: {
			id: 'desc',
		},
		take: 1,
	});
	res.status(200).json(latest[0].id);
};
export default getLatestMovie;
