import { useCallback, useEffect, useRef } from "react";
import { useMemoizedFn } from "./use-memoized-fn";

export function useDebouncedFn<T extends (...args: any[]) => any>(fn: T, delay: number) {
  const timer = useRef(0);

  const handleFn = useMemoizedFn(fn);

  useEffect(() => window.clearTimeout(timer.current), []);

  return useCallback(
    (...args: Parameters<T>) => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        handleFn(...args);
      }, delay);
    },
    [handleFn, delay],
  );
}
