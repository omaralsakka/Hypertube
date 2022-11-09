import { router, publicProcedure } from '../trpc';
import * as z from 'zod';
import { hash, verify } from 'argon2';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
});
