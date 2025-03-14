import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import Editor from '../components/editor';
import { useMenuContext } from '../contexts/menu';
import { StreamLanguage } from '@codemirror/language';
import { jsonnet } from '../libs/codemirror/jsonnet';

export const Route = createLazyFileRoute('/jsonnet')({
  component: RouteComponent,
})

function RouteComponent() {
  const [code, setCode] = useState(DEFAULT_JSONNET);
  const [output, setOutput] = useState('');
  const { setTitle } = useMenuContext();

  useEffect(() => {
    setTitle('Jsonnet')
  }, [setTitle]);

  useEffect(() => {
    const response = fetch('/vendors/jsonnet/libjsonnet.wasm');
    getJsonnet(response).then((jsonnet: Jsonnet)=> {
      jsonnet.evaluate(code).then((result: string)=> {
        setOutput(result);
      }).catch((e: Error) => {
        setOutput(e.message)
      });
    })
  }, [code]);

  const onChange = (value: string) => {
    setCode(value);
  }

  return (
    <div className="columns h-100">
      <div className="column h-100">
        <Editor
          title="Jsonnet"
          value={code} 
          extensions={[[StreamLanguage.define(jsonnet)]]}
          onChange={onChange} 
        />
      </div>
      <div className="column h-100">
        <Editor
          title="JSON"
          readOnly
          extensions={[json()]}
          value={output}
        />
      </div>
    </div>
  )
}

const DEFAULT_JSONNET = `// Edit me!
{
  person1: {
    name: "Alice",
    welcome: "Hello " + self.name + "!",
  },
  person2: self.person1 { name: "Bob" },
}`

