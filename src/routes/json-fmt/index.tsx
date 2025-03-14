import { useEffect, useState } from 'react';
import { json } from "@codemirror/lang-json";
import { useMenuContext } from '../../contexts/menu';
import Editor from "../../components/editor";

const Page = () => {
  const { setTitle } = useMenuContext();
  const [jsonValue, setJSONValue] = useState('');
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
    <div className="row">
      <div className="column column-75">
        <Editor extensions={[json()]} value={jsonValue} onChange={setJSONValue} />
      </div>
      <div className="column column-25" style={{display: 'flex', flexDirection: 'column'}}>
        <label htmlFor='tab-width'>Tab Width
          <input type="number" min={0} max={4} defaultValue={tabWidth} value={tabWidth} onChange={e => setTabWidth(Number(e.target.value))} id='tab-width' />
        </label>
        <button onClick={onFormat} style={{width: '100%'}}>Format</button>
        <button onClick={onMinify} style={{width: '100%'}}>Minify</button>
      </div>
    </div>
  )
}

export default Page;
