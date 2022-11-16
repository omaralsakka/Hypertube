import cron from 'node-cron';
import { trpc } from '../utils/trpc';
import { prisma } from '../server/db/client';

export const deleteFiles = async () => {
        //cron.schedule('10 * * * * *', async () => {
        console.log('cron is running in the background every 10 seconds');
        let downloadedMovies: any;
        let timestamp: number = Date.now();
        const query = trpc.movies.getAllMovies.useQuery();
        
        let moviesToDelete: any = []; // fix typescript

        query?.data?.movies?.filter((movie: any) => {
            if(Date.parse(movie.date) < timestamp - 1) {
                moviesToDelete.push(movie);
            }
        })

        console.log("THESE ARE THE MOVIS TO DELETE : ", moviesToDelete);
    
    
        // delete all movies that are "expired"
    /* }); */
}