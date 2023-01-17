import { useCallback, useEffect, useState } from 'react';

export default function useSlideover(topMarginElementId) {
  const [marginTopAdjustment, setMarginTopAdjustment] = useState(0);

  const adjustMargin = useCallback(() => {
    setMarginTopAdjustment(
      document?.getElementById(topMarginElementId)?.getBoundingClientRect()
        ?.bottom || 0,
    );
  }, [topMarginElementId]);

  useEffect(() => {
    adjustMargin();
    window.addEventListener('resize', adjustMargin);

    return () => {
      window.removeEventListener('resize', adjustMargin);
    };
  }, [adjustMargin]);

  return {
    marginTopAdjustment,
  };
}
