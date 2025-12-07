import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { agentsInsertSchema } from '../schemas';
import z from 'zod';
import { eq, getTableColumns, sql } from 'drizzle-orm';

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        // TODO: REMOVE THIS
        meetingCount: sql<number>`5`,
        ...getTableColumns(agents),
      })
      .from(agents);
    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      const [existingAgent] = await db
        .select({
          // TODO: REMOVE THIS
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(eq(agents.id, id));

      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx: { auth } }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
