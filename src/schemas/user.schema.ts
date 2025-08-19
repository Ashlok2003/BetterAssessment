import { z } from 'zod';

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const userInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
});

export const userUpdateSchema = userInputSchema.partial();

export type UserInput = z.infer<typeof userInputSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
