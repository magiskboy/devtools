import { useEffect, useState, memo } from "react";
import { getMyIP } from "../../libs/helpers";
import styles from './Footer.module.css';

interface FooterProps {}

const FooterComponent: React.FC<FooterProps> = () => {
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

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>
          My IP: {ipState.isLoading ? 'Loading...' : ipState.ip}
          {ipState.error && <span className={styles.errorMessage}> ({ipState.error})</span>}
        </p>
        <p>All data and HTTP requests to fetch JSON are processed locally in your browser.</p>
        <p>
          Copyright &copy; {currentYear} -{' '}
          <a 
            href="https://nkthanh.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit nkthanh.dev (opens in new tab)"
            className={styles.link}
          >
            nkthanh.dev
          </a>
        </p>
      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);
