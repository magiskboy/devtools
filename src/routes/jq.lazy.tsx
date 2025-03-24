import { createLazyFileRoute } from '@tanstack/react-router'
import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import { Editor } from '@/components';
import { jqParser } from '@/libs/codemirror/jq';
import { StreamLanguage } from '@codemirror/language';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/jq')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle("jq");
  const [data, setData] = useState(DEFAULT_JSON);
  const [output, setOutput] = useState('');
  const [jqInstance, setJqInstance] = useState<JqInstance>();
  const [query, setQuery] = useState('');

  useEffect(() => {
    jq.then((instance) => setJqInstance(instance));
  }, []);

  const onChange = (value: string) => {
    setData(value);
  }

  const onChangeQuery = (value: string) => {
    setQuery(value);
  }

  useEffect(() => {
    if (!jqInstance) return;
    try {
      const result = jqInstance.json(JSON.parse(data), query);
      setOutput(JSON.stringify(result, null, 2));
    } catch {;}

  }, [query, jqInstance, data]);

  return (
    <div className="fixed-grid has-2-cols has-1-cols-mobile">
      <div className="grid">
        <div className="cell">
          <Editor
            title="Query"
            value={query}
            onChange={onChangeQuery}
            height='200px'
            extensions={[StreamLanguage.define(jqParser)]}
          />
        </div>
        <div className="cell is-row-span-2">
          <Editor
            title="JSON"
            readOnly
            extensions={[json()]}
            value={output}
            height='100%'
          />
        </div>
        <div className="cell">
          <Editor
            title="Jsonnet"
            value={data}
            extensions={[json()]}
            onChange={onChange} 
          />
        </div>
      </div>
    </div>
  )
}

const DEFAULT_JSON = 
`{
  "glossary": {
    "title": "example glossary",
    "GlossDiv": {
      "title": "S",
      "GlossList": {
        "GlossEntry": {
          "ID": "SGML",
          "SortAs": "SGML",
          "GlossTerm": "Standard Generalized Markup Language",
          "Acronym": "SGML",
          "Abbrev": "ISO 8879:1986",
          "GlossDef": {
            "para": "A meta-markup language, used to create markup languages such as DocBook.",
            "GlossSeeAlso": [
              "GML",
              "XML"
            ]
          },
          "GlossSee": "markup"
        }
      }
    }
  }
}
`
