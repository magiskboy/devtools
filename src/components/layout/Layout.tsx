import { useLocation, Link } from '@tanstack/react-router';
import { useMenuContext } from '../../contexts/menu';
import { PropsWithChildren } from 'react';
import cls from 'classnames';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { title } = useMenuContext();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={cls({'container': true, 'py-6': isHome })}>
      {!isHome && <Topbar title={title} />}
      {children}
      <Footer />
    </div>
  )
}

const Topbar: React.FC<{title: string}> = ({title}) => {
  return (
    <div className="is-flex is-align-content-center is-gap-2 mb-4">
      <div>
        <Link to="/"><img src="/favicon.png" width={32} height={32} /></Link>
      </div>
      <h4 className="is-size-5">{title}</h4>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="block my-6">
      <div className="content has-text-centered">
        Copyright &copy; {new Date().getFullYear()} - <a href="https://nkthanh.dev">nkthanh.dev</a>
      </div>
    </footer>

  );
}
