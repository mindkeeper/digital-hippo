import { publicProcedure, router } from './trpc';

export const appRouter = router({
	anyApiRoute: publicProcedure.query(() => 1),
});

export type AppRouter = typeof appRouter;
