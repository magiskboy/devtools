import { useState, useCallback } from 'react';

export function useFormState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);

  const updateState = useCallback((updates: Partial<T> | ((prev: T) => T)) => {
    setState(prev => typeof updates === 'function' ? updates(prev) : { ...prev, ...updates });
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    updateState({
      [name]: type === 'number' ? Number(value) : value
    } as Partial<T>);
  }, [updateState]);

  return {
    state,
    setState,
    updateState,
    handleChange
  };
} 