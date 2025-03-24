import { createLazyFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { html } from '@codemirror/lang-html';
import { Editor, SettingForm }from "@/components";
import { html_beautify } from 'js-beautify';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/html')({
  component: RouteComponent,
})

function RouteComponent() {
  usePageTitle("HTML");
  const [htmlValue, setHTML] = useState(HTML_VALUE_DEFAULT);
  const [setting, setSetting] = useState({
    indentSize: 2,
  });
  
  const onChange = (value: string) => {
    setHTML(value);
  }

  const onChangeSetting: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    const value = event.target.value;
    setSetting({
      ...setting,
      [event.target.name]: event.target.type === 'number' ? Number(value) : value
    });
  }

  const onFormat: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const result = html_beautify(htmlValue, {
      indent_size: setting.indentSize,
    });

    setHTML(result);
  }


  return (
    <div>
      <div className="columns">
        <div className="column is-9">
          <Editor title="HTML" onChange={onChange} value={htmlValue} extensions={[html()]} />
        </div>
        <div className="column is-3">
          <SettingForm>
            <form onChange={onChangeSetting} onSubmit={onFormat}>
              <div className="field">
                <label className="label">Tab Width</label>
                <div className="control">
                  <input className="input" name="indentSize" type="number" min={0} max={4} defaultValue={setting.indentSize} value={setting.indentSize} />
                </div>
              </div>
              <button className="button is-primary is-fullwidth">Format</button>
            </form>
          </SettingForm>
        </div>
      </div>

      <div className="columns is-flex is-flex-direction-column">
        <h4 className="is-size-5 column is-12">Preview</h4>
        <div className="column is-12">
          <iframe srcDoc={htmlValue} width={"100%"} height={'600px'} frameBorder={1} style={{ background: 'white' }} />
        </div>
      </div>
    </div>
  )
}

const HTML_VALUE_DEFAULT =
`<html lang="en">
<head>
  <title>DevTools - Tools for developers</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

  <style>
    * {
      font-family: Roboto, sans-serif;
    }
    
  </style>
</head>
<body>
  <center>
    <h1 style="font-weight: 200; font-size: 3em">DevTools</h1>
    <p style="font-weight: 300; font-style: italic">Tools for developers</p>
    <p style="font-weight: 300; font-style: italic">The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
  </center>
</body>
</html>`;

