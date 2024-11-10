/**
 * 从 URL 中获取根 URL，即不包含参数和哈希值的部分
 * @param url 要提取根 URL 的 URL
 * @example
 * const url = 'http://url.com/page?name=Adam&surname=Smith'
 * getBaseURL(url) // 'http://url.com/page'
 */
export function getBaseURL(url: string) {
  return url.replace(/[?#].*$/, "");
}

/**
 * 从 URL 中获取参数，格式化为对象
 * @param url 要提取参数的 URL
 * @example
 * const url = 'http://url.com/page?name=Adam&surname=Smith'
 * getURLParameters(url) // {name: 'Adam', surname: 'Smith'}
 */
export function getURLParameters(url: string): Record<string, string> {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => Object.assign(a, { [v.slice(0, v.indexOf("="))]: v.slice(v.indexOf("=") + 1) }),
    {},
  );
}
