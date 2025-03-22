import CodeMirror from '@uiw/react-codemirror';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { basicSetup } from '@uiw/codemirror-extensions-basic-setup';
import { isDarkMode } from '@/libs/helpers';


export const Editor: React.FC<ReactCodeMirrorProps & {title?: string}> = (props) => {
  const { title, extensions, className,...rest } = props;

  return (
    <div className="h-100" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
      <div className="py-3 px-5 is-flex is-justify-content-space-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.12)'}}>
        <p className="is-size-6 has-text-weight-bold" style={{ textTransform: 'uppercase' }}>{title}</p>

        <span style={{cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText(rest.value || '')}>Copy</span>
      </div>
      <CodeMirror 
        extensions={[
          basicSetup({
            foldGutter: false,
            indentOnInput: false,
          }),
          ...(extensions || [])
        ]} 
        className={`${className || ''}`}
        theme={isDarkMode() ? 'dark' : 'light'}
        style={{ overflow: 'scroll' }}
        ref={(ref) => {
          const width = ref?.editor?.clientWidth;
          if (width && ref.editor) {
            ref.editor.style.width = `${width}px`;
            if (ref.editor.children[0]) {
              ref.editor.children[0].setAttribute('style', 'background-color: transparent;');
            }
          }

        }}
        {...rest}
      />
    </div>
  )
}

