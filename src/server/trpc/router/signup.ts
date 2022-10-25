import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const signUpRouter = router({
  signup: publicProcedure
    .input(z.object({ email: z.string(),
    password: z.string().min(1).max(5)})
    .mutation(({ input }) => {
        // Check for existing user
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
