import { useEffect, useRef } from 'react';
import styles from './OpenApiViewer.module.css';

interface OpenApiViewerProps {
  apiDescriptionUrl: string;
}

export function OpenApiViewer({ apiDescriptionUrl }: OpenApiViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    // Create API viewer element
    const api = document.createElement('elements-api');
    api.setAttribute('apiDescriptionUrl', apiDescriptionUrl);
    api.setAttribute('router', 'hash');
    api.setAttribute('layout', 'sidebar');
    container.appendChild(api);

    // Load required script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@stoplight/elements/web-components.min.js';
    container.appendChild(script);

    // Cleanup
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [apiDescriptionUrl]);

  return <div className={styles.defaultBrowser} ref={containerRef} />;
} 