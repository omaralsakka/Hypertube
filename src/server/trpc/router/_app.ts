// src/server/trpc/router/_app.ts
import { userRouter } from './user';
import { commentRouter } from './comment';
import { router } from '../trpc';
import { authRouter } from './auth';
import { moviesRouter } from './movies';
import { movieRouter } from './movie';
import { tokenRouter } from './emailtoken';
export const appRouter = router({
	auth: authRouter,
	user: userRouter,
	comment: commentRouter,
	movies: moviesRouter,
	emailtoken: tokenRouter,
	movie: movieRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
