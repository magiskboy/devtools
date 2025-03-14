import { useEffect, useState } from 'react';

const Page = () => {
  const [url, setURL] = useState('https://username:password@example.com:8080/path/to/resource?query1=value1&query2=value2#section1');
  const [parsed, setParsed] = useState<URL>();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setURL(event.target.value.trim());
  }

  useEffect(() => {
    if (!url) return;
    setParsed(new URL(url));
  }, [url])

  return (
    <>
      <div className="row">
        <div className="column">
          <label htmlFor='url'>URL
            <input type="text" onChange={onChange} id="url" value={url} />
          </label>
        </div>
      </div>
      {parsed &&
      <>
        <strong>Parsed</strong>
        <table>
          <tr>
            <td>Protocol</td>
            <td>{parsed.protocol.slice(0, -1)}</td>
          </tr>
          <tr>
            <td>Hostname</td>
            <td>{parsed.hostname}</td>
          </tr>
          <tr>
            <td>Port</td>
            <td>{parsed.port ?? parsed.protocol === 'https:' ? '443' : '80'}</td>
          </tr>
          <tr>
            <td>Pathname</td>
            <td>{parsed.pathname}</td>
          </tr>
          <tr>
            <td>Search</td>
            <td style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
              {Array.from(parsed.searchParams.entries()).map(([key, value]) => (
                <label htmlFor={key} style={{display: 'flex', alignItems: 'center', gap: '1em', fontWeight: 'normal'}} onClick={() => {
                  navigator.clipboard.writeText(value);
                }}>{key}
                  <input type="text" value={value} id={key} style={{margin: 0}} readOnly />
                </label>
              ))}

            </td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{parsed.hash}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{parsed.username}</td>
          </tr>
          <tr>
            <td>Password</td>
            <td>{parsed.password}</td>
          </tr>
        </table>
      </>
      }
    </>
  );
}

export default Page;
