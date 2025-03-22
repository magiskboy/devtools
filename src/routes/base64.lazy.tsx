import { createLazyFileRoute } from '@tanstack/react-router'
import { Editor } from '@/components';
import React, { useState } from 'react';

export const Route = createLazyFileRoute('/base64')({
  component: RouteComponent,
})

function RouteComponent() {
  const [data, setData] = useState('');
  const [b64Data, setB64Data] = useState('');

  const onChangeData = (value: string) => {
    setData(value);
  }

  const onChangeB64Data = (value: string) => {
    setB64Data(value);
  }

  const onEncode: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const result = btoa(data);
    setB64Data(result);
  }

  const onDecode: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const result = atob(b64Data);
    setData(result);
  }

  return (
    <div className="fixed-grid has-9-cols">
      <div className="grid">
        <div className="cell is-col-span-4">
          <Editor title="Data" value={data} onChange={onChangeData} minHeight='500px' />
        </div>
        <div className="cell is-flex is-flex-direction-column is-justify-content-center">
          <button className="button is-primary my-4" onClick={onEncode}>Encode</button>
          <button className="button is-secondary" onClick={onDecode}>Decode</button>
        </div>
        <div className="cell is-col-span-4">
          <Editor title="Base64" value={b64Data} onChange={onChangeB64Data} />
        </div>
      </div>
    </div>
  );
}
