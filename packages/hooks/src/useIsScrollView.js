import { useState, useEffect } from 'react';

import { makeDebounce } from '@browserstack/utils';

const useIsScrollView = (refEl) => {
  const [isScrollView, setIsScrollView] = useState(false);

  const unsetScrollView = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = makeDebounce(() => {
      if (!refEl.current) {
        return;
      }

      const refComponentTop = refEl.current.getBoundingClientRect().top;

      setIsScrollView(refComponentTop <= 0);
    }, 7);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollView, refEl]);

  return [isScrollView, unsetScrollView];
};

export default useIsScrollView;
