import { FaLink } from 'react-icons/fa';

interface OpenApiFormProps {
  url: string;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function OpenApiForm({ url, isLoading, error, onSubmit, onUrlChange }: OpenApiFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="field has-addons">
        <div className="control has-icons-left is-expanded">
          <input
            type="text"
            className={`input ${error ? 'is-danger' : ''}`}
            value={url}
            onChange={onUrlChange}
            placeholder="Enter OpenAPI spec URL"
            disabled={isLoading}
          />
          <span className="icon is-left">
            <FaLink />
          </span>
        </div>
        <div className="control">
          <button
            type="submit"
            className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
            disabled={isLoading}
          >
            Load Specification
          </button>
        </div>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </form>
  );
} 