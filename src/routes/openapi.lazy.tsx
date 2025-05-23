import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { OpenApiForm, OpenApiViewer } from '@/components/OpenApi';

export const Route = createLazyFileRoute('/openapi')({
  component: RouteComponent,
})

function RouteComponent() {
  const [inputUrl, setInputUrl] = useState('https://petstore3.swagger.io/api/v3/openapi.json');
  const [doc, setDoc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate URL
      new URL(inputUrl);
      setDoc(inputUrl);
    } catch {
      setError('Please enter a valid URL');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <OpenApiForm
          url={inputUrl}
          isLoading={isLoading}
          error={error}
          onSubmit={handleSubmit}
          onUrlChange={handleDocChange}
        />
      </div>
      {doc && (
        <OpenApiViewer apiDescriptionUrl={doc} />
      )}
    </div>
  );
}
