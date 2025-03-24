import React, { useState } from 'react';
import cls from 'classnames';

interface FetchModalProps {
  onClose: () => void;
  onFetch: (data: string) => void;
  show?: boolean;
}

export const FetchModal: React.FC<FetchModalProps> = ({ onClose, onFetch, show }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setting, setSetting] = useState({
    url: 'https://api.github.com/users/magiskboy',
    method: 'GET',
    headers: 'Accept: application/vnd.github+json\nX-GitHub-Api-Version: 2022-11-28',
    loading: false,
    error: null,
  })

  const onSettingChange: React.ChangeEventHandler<HTMLFormElement> = (e) => {
    setSetting({
      ...setting,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const {url, method, headers} = setting;
      const headerObject = headers.split('\n').reduce((acc, line) => {
        const [key, value] = line.split(': ');
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
    <div className={cls('modal', { 'is-active': !!show })}>
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
          <form onSubmit={handleSubmit} onChange={onSettingChange}>
            <div className="field">
              <label className="label">URL</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={setting.url}
                  required
                  placeholder="https://api.example.com/data"
                  name="url"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Method</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select value={setting.method} name="method">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">Headers</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="headers"
                  value={setting.headers}
                  placeholder="Key1: Value1
Key2: Value2"
                />
              </div>
            </div>

            {error && (
              <div className="notification is-danger is-light">
                {error}
              </div>
            )}
          </form>
        </section>
        <footer className="modal-card-foot is-flex is-gap-1">
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