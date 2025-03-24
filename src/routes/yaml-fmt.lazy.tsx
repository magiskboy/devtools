import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { Editor, SettingForm } from "@/components";
import { StreamLanguage } from "@codemirror/language";
import { yaml } from "@codemirror/legacy-modes/mode/yaml";
import yamljs from 'js-yaml';
import { usePageTitle } from '@/hooks/usePageTitle';
export const Route = createLazyFileRoute('/yaml-fmt')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle("YAML Formatter");
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
    <div className="columns h-100">
      <div className="column is-three-quarters">
        <Editor title="YAML" extensions={[StreamLanguage.define(yaml)]} value={yamlValue} onChange={handleChangeYAMLValue} />
      </div>
      <div className="column">
        <SettingForm>
          <form onChange={onChangeSetting} onSubmit={onFormat} className="is-flex is-flex-direction-column">
            <div className="field">
              <label className="label">Indent</label>
              <div className="control">
                <input className="input is-fullwidth" type="number" name="indent" defaultValue={setting.indent} min={1} /> 
              </div>
            </div>

            <div className="field">
              <label className="label">Quoting Type</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="quotingType" defaultValue={setting.quotingType}>
                    <option value="'">Single quote</option>
                    <option value='"'>Double quote</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="checkbox"> 
                <input type="checkbox" id="forceQuotes" name="forceQuotes" defaultChecked={setting.forceQuotes} />
                Force Quotes
              </label>
            </div>

            <div className="field">
              <label className="label">Line Width</label>
              <div className="control">
                <input className="input" type="number" name="lineWidth" defaultValue={setting.lineWidth} min={80} />
              </div>
            </div>

            <div className="field">
              <label className="checkbox">
                <input type="checkbox" name="noArrayIndent" defaultChecked={setting.noArrayIndent} />
                No Array Indent
              </label>
            </div>

            <div className="control">
              <button className="button is-primary is-fullwidth">Format</button>
            </div>
          </form>
        </SettingForm>
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
