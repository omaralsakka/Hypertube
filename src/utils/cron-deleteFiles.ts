import cron from 'node-cron';
import { trpc } from '../utils/trpc';
import { prisma } from '../server/db/client';

export const deleteFiles = async () => {
	//cron.schedule('10 * * * * *', async () => {
	// get all movie data
	let downloadedMovies: any;
	const mutation = trpc.movies.getAllMovies.useQuery();
	try {
		downloadedMovies = await prisma.movies.findMany();
	} catch (error) {
		console.error(error);
	}

	/* downloadedMovies.filter((movie: any) => {
        }) */

	// check if there is a movie that has been watched 1 > month ago

	// delete all movies that are "expired"
	/* }); */
};
