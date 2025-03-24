// External dependencies
import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { StreamLanguage } from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { useState } from 'react';
import yamljs from 'js-yaml';

// Internal absolute imports
import { Editor } from '@/components';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/yaml-json')({
  component: RouteComponent,
})

function RouteComponent() {
  const [jsonValue, setJSON] = useState('');
  const [yamlValue, setYAML] = useState(DEFAULT_YAML);

  usePageTitle("JSON/YAML Converter");
  const onChangeJson = (value: string) => {
    setJSON(value);
    try {
      const o = JSON.parse(value);
      setYAML(yamljs.dump(o));
    } catch {;}
  }

  const onChangeYaml = (value: string) => {
    setYAML(value);
    try {
      const o = yamljs.loadAll(value)[0];
      setJSON(JSON.stringify(o, null, 2));
    } catch {;}
  }

  return (
    <div className="columns h-100">
      <div className="column">
        <Editor
          value={jsonValue}
          title="JSON"
          extensions={[json()]}
          onChange={onChangeJson}
        />
      </div>
      <div className="column">
        <Editor
          title="YAML"
          value={yamlValue}
          extensions={[StreamLanguage.define(yaml)]}
          onChange={onChangeYaml}
        />
      </div>
    </div>
  )
}

const DEFAULT_YAML = 
`apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80`;
