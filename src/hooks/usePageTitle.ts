import { useEffect } from 'react';
import { useMenuContext } from '@/contexts';

export function usePageTitle(title: string) {
  const { setTitle } = useMenuContext();

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
} 