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
  let timer: ReturnType<typeof setTimeout> | null = null;
  let _args: Parameters<T> | null = null;
  let _this: any = null;
  const { leading = false, trailing = true } = options;

  const invoke = () => {
    if (_args !== null) {
      func.apply(_this, _args);
      _this = null;
      _args = null;
    }
  };

  const cancelTimer = () => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const cancel = () => {
    cancelTimer();
    _this = null;
    _args = null;
  };

  const debounced = function (this: any, ...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    _this = this;
    _args = args;
    if (timer !== null) clearTimeout(timer);
    if (leading && !timer) {
      invoke(); // 立即执行第一次
    }
    timer = setTimeout(() => {
      if (trailing) {
        invoke();
      }
      cancel();
    }, wait);
  };

  // 取消防抖
  debounced.cancel = cancel;

  // 强制执行防抖函数
  debounced.flush = () => {
    cancelTimer();
    invoke();
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
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null; // 存储上一次调用时的参数
  let lastCallTime: number | null = null; // 记录上一次函数执行的时间

  const { leading = true, trailing = true } = options;

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
