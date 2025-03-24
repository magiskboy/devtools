import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { Editor } from '@/components';
import { StreamLanguage } from '@codemirror/language';
import { jsonnet } from '@/libs/codemirror/jsonnet';
import { usePageTitle } from '@/hooks/usePageTitle';
export const Route = createLazyFileRoute('/jsonnet')({
  component: RouteComponent,
})

function RouteComponent() {
  const [code, setCode] = useState(DEFAULT_JSONNET);
  const [output, setOutput] = useState('');
  usePageTitle("Jsonnet");

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
    <div className="fixed-grid has-2-cols has-1-cols-mobile h-100">
      <div className="grid">
        <div className="cell">
          <Editor
            title="JSONNET"
            value={code}
            extensions={[[StreamLanguage.define(jsonnet)]]}
            onChange={onChange} 
          />
        </div>
        <div className="cell">
          <Editor
            title="JSON"
            readOnly
            extensions={[json()]}
            value={output}
          />
        </div>
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

