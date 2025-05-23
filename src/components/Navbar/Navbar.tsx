import { Link } from "@tanstack/react-router"
import { useMenuContext } from '@/hooks';
import { FaBloggerB, FaGithub, FaNetworkWired, FaUser } from "react-icons/fa";

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
          <div className="navbar-item"> {title} </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a target="_blank" href="https://github.com/magiskboy/devtools" style={{ display: 'block' }}>
                  <span className="icon has-text-white">
                    <FaGithub />
                  </span>
                </a>
              </p>
            </div>
          </div>

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a target="_blank" href="https://nkthanh.dev">
                  <span className="icon has-text-white">
                    <FaUser />
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

