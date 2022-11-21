import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { prisma } from '../../server/db/client';

const movieMetadata = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getServerAuthSession({ req, res });

	if (session) {
		if (req.method === 'GET') {
			const data = req.query;
			console.log('data');
			console.log(data);
			console.log('data');
			const movie: any = await prisma.movie.findUnique({
				where: {
					imdb_code: data.imdb_code,
				},
			});
			console.log(movie);
			res.status(200).json(movie);
		} else {
			res.send({
				error:
					'You must be signed in to view the protected content on this page.',
			});
		}
	}
};

export default movieMetadata;
