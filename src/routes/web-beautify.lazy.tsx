import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { Editor, SettingForm } from '@/components';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import {css} from '@codemirror/legacy-modes/mode/css';
import { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { html_beautify, js_beautify, css_beautify } from 'js-beautify';
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/web-beautify')({
  component: RouteComponent,
});

const CODEMIRROR_EXTENSIONS = {
  'html': html(),
  'json': json(),
  'css': StreamLanguage.define(css),
  'javascript': javascript(),
}


const BEAUTIFIERS = {
  'html': html_beautify,
  'css': css_beautify,
  'json': js_beautify,
  'javascript': js_beautify
}

const SUPPORTED_LANGS = ['html', 'css', 'json', 'javascript'];

function RouteComponent() {
  usePageTitle("Web Beautifier");
  const [setting, setSetting] = useState<{
    language: keyof typeof CODEMIRROR_EXTENSIONS
    indentSize: number,
  }>({
    language: 'html',
    indentSize: 2,
  });
  const [codeMirrorExtensions, setCodeMirrorExtensions] = useState<Array<LanguageSupport | StreamLanguage<unknown>>>([]);
  const [code, setCode] = useState('');
  

  const onChange: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    const value = event.target.value;
    setSetting({
      ...setting,
      [event.target.name]: event.target.type === 'number' ? Number(value) : value
    })
  } 

  useEffect(() => {
    setCodeMirrorExtensions([CODEMIRROR_EXTENSIONS[setting.language]]);
  }, [setting.language]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const beautifier = BEAUTIFIERS[setting.language];
    const result = beautifier(code, {
      indent_size: setting.indentSize,
    });
    setCode(result);
  }

  const onCodeChange = (value: string) => {
    setCode(value);
  }


  return (
    <div className="columns h-100">
      <div className="column is-9">
        <Editor title="CODE" extensions={codeMirrorExtensions} onChange={onCodeChange} value={code} />
      </div>

      <div className="column is-3">
        <SettingForm>
          <form onChange={onChange} onSubmit={onSubmit}>
            <div className="field">
              <label className="label">Language</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="language">
                    {SUPPORTED_LANGS.map(lang => <option key={lang}>{lang}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Ident Size</label>
              <div className="control">
                <input className="input" type="number" min={1} max={8} name="indentSize" defaultValue={setting.indentSize} value={setting.indentSize} />
              </div>
            </div>

            <div className="control">
              <button className="button is-fullwidth is-primary">Beautify</button>
            </div>
          </form>
        </SettingForm>
      </div> 
    </div>
  );
}

