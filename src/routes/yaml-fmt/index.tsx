import { useEffect, useState } from "react";
import { useMenuContext } from "../../contexts/menu";
import Editor from "../../components/editor";
import { StreamLanguage } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import yamljs from 'js-yaml';


const Page = () => {
  const { setTitle } = useMenuContext();
  const [setting, setSetting] = useState<{
    indent: number,
    quotingType: '"' | "'",
    forceQuotes: boolean,
    lineWidth: number,
    noArrayIndent: boolean,
  }>({
    indent: 2,
    quotingType: '"',
    forceQuotes: true,
    lineWidth: 80,
    noArrayIndent: false
  });
  const [yamlValue, setYAML] = useState(DEFAULT_YAML_VALUE);

  useEffect(() => {
    setTitle('YAML formatter');
  }, [setTitle]);

  const onChangeSetting: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    const value = event.target.value;
    setSetting({
      ...setting,
      [event.target.name]: event.target.type === 'number' ? Number(value) : value
    })
  }

  const onFormat: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault(); 

    const fmtYAMLValue = yamljs.dump(yamljs.loadAll(yamlValue)[0], setting);
    setYAML(fmtYAMLValue);
  }

  const handleChangeYAMLValue = (value: string) => {
    setYAML(value.trim());
  }

  return (
    <div className="row">
      <div className="column column-75">
        <Editor extensions={[StreamLanguage.define(yaml)]} value={yamlValue} onChange={handleChangeYAMLValue} />
      </div>
      <div className="column column-25">
        <form onChange={onChangeSetting} onSubmit={onFormat}>
          <label htmlFor="indent">Indent
            <input type="number" id="indent" name="indent" defaultValue={setting.indent} min={1} /> 
          </label>
          <label htmlFor="quotingType">Quoting Type
            <select id="quotingType" name="quotingType" defaultValue={setting.quotingType}>
              <option value="'">Single quote</option>
              <option value='"'>Double quote</option>
            </select>
          </label>
          <label htmlFor="forceQuotes">Force Quotes 
            <input style={{ marginLeft: '1em' }} type="checkbox" id="forceQuotes" name="forceQuotes" defaultChecked={setting.forceQuotes} />
          </label>
          <label htmlFor="lineWidth">Line Width
            <input type="number" id="lineWidth" name="lineWidth" defaultValue={setting.lineWidth} min={80} />
          </label>
          <label htmlFor="noArrayIndent">No Array Indent
            <input style={{marginLeft: '1em'}} type="checkbox" id="noArrayIndent" name="noArrayIndent" defaultChecked={setting.noArrayIndent} />
          </label>
          <button style={{ width: '100%' }}>Format</button>
        </form>
      </div>
    </div>
  )
}

const DEFAULT_YAML_VALUE = 
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

export default Page;
