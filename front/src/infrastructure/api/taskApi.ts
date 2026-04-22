// API client for task operations
import { Task, CreateTaskInput } from '@/domain/entities/Task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const API_BASE_PATH = process.env.NEXT_PUBLIC_API_BASE_PATH || '/api';

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

const getUrl = (path: string) => `${API_BASE_URL}${API_BASE_PATH}${path}`;

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
  const response = await fetch(getUrl('/tasks'), {
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
  const response = await fetch(getUrl(`/tasks?userId=${userId}`), {
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