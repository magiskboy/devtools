import { sql } from '@codemirror/lang-sql';
import { useEffect, useState } from 'react';
import { format, FunctionCase, KeywordCase, SqlLanguage, supportedDialects } from 'sql-formatter';
import Editor from '../../components/editor';
import { useMenuContext } from '../../contexts/menu';

const Page = () => {
  const [sqlQuery, setSqlQuery] = useState('SELECT customer_id.from, COUNT(order_id) AS total FROM customers INNER JOIN orders ON customers.customer_id = orders.customer_id;');
  const { setTitle } = useMenuContext();
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

  useEffect(() => {
    setTitle('SQL Formatter')
  }, [setTitle]);

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
    <div className="row">
      <div className="column column-75">
        <Editor value={sqlQuery} onChange={onChange} extensions={[sql()]} />
      </div>
      <div className="column column-25">
        <form onChange={onChangeSetting} onSubmit={onFormat}>
          <label htmlFor="language">Language
            <select name="language" value={setting.language} defaultValue={setting.language}>
              {supportedDialects.map((dialect) => (
                <option key={dialect} value={dialect}>
                  {dialect}
                </option>))}
            </select>
          </label>
          <label htmlFor="tabWidth">Tab width
            <input type="number" defaultValue={2} value={setting.tabWidth} id="tabWidth" name="tabWidth" />
          </label>
          <label htmlFor='keywordCase'>Keyword case
            <select name="keywordCase" id="keywordCase" value={setting.keywordCase} defaultValue={setting.keywordCase}>
              <option value="upper">Upper</option>
              <option value="lower">Lower</option>
              <option value="preserve">Unchanged</option>
            </select>
          </label>
          <label htmlFor='functionCase'>Function case
            <select name="functionCase" id="functionCase" value={setting.functionCase} defaultValue={setting.functionCase}>
              <option value="upper">Upper</option>
              <option value="lower">Lower</option>
              <option value="preserve">Unchanged</option>
            </select>
          </label>
          <button style={{ width: '100%' }}>Format</button>
        </form>
      </div>
    </div>
  )
}

export default Page;
