import { useMediaQuery } from 'react-responsive';

export function useDesktop() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  return isDesktop;
}
