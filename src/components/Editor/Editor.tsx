// External dependencies
import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { memo, useCallback, useRef, useState } from 'react';
import { isDarkMode } from '@/libs/helpers';
import styles from './Editor.module.css';
import { FetchModal } from './FetchModal';

interface EditorProps extends ReactCodeMirrorProps {
  title?: string;
  acceptedFileTypes?: string;
  onContentChange?: (content: string) => void;
}

const EditorComponent: React.FC<EditorProps> = ({ 
  title, 
  extensions, 
  className,
  acceptedFileTypes,
  onChange,
  onContentChange,
  ...rest 
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFetchModal, setShowFetchModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rest.value || '');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [rest.value]);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        onContentChange?.(content);
      }
    };
    reader.readAsText(file);
  }, [onContentChange]);

  const handleFetchData = useCallback((data: string) => {
    onContentChange?.(data);
  }, [onContentChange]);

  const handleRef = useCallback((ref: any) => {
    if (!ref?.editor) return;
    
    const width = ref.editor.clientWidth;
    if (width) {
      ref.editor.style.width = `${width}px`;
      const firstChild = ref.editor.children[0];
      if (firstChild) {
        firstChild.setAttribute('style', 'background-color: transparent;');
      }
    }
  }, []);

  return (
    <div className={styles.editor}>
      <div className={styles.editor__header}>
        <p className={styles.editor__title}>{title}</p>
        <div className={styles.editor__actions}>
          <input
            ref={fileInputRef}
            type="file"
            className={styles.editor__fileInput}
            onChange={handleFileChange}
            accept={acceptedFileTypes}
          />
          <button
            className={styles.editor__button}
            onClick={handleFileSelect}
            aria-label="Upload file"
          >
            Upload File
          </button>
          <button
            className={styles.editor__button}
            onClick={() => setShowFetchModal(true)}
            aria-label="Fetch from URL"
          >
            From URL
          </button>
          <button 
            className={`${styles.editor__button} ${copySuccess ? styles['editor__button--success'] : ''}`}
            onClick={handleCopy}
            aria-label="Copy code"
          >
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <CodeMirror 
        extensions={[
          basicSetup({
            foldGutter: false,
            indentOnInput: false,
          }),
          ...(extensions || [])
        ]} 
        className={`${styles.editor__content} ${className || ''}`}
        theme={isDarkMode() ? 'dark' : 'light'}
        ref={handleRef}
        onChange={onChange}
        {...rest}
      />
      {showFetchModal && (
        <FetchModal
          onClose={() => setShowFetchModal(false)}
          onFetch={handleFetchData}
        />
      )}
    </div>
  );
};

export const Editor = memo(EditorComponent);

