// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { userRouter } from './user';
import { moviesRouter } from './movies';
import { tokenRouter } from './emailtoken';
export const appRouter = router({
	example: exampleRouter,
	auth: authRouter,
	user: userRouter,
	movies: moviesRouter,
	emailtoken: tokenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
