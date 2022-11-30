import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';
var { spawn } = require('child_process');

const getLatestMovie = async (req: NextApiRequest, res: NextApiResponse) => {
	const latest = await prisma.movie.findMany({
		orderBy: {
			id: 'desc',
		},
		take: 1,
	});
	res.status(200).json(latest[0]?.id);
};
export default getLatestMovie;
