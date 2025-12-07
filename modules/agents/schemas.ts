import { z } from 'zod';

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { error: 'Message is required' }),
  instructions: z.string().min(1, { error: 'Instruction is required' }),
});
