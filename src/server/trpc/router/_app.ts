// src/server/trpc/router/_app.ts
import { userRouter } from "./user";
import { commentRouter } from './comment';
import { router } from '../trpc';
import { exampleRouter } from './example';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  user: userRouter
	comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
