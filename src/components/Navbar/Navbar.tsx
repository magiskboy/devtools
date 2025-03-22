import { Link } from "@tanstack/react-router"
import { useMenuContext } from '@/contexts';

export const Navbar: React.FC<{className?: string}> = ({className}) => {
  const { title } = useMenuContext();

  return (
    <nav className={`navbar is-transparent ${className}`}>
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="/favicon.png" height={32} width={32} />
        </Link>
        <div className="navbar-burger js-burger" data-target="devtoolsNavbar">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="devtoolsNavbar" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/"> {title} </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a target="_blank" href="https://github.com/magiskboy/devtools" style={{ display: 'block' }}>
                  <span> Github </span>
                </a>
              </p>
            </div>
          </div>

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a target="_blank" href="https://nkthanh.dev">
                  <span> About me </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

