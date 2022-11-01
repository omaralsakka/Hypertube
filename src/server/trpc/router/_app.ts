// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { commentRouter } from './comment';

export const appRouter = router({
	example: exampleRouter,
	auth: authRouter,
	comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
