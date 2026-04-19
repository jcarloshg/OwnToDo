// Task Controller - Presentation Layer
// Handles HTTP request/response for task operations

import { Request, Response } from 'express';
import { CreateTaskUseCase } from '../../application/use-cases/CreateTaskUseCase.js';
import { CreateTaskInputSchema } from '../../application/dto/CreateTaskDTO.js';

export class TaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const parseResult = CreateTaskInputSchema.safeParse(req.body);

      if (!parseResult.success) {
        res.status(400).json({
          error: 'Validation failed',
          details: parseResult.error.errors,
        });
        return;
      }

      // Execute use case
      const result = await this.createTaskUseCase.execute(parseResult.data);

      // Return success response
      res.status(201).json(result);
    } catch (error) {
      // Handle validation errors from Zod
      if (error instanceof Error && error.name === 'ZodError') {
        res.status(400).json({
          error: 'Validation failed',
          details: error,
        });
        return;
      }

      // Handle other errors
      console.error('Error creating task:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Something went wrong',
      });
    }
  }
}