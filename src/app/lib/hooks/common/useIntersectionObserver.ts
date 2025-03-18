import { useState, useEffect, useRef, RefObject } from 'react';

const useIntersectionObserver = (
  elementRef: RefObject<Element | null>,
  options: IntersectionObserverInit = { threshold: 0 }
) => {
  const observerRef = useRef<IntersectionObserver>();
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  useEffect(() => {
    const node = elementRef.current;

    if (!node) return;

    observerRef.current = new IntersectionObserver(setEntries, options);
    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elementRef, options]);

  return {
    entries,
    observerRef,
  };
};

export default useIntersectionObserver;
