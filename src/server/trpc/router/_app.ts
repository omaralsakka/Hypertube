// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { videoRouter } from "./video";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
