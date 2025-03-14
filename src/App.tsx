import { Link } from 'react-router';
import styles from './App.module.css';

const FMT_TOOLS = [
  {name: 'Jsonnet', path: '/jsonnet'},
  {name: 'SQL fmt', path: '/sql-fmt'},
  {name: 'YAML - JSON', path: '/yaml-json'},
  {name: 'YAML fmt', path: '/yaml-fmt'},
  {name: 'JSON fmt', path: '/json-fmt'},
];

const VIEWER_TOOLS = [
  {name: 'URL', path: '/url-viewer'},
  {name: 'HTML', path: '/html-viewer'},
  {name: 'OpenAPI - wip', path: '/openapi-viewer'},

];

const ENCODE_TOOLS = [
  {name: 'Base64 - wip', path: '/base64'},
  {name: 'JWT - wip', path: '/jwt'},
  {name: 'HTML escape - wip', path: '/html-escape'},
  {name: 'URL encode/decode - wip', path: '/url-encode-decode'},
];


function App() {
  return (
    <div className={`container ${styles.root}`}>
      <div className={styles.heading}>
        <h1>DevTools</h1>
        <p>Tools for developers<br />The Ultimate Toolkit to Simplify, Automate, and Enhance Your Development Workflow!</p>
      </div>

      <div className={styles['tools']}>
        <GroupTool title="Formatter" tools={FMT_TOOLS} />
        <GroupTool title="Viewer" tools={VIEWER_TOOLS} />
        <GroupTool title="Encode" tools={ENCODE_TOOLS} />
      </div>
    </div>
  )
}

const GroupTool: React.FC<{title: string, tools: {path: string, name: string}[]}> = ({title, tools}) => {
  return (
    <div className={styles['group-tools']}>
      <div className={styles['group-title']}>{title}</div>
      <div className={styles['group-content']}>
        {tools.map(({ path, name }) => (
          <div className={styles['group-item']} >
            <Link to={path}>{name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
