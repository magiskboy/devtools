import { useLocation } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import { Navbar } from '../navbar';
import { Footer } from '../footer';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="container pt-6">
      {!isHome && <Navbar />}
      {children}
      <Footer />
    </div>
  )
}

