import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import styles from './index.module.css';

const JsonEditor: React.FC<ReactCodeMirrorProps & {title?: string}> = (props) => {
  const { title, extensions, className,...rest } = props;
  return (
    <div>
      {title && <strong>{title}</strong>}
      <CodeMirror 
        {...rest}
        extensions={[
          basicSetup({
            foldGutter: false,
            indentOnInput: false,
          }),
          ...(extensions || [])
        ]} 
        className={`${className || ''} ${styles.editor}`}
        height='600px'
        maxHeight='600px'
      />
    </div>
  )
}

export default JsonEditor;
