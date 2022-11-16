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
// "returning" a promise removes the error, however i am not actually resolving or rejecting 
// if i do 'res' or 'rej' that will produce an error ...

// This endpoint has not been protected. I will do it if necessary. This whole file might be used
// a different way than I initally tought of.

export default function deleteFiles(){
    return new Promise(async (reject, resolve) => {
        const task = cron.schedule('0 23 * * *', async () => { // '*/1 * * * * *' every second for testing
        console.log('cron is running in the background, will do a check at 23');
        let downloadedMovies: MovieData[] = [];
        let timestamp: number = Date.now();

        try {
            downloadedMovies = await prisma.movies.findMany();
        } catch (error) {
            console.error(error);
        }

        let moviesToDelete: MovieData[] = [];

        downloadedMovies?.filter((movie: MovieData) => {
            if(Date.parse(movie.date) < timestamp - 2629800000) { // can use 1 instead of 2629800000 (1 month) to test. these are milliseconds
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