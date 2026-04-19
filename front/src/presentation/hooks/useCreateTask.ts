'use client';

import { useState, useCallback } from 'react';
import { createTask, CreateTaskResponse } from '@/infrastructure/api/taskApi';

interface UseCreateTaskReturn {
  createTask: (input: {
    title: string;
    description?: string;
    effortPoints: number;
    dueDate?: string | null;
    userId: string;
  }) => Promise<CreateTaskResponse>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export function useCreateTask(): UseCreateTaskReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createTaskFn = useCallback(
    async (input: {
      title: string;
      description?: string;
      effortPoints: number;
      dueDate?: string | null;
      userId: string;
    }) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await createTask(input);
        setSuccess(true);
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create task';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    createTask: createTaskFn,
    isLoading,
    error,
    success,
    reset,
  };
}