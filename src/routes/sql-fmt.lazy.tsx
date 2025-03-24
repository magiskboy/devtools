import { createLazyFileRoute } from '@tanstack/react-router'
import { sql } from '@codemirror/lang-sql';
import { useEffect, useState } from 'react';
import { format, FunctionCase, KeywordCase, SqlLanguage, supportedDialects } from 'sql-formatter';
import { Editor, SettingForm } from '@/components';
import { usePageTitle } from '@/hooks/usePageTitle';


function RouteComponent() {
  const [sqlQuery, setSqlQuery] = useState(DEFAULT_SQL);
  const [setting, setSetting] = useState<{
    language: SqlLanguage,
    keywordCase: KeywordCase,
    functionCase: FunctionCase,
    tabWidth: number,
  }>({
    language: 'mysql',
    keywordCase: 'upper',
    tabWidth: 2,
    functionCase: 'upper',
  })

  usePageTitle("SQL Formatter");

  const onChange = (value: string) => {
    setSqlQuery(value);
  }

  useEffect(() => {
    if (!sqlQuery) return;
  }, [sqlQuery, setting]);

  const onFormat: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const result = format(sqlQuery, setting);
    setSqlQuery(result);
  }

  const onChangeSetting: React.ChangeEventHandler<HTMLFormElement> = (event) => {
    const value = event.target.value;
    setSetting({
      ...setting,
      [event.target.name]: event.target.type === 'number' ? Number(value) : value
    })
  }

  return (
    <div className="block columns">
      <div className="column is-9">
        <Editor title="SQL" value={sqlQuery} onChange={onChange} extensions={[sql()]} />
      </div>
      <div className="column is-3">
        <SettingForm>
          <form onChange={onChangeSetting} onSubmit={onFormat} className="is-flex is-flex-direction-column">
            <div className="field">
              <label className="label">Language</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="language" value={setting.language} defaultValue={setting.language}>
                    {supportedDialects.map((dialect) => (
                      <option key={dialect} value={dialect}>
                        {dialect}
                      </option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Tab width</label>
              <div className="control">
                <input type="number" defaultValue={2} value={setting.tabWidth} className="input" name="tabWidth" />
              </div>
            </div>

            <div className="field">
              <label className="label">Keyword case</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="keywordCase" value={setting.keywordCase} defaultValue={setting.keywordCase}>
                    <option value="upper">Upper</option>
                    <option value="lower">Lower</option>
                    <option value="preserve">Unchanged</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Function case</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select name="functionCase" id="functionCase" value={setting.functionCase} defaultValue={setting.functionCase}>
                    <option value="upper">Upper</option>
                    <option value="lower">Lower</option>
                    <option value="preserve">Unchanged</option>
                  </select>
                </div>
              </div>
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

export const Route = createLazyFileRoute('/sql-fmt')({
  component: RouteComponent,
})

const DEFAULT_SQL =
`SELECT customer_id.from, COUNT(order_id) AS total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;`;
