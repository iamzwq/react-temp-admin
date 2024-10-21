import { useCallback, useRef, useState } from "react";

export function useInViewport() {
  const observer = useRef<IntersectionObserver | null>(null);
  const [inViewport, setInViewport] = useState(false);

  const ref = useCallback((node: Element | null) => {
    if (node && !observer.current) {
      observer.current = new IntersectionObserver(([entry]) => {
        setInViewport(entry.isIntersecting);
      });
    } else {
      observer.current?.disconnect();
    }

    if (node) {
      observer.current?.observe(node);
    } else {
      setInViewport(false);
    }
  }, []);

  return { ref, inViewport };
}
