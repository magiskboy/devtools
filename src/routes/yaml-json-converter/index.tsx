import Editor from '../../components/editor';
import { json } from '@codemirror/lang-json';
import { StreamLanguage } from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { useEffect, useState } from 'react';
import yamljs from 'js-yaml';
import { useMenuContext } from '../../contexts/menu';

const Page = () => {
  const [jsonValue, setJSON] = useState('');
  const [yamlValue, setYAML] = useState('');
  const { setTitle } = useMenuContext();

  useEffect(() => {
    setTitle('JSON/YAML Converter');
  }, [setTitle]);

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
    <div className="row">
      <div className="column column-50">
        <Editor
          value={jsonValue}
          title="JSON"
          extensions={[json()]}
          onChange={onChangeJson}
        />
      </div>
      <div className="column column-50">
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

export default Page;
