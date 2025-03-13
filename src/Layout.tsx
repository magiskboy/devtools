import { Outlet } from 'react-router';
import { Link } from 'react-router';
import styles from './Layout.module.css';
import { useMenuContext } from './contexts/menu';

const Layout = () => {
  const { title } = useMenuContext();
  return (
    <div className={`container ${styles.root}`}>
      <div className={`row ${styles.topbar}`}>
        <div className={styles.menu}>
          <img src="/images/dots.png" width={32} height={32} />
          <div className={`container ${styles['menu-content']}`}>
            <div className="row">
              <ul className="column">
                <li className={styles.title}>Formatter</li>
                <li><Link to="/jsonnet">Jsonnet</Link></li>
                <li><Link to="/sql-fmt">SQL formatter</Link></li>
                <li><Link to="/yaml-json">YAML - JSON converter</Link></li>
                <li><Link to="/yaml-fmt">YAML fmt</Link></li>
              </ul>
              <ul className="column">
                <li className={styles.title}>Internet</li>
              </ul>
              <ul className="column">
                <li className={styles.title}>Viewer</li>
                <li><Link to="/url-viewer">URL</Link></li>
                <li><Link to="/html-viewer">HTML</Link></li>
                <li><Link to="/json-viewer">JSON</Link></li>
                <li><Link to="/openapi-viewer">OpenAPI</Link></li>
              </ul>
              <ul className="column">
                <li className={styles.title}>Encode / Decode</li>
                <li><Link to="/base64">Base64</Link></li>
                <li><Link to="/jwt">JWT</Link></li>
                <li><Link to="/html-escape">HTML escape</Link></li>
                <li><Link to="/url-encode-decode">URL encode/decode</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <h4 style={{marginLeft: '16px'}}>{title}</h4>
      </div>
      <Outlet />

      <div className={`row ${styles.footer}`}>
        <div className="column">
          Copyright &copy; {new Date().getFullYear()} - <a href="https://nkthanh.dev">nkthanh.dev</a>
        </div>
      </div>
    </div>
  )
}

export default Layout;
