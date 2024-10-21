import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = any>(
  type: K,
  listener: (this: HTMLDivElement, event: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  const ref = useRef<T>();

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      element.addEventListener(type, listener as any, options);
      return () => element.removeEventListener(type, listener as any, options);
    }
  }, [type, listener, options]);

  return ref;
}
