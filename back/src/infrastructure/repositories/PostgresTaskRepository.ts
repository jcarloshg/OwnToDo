// PostgreSQL Task Repository - Infrastructure Layer
// Implements the ITaskRepository interface using PostgreSQL

import { Pool } from 'pg';
import { Task, TaskProps, TaskStatus } from '../../domain/entities/Task.js';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository.js';

export class PostgresTaskRepository implements ITaskRepository {
  constructor(private readonly pool: Pool) {}

  async save(task: Task): Promise<TaskProps> {
    const { id, title, description, effortPoints, status, dueDate, userId, createdAt, updatedAt } =
      task.toJSON();

    const query = `
      INSERT INTO tasks (id, title, description, effort_points, status, due_date, user_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await this.pool.query(query, [
      id,
      title,
      description,
      effortPoints,
      status,
      dueDate,
      userId,
      createdAt,
      updatedAt,
    ]);

    return this.mapRowToTaskProps(result.rows[0]);
  }

  async findById(id: string): Promise<TaskProps | null> {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] ? this.mapRowToTaskProps(result.rows[0]) : null;
  }

  async findByUserId(userId: string): Promise<TaskProps[]> {
    const query = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await this.pool.query(query, [userId]);
    return result.rows.map((row) => this.mapRowToTaskProps(row));
  }

  async update(task: Task): Promise<TaskProps> {
    const { id, title, description, effortPoints, status, dueDate, userId, createdAt, updatedAt } =
      task.toJSON();

    const query = `
      UPDATE tasks
      SET title = $2, description = $3, effort_points = $4, status = $5, due_date = $6, updated_at = $7
      WHERE id = $1
      RETURNING *
    `;

    const result = await this.pool.query(query, [
      id,
      title,
      description,
      effortPoints,
      status,
      dueDate,
      updatedAt,
    ]);

    return this.mapRowToTaskProps(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM tasks WHERE id = $1';
    await this.pool.query(query, [id]);
  }

  private mapRowToTaskProps(row: Record<string, unknown>): TaskProps {
    return {
      id: row.id as string,
      title: row.title as string,
      description: row.description as string | null,
      effortPoints: row.effort_points as number,
      status: row.status as TaskStatus,
      dueDate: row.due_date ? new Date(row.due_date as string) : null,
      userId: row.user_id as string,
      createdAt: new Date(row.created_at as string),
      updatedAt: new Date(row.updated_at as string),
    };
  }
}