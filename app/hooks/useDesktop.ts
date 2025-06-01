import { useMediaQuery } from 'react-responsive';

export function useDesktop() {
  return useMediaQuery({ query: '(min-width: 1280px)' });
}
