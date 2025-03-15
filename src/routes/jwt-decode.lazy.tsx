import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import Editor from '../components/editor';
import { useEffect, useState } from 'react';
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
import { useMenuContext } from '../contexts/menu';

export const Route = createLazyFileRoute('/jwt-decode')({
  component: RouteComponent,
})

function RouteComponent() {
  const [jwt, setJwt] = useState('');
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
    <div className="columns h-100">
      <div className="column">
        <Editor title="JWT" value={jwt} onChange={setJwt} />
      </div>
      <div className="column">
        <div className="fixed-grid has-1-cols">
          <div className="grid is-gap-3">
            <Editor title="Data" extensions={[json()]} readOnly value={data} height={undefined} className="cell" />
            <Editor title="Header" extensions={[json()]} readOnly value={header} height={undefined} className="cell" />
          </div>
        </div>
      </div>
    </div>
  )
}
