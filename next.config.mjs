import { env } from './src/env/server.mjs';
import { PrismaClient } from '@prisma/client';
import { CronJob } from 'cron';
import axios from 'axios';
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */

var updateMovies = new CronJob(
	'0 4 * * *',
	function () {
		console.log('updating movies');
		fetch(`http://localhost:3000/api/update-movie`);
	},
	null,
	true,
	'Europe/Helsinki'
);

function defineNextConfig(config) {
	return config;
}

export default defineNextConfig({
	reactStrictMode: true,
	swcMinify: true,
	/** Next.js i18n docs:
	 * @see https://nextjs.org/docs/advanced-features/i18n-routing
	 * Reference repo for i18n:
	 * @see https://github.com/juliusmarminge/t3-i18n
	 **/
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	output: 'standalone',
});
