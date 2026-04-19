// Data Transfer Object for CreateTask input
import { z } from 'zod';

// Validation schema
export const CreateTaskInputSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be at most 200 characters'),
  description: z
    .string()
    .max(2000, 'Description must be at most 2000 characters')
    .optional(),
  effortPoints: z
    .number()
    .int('Effort points must be an integer')
    .min(1, 'Effort points must be at least 1')
    .max(100, 'Effort points must be at most 100'),
  dueDate: z.string().optional().nullable(),
  userId: z.string().uuid('Invalid user ID'),
});

export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;

export interface CreateTaskOutput {
  id: string;
  title: string;
  description: string | null;
  effortPoints: number;
  status: 'pending' | 'completed';
  dueDate: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}