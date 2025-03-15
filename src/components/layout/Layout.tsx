import { useLocation } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import cls from 'classnames';
import { Navbar } from '../navbar';
import { Footer } from '../footer';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={cls({
      'container': true,
      'pt-6': isHome
    })}>
      {!isHome && <Navbar />}
      {children}
      <Footer />
    </div>
  )
}

