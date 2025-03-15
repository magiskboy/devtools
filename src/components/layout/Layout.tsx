import { useLocation } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import { Navbar } from '../navbar';
import { Footer } from '../footer';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="container">
      {!isHome && <Navbar />}
      {children}
      <Footer />
    </div>
  )
}

