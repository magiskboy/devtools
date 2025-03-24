import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { FiCopy, FiExternalLink } from 'react-icons/fi';

import { usePageTitle } from '@/hooks/usePageTitle';

export const Route = createLazyFileRoute('/url-viewer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [url, setURL] = useState('https://username:password@example.com:8080/path/to/resource?query1=value1&query2=value2#section1');
  const [parsed, setParsed] = useState<URL>();
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setURL(event.target.value.trim());
  }

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  usePageTitle("URL Viewer");

  useEffect(() => {
    try {
      setParsed(new URL(url));
    } catch {
      setParsed(undefined);
    }
  }, [url])

  const renderField = (label: string, value: string | undefined | number, canCopy = true) => (
    <div className="columns is-mobile is-vcentered">
      <div className="column is-3">
        <span className="has-text-grey-light">{label}</span>
      </div>
      <div className="column">
        <div className="has-background-dark p-3 is-family-code">
          {value || <span className="has-text-grey">Not specified</span>}
        </div>
      </div>
      {canCopy && value && (
        <div className="column is-narrow">
          <button 
            className={`button is-small ${copySuccess === label ? 'is-success' : 'is-dark'}`}
            onClick={() => handleCopy(String(value), label)}
          >
            <span className="icon">
              <FiCopy />
            </span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="container py-6">
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <div className="field">
          <div className="control has-icons-right">
            <input 
              className={`input is-medium ${parsed ? 'is-success' : 'is-danger'}`}
              type="text" 
              onChange={onChange}
              value={url} 
              placeholder='Enter URL'
            />
            <a
              className="icon is-right"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink />
            </a>
          </div>
          {!parsed && (
            <p className="help is-danger mt-2">Invalid URL format</p>
          )}
        </div>

        {parsed && (
          <div className="box has-background-black-ter mt-6">
            <h2 className="title is-4 has-text-white mb-5">URL Components</h2>

            <div className="columns is-multiline">
              <div className="column is-12">
                <div className="box has-background-black-bis p-4 mb-4">
                  {renderField('Protocol', parsed.protocol.slice(0, -1))}
                  {renderField('Hostname', parsed.hostname)}
                  {renderField('Port', parsed.port || (parsed.protocol === 'https:' ? 443 : parsed.protocol === 'http:' ? 80 : ''))}
                </div>
              </div>

              <div className="column is-12">
                <div className="box has-background-black-bis p-4 mb-4">
                  {renderField('Username', parsed.username)}
                  {renderField('Password', parsed.password)}
                </div>
              </div>

              <div className="column is-12">
                <div className="box has-background-black-bis p-4 mb-4">
                  {renderField('Path', parsed.pathname)}
                  {renderField('Fragment', parsed.hash)}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="title is-5 has-text-white mb-4">Query Parameters</h3>
              <div className="columns is-multiline">
                {Array.from(parsed.searchParams.entries()).map(([key, value], index) => (
                  <div key={index} className="column is-12">
                    <div className="box has-background-black-bis p-4" style={{ borderLeft: '3px solid #485fc7' }}>
                      {renderField('Key', key)}
                      {renderField('Value', value)}
                    </div>
                  </div>
                ))}
              </div>
              {Array.from(parsed.searchParams.entries()).length === 0 && (
                <div className="box has-background-black-bis has-text-centered has-text-grey p-6">
                  No query parameters
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
