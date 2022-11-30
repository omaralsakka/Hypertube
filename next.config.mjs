// @ts-check
import { env } from "./src/env/server.mjs";
import { PrismaClient } from "@prisma/client";
import { CronJob } from 'cron';
import fs from 'fs';

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const job = new CronJob(
	'0 23 * * *',
	async function () {
		console.log('You will see this message every second');
    
    const prisma =
    global.prisma ||
    new PrismaClient({
      log:
        env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  
    let downloadedMovies = [];
        let timestamp = Date.now();

        try {
            downloadedMovies = await prisma?.movies.findMany();
        } catch (error) {
            console.error(error);
        }

        let moviesToDelete = [];

        downloadedMovies?.filter((movie) => {
            if(Date.parse(movie.date) < timestamp - 2629800000) { // can use 1 instead of 2629800000 (1 month) to test. these are milliseconds
                moviesToDelete.push(movie);
            }
        })

        moviesToDelete.map(async (movie) => {
            if (fs.existsSync(`./movies/${movie.imdb_code}`)) { // make sure this works properly
                fs.rmSync(`./movies/${movie.imdb_code}`, { recursive: true, force: true });
            }
            await prisma?.movies.delete({
                where: {
                    imdb_code: movie.imdb_code
                }
            })
        })
	},
	null,
	true,
	'America/Los_Angeles'
);

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  /** Next.js i18n docs:
   * @see https://nextjs.org/docs/advanced-features/i18n-routing
   * Reference repo for i18n:
   * @see https://github.com/juliusmarminge/t3-i18n
   **/
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  output: "standalone",
});
