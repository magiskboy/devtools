import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { Editor } from '@/components';
import { useEffect, useState } from 'react';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
import { useMenuContext } from '@/contexts';

export const Route = createLazyFileRoute('/jwt-decode')({
  component: RouteComponent,
})

function RouteComponent() {
  const [jwt, setJwt] = useState(DEFAULT_JWT);
  const [data, setData] = useState('');
  const [header, setHeader] = useState('');
  const { setTitle } = useMenuContext();

  useEffect(() => setTitle('JWT Decode'), [setTitle]);

  useEffect(() => {
    if (!jwt) {
      setData("");
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
      }
    }
  }, [jwt]);


  return (
    <div className="fixed-grid has-2-cols">
      <div className="grid h-100">
        <div className="cell is-row-span-2">
          <Editor title="JWT" value={jwt} onChange={setJwt} />
        </div>
        <div className="cell">
          <Editor title="Data" extensions={[json()]} readOnly value={data} height={undefined} className="cell" />
        </div>
        <div className="cell">
          <Editor title="Header" extensions={[json()]} readOnly value={header} height={undefined} className="cell" />
        </div>
      </div>
    </div>
  )
}

const DEFAULT_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
