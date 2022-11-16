import { NextApiRequest, NextApiResponse } from 'next';
import cron from 'node-cron';
import { prisma } from '../../server/db/client';
import fs from 'fs';

interface MovieData {
    id:	string
    imdb_code:	string
    movie_path:	string
    size:	number
    downloaded:	number
    date:	string
}
// API resolved without sending a response for /api/delete-movie, this may result in stalled requests.
// Not sure if i should return a promise here to avoid the the error above.

export default function deleteFiles(){
    return new Promise(async (reject, resolve) => {
        const task = cron.schedule('*/1 * * * * *', async () => { // '*/1 * * * * *' every second for testing
        console.log('cron is running in the background, will do a check at 23');
        let downloadedMovies: MovieData[] = [];
        let timestamp: number = Date.now();

        try {
            downloadedMovies = await prisma.movies.findMany();
        } catch (error) {
            console.error(error);
        }

        let moviesToDelete: MovieData[] = []; // fix typescript

        downloadedMovies?.filter((movie: MovieData) => {
            if(Date.parse(movie.date) < timestamp - 1) { // can use 1 instead of 2629800000 to test. these are milliseconds
                moviesToDelete.push(movie);
            }
        })

        moviesToDelete.map(async (movie: MovieData) => {
            fs.rmSync(`./movies/${movie.imdb_code}`, { recursive: true, force: true });
            await prisma.movies.delete({
                where: {
                    imdb_code: movie.imdb_code
                }
            })
        })
    });
    task.start();
  });
};