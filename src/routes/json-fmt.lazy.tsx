import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { json } from "@codemirror/lang-json";
import { useMenuContext } from '@/contexts';
import { Editor } from "@/components";

export const Route = createLazyFileRoute('/json-fmt')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setTitle } = useMenuContext();
  const [jsonValue, setJSONValue] = useState(DEFAULT_JSON_VALUE);
  const [tabWidth, setTabWidth] = useState(2);

  useEffect(() => {
    setTitle('JSON Formatter');
  }, [setTitle]);

  const onFormat = () => {
    const formatted = JSON.stringify(JSON.parse(jsonValue), null, tabWidth);
    setJSONValue(formatted);
  }

  const onMinify = () => {
    const minified = JSON.stringify(JSON.parse(jsonValue));
    setJSONValue(minified);
  }

  return (
    <div className="columns h-100">
      <div className="column is-10">
        <Editor title="JSON" extensions={[json()]} value={jsonValue} onChange={setJSONValue} />
      </div>

      <div className="column is-flex is-flex-direction-column is-2">
        <div className="field">
          <label className="label">Tab Width</label>
          <div className="control">
            <input className="input" type="number" min={0} max={4} defaultValue={tabWidth} value={tabWidth} onChange={e => setTabWidth(Number(e.target.value))} />
          </div>
        </div>

        <div className="is-flex is-flex-direction-column is-gap-2">
          <div className="control">
            <button onClick={onFormat} className="button is-primary is-fullwidth">Format</button>
          </div>

          <div className="control">
            <button onClick={onMinify} className="button is-secondary is-fullwidth">Minify</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const DEFAULT_JSON_VALUE =
`{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "nginx"
  },
  "spec": {
    "containers": [
      {
        "name": "nginx",
        "image": "nginx:1.14.2",
        "ports": [
          {
            "containerPort": 80
          }
        ]
      }
    ]
  }
}`;
