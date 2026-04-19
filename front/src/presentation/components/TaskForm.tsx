'use client';

import { useState, FormEvent } from 'react';
import { useCreateTask } from '@/presentation/hooks/useCreateTask';

interface TaskFormProps {
  userId: string;
}

export function TaskForm({ userId }: TaskFormProps) {
  const { createTask, isLoading, error, success, reset } = useCreateTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [effortPoints, setEffortPoints] = useState(5);
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
      setTitle('');
      setDescription('');
      setEffortPoints(5);
      setDueDate('');
    } catch {
      // Error handled by hook
    }
  };

  if (success) {
    return (
      <div className="card bg-primary-light/10 border-primary text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">Task Created!</h3>
        <p className="text-gray-600 mb-6">Your task has been successfully added.</p>
        <button
          onClick={reset}
          type="button"
          className="btn-primary"
        >
          Create Another Task
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card" aria-label="Create task form">
      <h2 className="text-2xl font-bold text-primary mb-6">Create New Task</h2>

      {error && (
        <div className="error-badge mb-6" role="alert">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="form-label">
            Title <span className="text-danger" aria-hidden="true">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            maxLength={200}
            required
            aria-required="true"
            className="form-input"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            maxLength={2000}
            rows={3}
            className="form-input resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Effort Points */}
          <div>
            <label htmlFor="effortPoints" className="form-label">
              Effort Points <span className="text-danger" aria-hidden="true">*</span>
            </label>
            <input
              id="effortPoints"
              type="range"
              value={effortPoints}
              onChange={(e) => setEffortPoints(parseInt(e.target.value, 10))}
              min={1}
              max={100}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={effortPoints}
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>1</span>
              <span className="font-bold text-primary">{effortPoints}</span>
              <span>100</span>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-8 btn-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Creating...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Save Task</span>
          </>
        )}
      </button>
    </form>
  );
}