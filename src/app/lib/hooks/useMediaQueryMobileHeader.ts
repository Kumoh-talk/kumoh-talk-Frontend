'use client';

import { useMediaQuery } from 'react-responsive';

export function useMediaQueryMobileHeader() {
  const isMobileHeader = useMediaQuery({
    query: '(max-width: 56rem)',
  });

  return isMobileHeader;
}
