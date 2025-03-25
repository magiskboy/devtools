import { useEffect, useState, memo } from "react";
import { getMyIP } from "../../libs/helpers";
import styles from './Footer.module.css';

const FooterComponent: React.FC = () => {
  const [ipState, setIpState] = useState<{
    ip: string;
    isLoading: boolean;
    error: string | null;
  }>({
    ip: '',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const ip = await getMyIP();
        setIpState({ ip, isLoading: false, error: null });
      } catch (error) {
        setIpState({ 
          ip: 'unknown', 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch IP' 
        });
      }
    };

    fetchIP();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        {ipState.error ? (
          <p className={styles.footer__error}>{ipState.error}</p>
        ) : (
          <p className={styles.footer__text}>
            My IP: {ipState.isLoading ? 'Loading...' : ipState.ip}
          </p>
        )}
        <p className={styles.footer__text}>
          All data and HTTP requests to fetch JSON are processed locally in your browser.
        </p>
        <p className={styles.footer__text}>
          Copyright © 2025 - <a href="https://nkthanh.dev" className={styles.footer__link}>nkthanh.dev</a>
        </p>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
