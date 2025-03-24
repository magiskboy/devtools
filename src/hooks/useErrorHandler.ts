import { useState, useCallback } from 'react';

interface ErrorState {
  message: string;
  type?: 'error' | 'warning' | 'info';
}

export function useErrorHandler() {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: unknown, defaultMessage: string) => {
    if (error instanceof Error) {
      setError({ message: error.message });
    } else {
      setError({ message: defaultMessage });
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError
  };
} 