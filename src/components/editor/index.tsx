import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { isDarkMode } from '../../libs/helpers';
import styles from './index.module.css';

const Editor: React.FC<ReactCodeMirrorProps & {title?: string}> = (props) => {
  const { title, extensions, className,...rest } = props;
  return (
    <div className="h-100">
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
        height='100%'
        theme={isDarkMode() ? 'dark' : 'light'}
        style={{overflow: 'scroll'}}
        ref={(ref) => {
          if (ref?.editor) {
            ref.editor.style.minHeight = '100%';
          }

          const width = ref?.editor?.clientWidth;
          const height = ref?.editor?.clientHeight;
          if (width && height && ref.editor) {
            ref.editor.style.height = `${height}px`
            ref.editor.style.width = `${width}px`;
          }

        }}
        {...rest}
      />
    </div>
  )
}

export default Editor;
