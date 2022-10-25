// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { signUpRouter } from "./signup";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  signup: signUpRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
