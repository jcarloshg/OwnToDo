'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card error-badge">
      <h2 className="text-lg font-semibold text-danger mb-2">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message || 'An unexpected error occurred'}</p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  );
}