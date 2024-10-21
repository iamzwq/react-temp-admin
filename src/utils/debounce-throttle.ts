type Options = {
  leading?: boolean; // 是否在开始时执行一次
  trailing?: boolean; // 是否在结束后执行一次
};

/**
 * 函数防抖
 * @param func 要进行防抖处理的函数
 * @param wait 延迟执行的时间间隔，单位为毫秒
 * @param options 防抖选项，包括是否在第一次触发时立即执行（leading）和是否在停止触发时执行（trailing）
 * @returns 返回一个防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: Options = {},
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null; // 用于存储定时器的引用
  let lastArgs: Parameters<T> | null = null; // 存储最后一次传入的参数

  // 配置防抖的默认选项
  const { leading = false, trailing = true } = options;

  // 用于执行函数的内部方法
  const invokeFunc = () => {
    if (lastArgs) {
      func(...lastArgs);
      lastArgs = null;
    }
  };

  // 开始新的定时器
  const startTimer = () => {
    timeout = setTimeout(() => {
      if (trailing) {
        invokeFunc();
      }
    }, wait);
  };

  // 防抖处理的函数
  const debounced = (...args: Parameters<T>) => {
    lastArgs = args; // 存储当前的参数

    if (timeout) {
      clearTimeout(timeout);
    }

    if (leading && !timeout) {
      invokeFunc(); // 立即执行第一次
    }

    startTimer(); // 设置新的定时器
  };

  // 取消防抖
  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
    lastArgs = null;
  };

  // 强制执行防抖函数
  debounced.flush = () => {
    if (timeout) {
      invokeFunc(); // 立即执行
      debounced.cancel(); // 清理状态
    }
  };

  return debounced;
}

/**
 * 节流函数
 * @param func 要节流的函数。
 * @param wait 等待时间，函数执行之间的最小时间间隔。
 * @param options 节流函数的配置选项，包括 leading 和 trailing。
 * @returns 返回一个新的节流函数。
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: Options = {},
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null; // 用于存储 setTimeout 的返回值，以便后续清除定时器
  let lastArgs: Parameters<T> | null = null; // 存储上一次调用时的参数
  let lastCallTime: number | null = null; // 记录上一次函数执行的时间

  // 配置节流函数的行为，是否在开始和结束时执行
  const { leading = true, trailing = true } = options;

  // 执行函数并重置定时器
  const invokeFunc = (time: number) => {
    func(...(lastArgs as Parameters<T>));
    lastCallTime = time;
    timeout = null;
    lastArgs = null;
  };

  // 启动定时器，在指定时间后执行函数
  const startTimer = (remainingTime: number) => {
    timeout = setTimeout(() => {
      const now = Date.now();
      if (lastArgs && trailing) {
        invokeFunc(now);
      }
    }, remainingTime);
  };

  // 判断是否应该执行函数
  const shouldInvoke = (time: number) => {
    if (lastCallTime === null) return true;
    return time - lastCallTime >= wait;
  };

  // 节流函数，根据配置和时间判断是否执行传入的函数
  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();
    lastArgs = args;

    if (shouldInvoke(now)) {
      if (timeout === null) {
        if (leading) {
          invokeFunc(now);
        } else {
          startTimer(wait);
        }
      }
    } else if (timeout === null && trailing) {
      startTimer(wait - (now - lastCallTime!));
    }
  };

  // 取消定时器并重置状态
  throttled.cancel = () => {
    if (timeout) clearTimeout(timeout);
    timeout = null;
    lastArgs = null;
    lastCallTime = null;
  };

  // 执行定时器中的函数并重置状态
  throttled.flush = () => {
    if (timeout && lastArgs) {
      invokeFunc(Date.now());
    }
    throttled.cancel();
  };

  return throttled;
}
