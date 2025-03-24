// External dependencies
import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { memo, useCallback, useState } from 'react';

// Internal absolute imports
import { isDarkMode } from '@/libs/helpers';

// Styles
import styles from './Editor.module.css';

interface EditorProps extends ReactCodeMirrorProps {
  title?: string;
}

const EditorComponent: React.FC<EditorProps> = ({ title, extensions, className, ...rest }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(rest.value || '');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, [rest.value]);

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
        <button 
          className={`${styles.editor__button} ${copySuccess ? styles['editor__button--success'] : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
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
        {...rest}
      />
    </div>
  );
};

export const Editor = memo(EditorComponent);

