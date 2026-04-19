// CreateTask Use Case - Application Layer
// Contains the business logic for creating a new task

import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../domain/entities/Task.js';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository.js';
import {
  CreateTaskInput,
  CreateTaskInputSchema,
  CreateTaskOutput,
} from '../dto/CreateTaskDTO.js';

export class CreateTaskUseCase {
  name = 'CreateTaskUseCase';

  constructor(private readonly taskRepository: ITaskRepository) {}

  async execute(input: CreateTaskInput): Promise<CreateTaskOutput> {
    // 1. Validate input (using Zod schema)
    const validated = CreateTaskInputSchema.parse(input);

    // 2. Create task entity
    const task = Task.create({
      id: uuidv4(),
      title: validated.title,
      description: validated.description,
      effortPoints: validated.effortPoints,
      dueDate: validated.dueDate ? new Date(validated.dueDate) : null,
      userId: validated.userId,
    });

    // 3. Persist task
    const savedTask = await this.taskRepository.save(task);

    // 4. Return mapped output
    return {
      id: savedTask.id,
      title: savedTask.title,
      description: savedTask.description,
      effortPoints: savedTask.effortPoints,
      status: savedTask.status,
      dueDate: savedTask.dueDate?.toISOString().split('T')[0] ?? null,
      userId: savedTask.userId,
      createdAt: savedTask.createdAt.toISOString(),
      updatedAt: savedTask.updatedAt.toISOString(),
    };
  }
}