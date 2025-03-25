import { useEffect, useRef } from 'react';
import styles from './OpenApiViewer.module.css';

interface OpenApiViewerProps {
  apiDescriptionUrl: string;
}

export function OpenApiViewer({ apiDescriptionUrl }: OpenApiViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create API viewer element
    const api = document.createElement('elements-api');
    api.setAttribute('apiDescriptionUrl', apiDescriptionUrl);
    api.setAttribute('router', 'hash');
    api.setAttribute('layout', 'sidebar');
    containerRef.current.appendChild(api);

    // Load required script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@stoplight/elements/web-components.min.js';
    containerRef.current.appendChild(script);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [apiDescriptionUrl]);

  return <div className={styles.defaultBrowser} ref={containerRef} />;
} 