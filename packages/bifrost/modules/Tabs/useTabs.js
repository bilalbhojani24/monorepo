import { useEffect, useMemo, useState } from 'react';

export const useTabs = (containerRef, tabsArray, isSlideableTabs) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [maxScrollPos, setMaxScrollPos] = useState(0);

  const disablePrev = useMemo(() => scrollPos <= 0, [scrollPos]);
  const disableNext = useMemo(
    () => scrollPos >= maxScrollPos - 1,
    [scrollPos, maxScrollPos]
  );

  useEffect(() => {
    if (isSlideableTabs) {
      const container = containerRef.current;
      setIsOverflowed(container.scrollWidth > container.clientWidth);

      const { scrollWidth, offsetWidth } = container;
      const newMaxScrollPos = scrollWidth - offsetWidth;
      setMaxScrollPos(newMaxScrollPos);
    }
  }, [tabsArray, containerRef, isSlideableTabs]);

  const handleScroll = () => {
    const container = containerRef.current;
    const { scrollLeft, offsetWidth, scrollWidth } = container;
    const newScrollPos = scrollLeft;
    const newMaxScrollPos = scrollWidth - offsetWidth;
    setScrollPos(newScrollPos);
    setMaxScrollPos(newMaxScrollPos);
  };

  const scroll = (type = 'next') => {
    const container = containerRef.current;
    const items = container.querySelectorAll('.tabs-item');
    const itemWidth = items[0].offsetWidth;

    const newScrollPos =
      type === 'next'
        ? Math.min(scrollPos + itemWidth * 2, maxScrollPos)
        : Math.max(scrollPos - itemWidth * 2, 0);

    container.scrollTo({
      left: newScrollPos,
      behavior: 'smooth'
    });

    setScrollPos(newScrollPos);
  };

  return { isOverflowed, scroll, handleScroll, disablePrev, disableNext };
};
