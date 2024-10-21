import { useEffect, useMemo, useRef } from "react";

export function useMemoizedFn<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo((...args: any[]) => callbackRef.current?.(...args), []);
}
