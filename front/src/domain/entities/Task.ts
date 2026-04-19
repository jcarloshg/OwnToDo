// Task types - Frontend Domain Layer
export interface Task {
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

export interface CreateTaskInput {
  title: string;
  description?: string;
  effortPoints: number;
  dueDate?: string | null;
  userId: string;
}