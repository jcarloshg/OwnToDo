// Repository Interface (Port) - Defines how the domain interacts with persistence
import { Task, TaskProps } from '../entities/Task.js';

export interface ITaskRepository {
  save(task: Task): Promise<TaskProps>;
  findById(id: string): Promise<TaskProps | null>;
  findByUserId(userId: string): Promise<TaskProps[]>;
  update(task: Task): Promise<TaskProps>;
  delete(id: string): Promise<void>;
}