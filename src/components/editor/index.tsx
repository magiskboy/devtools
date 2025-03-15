import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { isDarkMode } from '../../libs/helpers';
import styles from './index.module.css';

const Editor: React.FC<ReactCodeMirrorProps & {title?: string}> = (props) => {
  const { title, extensions, className,...rest } = props;
  return (
    <div>
      {title && <p className="is-size-6 mb-2">{title}</p>}
      <CodeMirror 
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
        theme={isDarkMode() ? 'dark' : 'light'}
        style={{overflow: 'scroll'}}
        ref={(ref) => {
          const width = ref?.editor?.clientWidth;
          if (width && ref.editor) {
            ref.editor.style.width = `${width}px`;
          }

        }}
        {...rest}
      />
    </div>
  )
}

export default Editor;
