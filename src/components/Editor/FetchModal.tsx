import React, { useState } from 'react';

interface Header {
  key: string;
  value: string;
}

interface FetchModalProps {
  onClose: () => void;
  onFetch: (data: string) => void;
}

export const FetchModal: React.FC<FetchModalProps> = ({ onClose, onFetch }) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const handleRemoveHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const headerObject = headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch(url, {
        method,
        headers: headerObject,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      onFetch(data);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Fetch from URL</p>
          <button 
            className="delete" 
            aria-label="close" 
            onClick={onClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">URL</label>
              <div className="control">
                <input
                  type="url"
                  className="input"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  required
                  placeholder="https://api.example.com/data"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Method</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">
                Headers
                <button
                  type="button"
                  className="button is-small is-link is-outlined ml-2"
                  onClick={handleAddHeader}
                >
                  + Add Header
                </button>
              </label>
              {headers.map((header, index) => (
                <div key={index} className="field has-addons mb-2">
                  <div className="control is-expanded">
                    <input
                      className="input"
                      placeholder="Header name"
                      value={header.key}
                      onChange={e => handleHeaderChange(index, 'key', e.target.value)}
                    />
                  </div>
                  <div className="control is-expanded">
                    <input
                      className="input"
                      placeholder="Value"
                      value={header.value}
                      onChange={e => handleHeaderChange(index, 'value', e.target.value)}
                    />
                  </div>
                  <div className="control">
                    <button
                      type="button"
                      className="button is-danger"
                      onClick={() => handleRemoveHeader(index)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="notification is-danger is-light">
                {error}
              </div>
            )}
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            type="submit"
            className={`button is-primary ${loading ? 'is-loading' : ''}`}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
          <button
            type="button"
            className="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}; 