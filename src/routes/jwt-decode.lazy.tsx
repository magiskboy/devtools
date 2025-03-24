import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { MemoizedEditor } from '@/components/MemoizedEditor';
import { useCallback, useEffect, useState } from 'react';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useErrorHandler } from '@/hooks/useErrorHandler';

const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const Route = createLazyFileRoute('/jwt-decode')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle('JWT Decode');
  const { error, handleError, clearError } = useErrorHandler();
  const [jwt, setJwt] = useState(DEFAULT_JWT);
  const [data, setData] = useState('');
  const [header, setHeader] = useState('');

  const handleJwtChange = useCallback((value: string) => {
    setJwt(value);
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (!jwt) {
      setData("");
      setHeader("");
      return;
    }

    try {
      const resultData = jwtDecode(jwt);
      setData(JSON.stringify(resultData, null, 2));

      const resultHeader = jwtDecode(jwt, { header: true });
      setHeader(JSON.stringify(resultHeader, null, 2));
    } catch (e) {
      if (e instanceof InvalidTokenError) {
        setData(e.message);
        setHeader('');
        handleError(e, 'Invalid JWT token');
      }
    }
  }, [jwt, handleError]);

  return (
    <div className="fixed-grid has-2-cols">
      <div className="grid h-100">
        <div className="cell is-row-span-2">
          <MemoizedEditor 
            title="JWT" 
            value={jwt} 
            onChange={handleJwtChange}
            placeholder="Enter JWT token to decode"
          />
        </div>
        <div className="cell">
          <MemoizedEditor 
            title="Data" 
            extensions={[json()]} 
            readOnly 
            value={data} 
            height="100%"
          />
        </div>
        <div className="cell">
          <MemoizedEditor 
            title="Header" 
            extensions={[json()]} 
            readOnly 
            value={header} 
            height="100%"
          />
        </div>
      </div>
      {error && (
        <div className="notification is-danger is-light mt-4">
          {error.message}
        </div>
      )}
    </div>
  );
}

