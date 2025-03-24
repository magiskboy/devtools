// External dependencies
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

// Internal absolute imports
import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/url-viewer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [url, setURL] = useState('https://username:password@example.com:8080/path/to/resource?query1=value1&query2=value2#section1');
  const [parsed, setParsed] = useState<URL>();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setURL(event.target.value.trim());
  }

  usePageTitle("URL Viewer");

  useEffect(() => {
    try {
      setParsed(new URL(url));
    } catch {
      setParsed(undefined);
    }
  }, [url])

  return (
    <div>
      <div className="field">
        <div className="control">
          <input className="input is-fullwidth" type="text" onChange={onChange} value={url} placeholder='Enter URL' />
        </div>
      </div>

      <div className="mt-4 p-0">
        <h2 className="is-size-5 my-4">Parsed</h2>

        <div className="columns">
          <div className="column is-2">
            Protocol
          </div>
          <div className="column is-10">
            { parsed?.protocol.slice(0, -1) }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Hostname
          </div>
          <div className="column is-10">
            { parsed?.hostname }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Port
          </div>
          <div className="column is-10">
            { parsed?.port ? parsed?.port : parsed?.protocol === 'https:' ? 443 : parsed?.protocol === 'http:' ? 80 : '' }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Username
          </div>
          <div className="column is-10">
            { parsed?.username }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Password
          </div>
          <div className="column is-10">
            { parsed?.password }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Path
          </div>
          <div className="column is-10">
            { parsed?.pathname }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Fragment
          </div>
          <div className="column is-10">
            { parsed?.hash }
          </div>
        </div>

        <div className="columns">
          <div className="column is-2">
            Query
          </div>
          <div className="column is-10">
            {Array.from(parsed?.searchParams.entries() ?? []).map(([key, value]) => (
              <div className="columns" key={key}>
                <div className="column is-2">
                  {key}
                </div>
                <div className="column is-10">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
