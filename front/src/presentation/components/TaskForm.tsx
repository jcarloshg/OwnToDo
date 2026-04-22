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
      <div className="card text-center py-16">
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/40">
          <span className="text-4xl text-white">✓</span>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-4">Task Created!</h3>
        <p className="text-gray-500 text-lg mb-8">Your task has been successfully added.</p>
        <button
          onClick={reset}
          type="button"
          className="btn-primary text-lg px-10 py-4"
        >
          Create Another Task
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto" aria-label="Create task form">
      <h2 className="text-3xl font-extrabold text-primary mb-8 text-center">Create New Task</h2>

      {error && (
        <div className="error-badge mb-8" role="alert">
          <span className="text-xl">⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="space-y-6">
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
            placeholder="What needs to be done?"
            maxLength={200}
            required
            aria-required="true"
            className="form-input text-lg py-4"
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
            placeholder="Add some details about this task (optional)"
            maxLength={2000}
            rows={4}
            className="form-input resize-none text-lg py-4"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Effort Points */}
          <div className="bg-primary/5 rounded-2xl p-6">
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
              className="w-full h-3 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
              aria-valuemin={1}
              aria-valuemax={100}
              aria-valuenow={effortPoints}
            />
            <div className="flex justify-between mt-3 text-sm text-gray-600 font-medium">
              <span>Easy</span>
              <span className="text-2xl font-extrabold text-primary">{effortPoints}</span>
              <span>Hard</span>
            </div>
          </div>

          {/* Due Date */}
          <div className="bg-accent/5 rounded-2xl p-6">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input text-lg py-4"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-10 btn-accent text-lg py-4 shadow-lg shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-busy={isLoading}
      >
        {isLoading ? 'Creating...' : '+ Save Task'}
      </button>
    </form>
  );
}