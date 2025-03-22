import { useLocation } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import cls from 'classnames';
import { Navbar, Footer } from '@/components';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={cls({
      'container': true,
      'pt-6': isHome,
      'is-flex': true,
      'is-flex-direction-column': true,
      'h-100': true,
    })}>
      {!isHome && <Navbar className="mb-5" />}
      {children}
      <div className="py-4"><Footer /></div>
    </div>
  )
}

