import { memo } from 'react';
import { Editor } from './Editor';
import { LanguageSupport, StreamLanguage } from '@codemirror/language';
import styles from './MemoizedEditor.module.css';

interface MemoizedEditorProps {
  title: string;
  value: string;
  onChange?: (value: string) => void;
  extensions?: Array<LanguageSupport | StreamLanguage<unknown>>;
  readOnly?: boolean;
  height?: string;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export const MemoizedEditor = memo(function MemoizedEditor({
  title,
  value,
  onChange,
  extensions = [],
  readOnly = false,
  height,
  placeholder,
  minHeight,
  className
}: MemoizedEditorProps) {
  return (
    <div className={styles.memoizedEditor__container}>
      <Editor
        title={title}
        value={value}
        onChange={onChange}
        extensions={extensions}
        readOnly={readOnly}
        height={height}
        placeholder={placeholder}
        minHeight={minHeight}
        className={`${styles.memoizedEditor} ${className || ''}`}
      />
    </div>
  );
}); 