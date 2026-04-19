// API client for task operations
import { Task, CreateTaskInput } from '@/domain/entities/Task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface CreateTaskResponse {
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

export interface ApiError {
  error: string;
  details?: unknown;
}

export async function createTask(input: CreateTaskInput): Promise<CreateTaskResponse> {
  const response = await fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to create task');
  }

  return response.json();
}

export async function getTasks(userId: string): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/api/tasks?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
}