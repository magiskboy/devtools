import { useLocation } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import cls from 'classnames';
import { Navbar, Footer } from '@/components';
import styles from './Layout.module.css';

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={cls(styles.layout, {
      [styles['layout--home']]: isHome
    })}>
      {!isHome && <Navbar />}
      <div className={styles.layout__content}>
        {children}
      </div>
      <div className={styles.layout__footer}>
        <Footer />
      </div>
    </div>
  );
};

