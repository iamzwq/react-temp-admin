import { useCallback, useEffect, useRef, useState } from "react";

// 类型定义
interface UseRequestOptions<T> {
  manual?: boolean; // 是否手动触发请求
  pollingInterval?: number; // 轮询间隔
  debounceInterval?: number; // 防抖时间
  throttleInterval?: number; // 截流时间
  onSuccess?: (data: T) => void; // 请求成功回调
  onError?: (error: any) => void; // 请求失败回调
}

interface RequestResult<T> {
  data: T | null;
  loading: boolean;
  error: any;
  run: () => Promise<void>; // 手动执行请求
  cancel: () => void; // 取消请求
}

export function useRequest<T>(
  requestFn: () => Promise<T>,
  options: UseRequestOptions<T> = {},
): RequestResult<T> {
  const { manual = false, pollingInterval, debounceInterval, throttleInterval, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef<boolean>(false); // 用于截流的ref
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // 用于防抖的ref
  const cancelRequestRef = useRef<boolean>(false); // 用于取消请求

  // 清除轮询
  const clearPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // 取消请求
  const cancel = useCallback(() => {
    cancelRequestRef.current = true;
    clearPolling();
  }, []);

  const run = useCallback(async () => {
    if (cancelRequestRef.current) return;

    // 截流处理
    if (throttleInterval && throttleRef.current) return;
    throttleRef.current = true;

    setLoading(true);
    setError(null);

    try {
      const result = await requestFn();
      if (!cancelRequestRef.current) {
        setData(result);
        onSuccess?.(result);
      }
    } catch (err) {
      if (!cancelRequestRef.current) {
        setError(err);
        onError?.(err);
      }
    } finally {
      setLoading(false);

      if (throttleInterval) {
        setTimeout(() => {
          throttleRef.current = false;
        }, throttleInterval);
      } else {
        throttleRef.current = false;
      }
    }
  }, [requestFn, onSuccess, onError, throttleInterval]);

  // 自动请求和轮询
  useEffect(() => {
    if (!manual) {
      if (debounceInterval) {
        // 防抖处理
        debounceRef.current = setTimeout(run, debounceInterval);
        return () => {
          if (debounceRef.current) clearTimeout(debounceRef.current);
        };
      } else {
        run();
      }
    }

    if (pollingInterval) {
      pollingRef.current = setInterval(run, pollingInterval);
    }

    return () => {
      clearPolling();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [manual, pollingInterval, debounceInterval, run]);

  return {
    data,
    loading,
    error,
    run, // 手动触发请求
    cancel, // 取消请求
  };
}
