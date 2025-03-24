import { createLazyFileRoute } from '@tanstack/react-router'
import { Editor } from '@/components';
import React, { useState, useCallback, useEffect } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/base64')({
  component: RouteComponent,
})

interface Base64State {
  data: string;
  b64Data: string;
  error: string | null;
  autoConvert: boolean;
}

const validateBase64 = (str: string): boolean => {
  return /^[A-Za-z0-9+/]*={0,2}$/.test(str);
};

const encodeBase64 = (str: string): string => {
  return btoa(str);
};

const decodeBase64 = (str: string): string => {
  if (!validateBase64(str)) {
    throw new Error('Invalid Base64 format');
  }
  return atob(str);
};

function RouteComponent() {
  usePageTitle("Base64");
  const [state, setState] = useState<Base64State>({
    data: '',
    b64Data: '',
    error: null,
    autoConvert: false
  });

  const updateState = useCallback((updates: Partial<Base64State> | ((prev: Base64State) => Base64State)) => {
    setState(prev => typeof updates === 'function' ? updates(prev) : { ...prev, ...updates });
  }, []);

  const handleDataChange = useCallback((value: string) => {
    updateState({ data: value, error: null });
    if (state.autoConvert) {
      try {
        updateState({ b64Data: encodeBase64(value) });
      } catch (err) {
        updateState({ error: 'Failed to encode data. Please check your input.' });
      }
    }
  }, [state.autoConvert, updateState]);

  const handleB64DataChange = useCallback((value: string) => {
    updateState({ b64Data: value, error: null });
    if (state.autoConvert) {
      try {
        updateState({ data: decodeBase64(value) });
      } catch (err) {
        updateState({ error: 'Failed to decode data. Please check if the input is valid Base64.' });
      }
    }
  }, [state.autoConvert, updateState]);

  const handleEncode = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      updateState({ 
        b64Data: encodeBase64(state.data),
        error: null 
      });
    } catch (err) {
      updateState({ error: 'Failed to encode data. Please check your input.' });
    }
  }, [state.data, updateState]);

  const handleDecode = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      updateState({ 
        data: decodeBase64(state.b64Data),
        error: null 
      });
    } catch (err) {
      updateState({ error: 'Failed to decode data. Please check if the input is valid Base64.' });
    }
  }, [state.b64Data, updateState]);

  const toggleAutoConvert = useCallback(() => {
    updateState(prev => ({ ...prev, autoConvert: !prev.autoConvert }));
  }, [updateState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'e') {
          event.preventDefault();
          handleEncode(event as any);
        } else if (event.key === 'd') {
          event.preventDefault();
          handleDecode(event as any);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleEncode, handleDecode]);

  return (
    <div className="fixed-grid has-9-cols">
      <div className="grid">
        <div className="cell is-col-span-4">
          <Editor 
            title="Data" 
            value={state.data} 
            onChange={handleDataChange} 
            minHeight='500px'
            placeholder="Enter text to encode/decode"
          />
        </div>
        <div className="cell is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
          <button 
            className="button is-primary my-4" 
            onClick={handleEncode}
            disabled={!state.data}
            data-testid="encode-button"
          >
            Encode
          </button>
          <button 
            className="button is-secondary" 
            onClick={handleDecode}
            disabled={!state.b64Data}
            data-testid="decode-button"
          >
            Decode
          </button>
          <label className="checkbox mt-4">
            <input 
              type="checkbox" 
              checked={state.autoConvert}
              onChange={toggleAutoConvert}
            />
            Auto-convert
          </label>
          {state.error && (
            <div className="notification is-danger is-light mt-4">
              {state.error}
            </div>
          )}
        </div>
        <div className="cell is-col-span-4">
          <Editor 
            title="Base64" 
            value={state.b64Data} 
            onChange={handleB64DataChange}
            placeholder="Enter Base64 string to decode"
          />
        </div>
      </div>
    </div>
  );
}
