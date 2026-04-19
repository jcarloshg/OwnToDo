'use client';

import { useState, FormEvent } from 'react';
import { useCreateTask } from '@/presentation/hooks/useCreateTask';

interface TaskFormProps {
  userId: string;
  onSuccess?: () => void;
}

export function TaskForm({ userId, onSuccess }: TaskFormProps) {
  const { createTask, isLoading, error, success, reset } = useCreateTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [effortPoints, setEffortPoints] = useState(1);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description: description || undefined,
        effortPoints,
        dueDate: dueDate || null,
        userId,
      });

      // Reset form on success
      setTitle('');
      setDescription('');
      setEffortPoints(1);
      setDueDate('');

      // Call onSuccess callback if provided
      onSuccess?.();
    } catch {
      // Error is handled by the hook
    }
  };

  if (success) {
    return (
      <div className="task-form-success">
        <p>Task created successfully!</p>
        <button onClick={reset} type="button">
          Create Another Task
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          maxLength={200}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          maxLength={2000}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="effortPoints">Effort Points * (1-100)</label>
        <input
          id="effortPoints"
          type="number"
          value={effortPoints}
          onChange={(e) => setEffortPoints(parseInt(e.target.value, 10))}
          min={1}
          max={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Save Task'}
      </button>
    </form>
  );
}