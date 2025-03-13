import { sql } from '@codemirror/lang-sql';
import { useEffect, useState } from 'react';
import { format, SqlLanguage, supportedDialects } from 'sql-formatter';
import Editor from '../../components/editor';
import { useMenuContext } from '../../contexts/menu';

const Page = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<SqlLanguage>('mysql');
  const { setTitle } = useMenuContext();

  useEffect(() => {
    setTitle('SQL Formatter')
  }, [setTitle]);

  const onChange = (value: string) => {
    setInput(value);
  }

  useEffect(() => {
    if (!input) return;

    const result = format(input, { 
      language: language, 
      keywordCase: 'upper',
      functionCase: 'upper',
    });
    setOutput(result);
  }, [input, language]);

  const onChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as SqlLanguage);
  }

  return (
    <>
      <div className="row">
        <div className="column column-25">
          <select name="language" onChange={onChangeLanguage} value={language}>
            {supportedDialects.map((dialect) => (
              <option key={dialect} value={dialect}>
                {dialect}
              </option>))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="column column-50">
          <Editor title="Input" value={input} onChange={onChange} extensions={[sql()]} />
        </div>
        <div className="column column-50">
          <Editor title="Output" value={output} readOnly extensions={[sql()]} />
        </div>
      </div>
    </>
  )
}

export default Page;
