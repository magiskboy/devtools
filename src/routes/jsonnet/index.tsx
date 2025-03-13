import { json } from '@codemirror/lang-json';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Editor from '../../components/editor';
import { useMenuContext } from '../../contexts/menu';
import { StreamLanguage } from '@codemirror/language';
import { jsonnet } from '../../libs/jsonnet-streamline-parser';


const DEFAULT_JSONNET = `// Edit me!
{
  person1: {
    name: "Alice",
    welcome: "Hello " + self.name + "!",
  },
  person2: self.person1 { name: "Bob" },
}`

const JsonnetPage = () => {
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
    <div className={`row ${styles.main}`}>
      <div className="column column-50">
        <Editor
          title="Jsonnet"
          value={code} 
          extensions={[[StreamLanguage.define(jsonnet)]]}
          onChange={onChange} 
          className={`${styles.input}`}
        />
      </div>
      <div className="column column-50">
        <Editor
          title="JSON"
          readOnly
          extensions={[json()]}
          value={output}
          className={`${styles.output}`}
        />
      </div>
    </div>
  )
}

export default JsonnetPage;
