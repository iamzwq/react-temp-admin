const CASE_SPLIT_PATTERN =
  /\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;

/**
 * 将字符串拆分为单词，以进行各种大小写转换或拼接
 * 结果匹配可用于将 camelCase、snake_case、kebab-case 和其他混合格式转换为一致的格式
 * @param str 字符串
 * @returns 单词数组
 * @example
 * getWords('helloWorld') // ['hello', 'World']
 * getWords('hello_world') // ['hello', 'world']
 * getWords('hello-world') // ['hello', 'world']
 * getWords('hello123') // ['hello', '123']
 * getWords('👋🌎') // ['👋', '🌎']
 * getWords('camelCaseHTTPRequest🚀) // ['camel', 'Case', 'HTTP', 'Request', '🚀']
 */
export function getWords(str: string): string[] {
  return Array.from(str.match(CASE_SPLIT_PATTERN) ?? []);
}

/**
 * 将字符串转换为snake_case格式
 * @param str 字符串
 * @returns snake_case格式的字符串
 * @example
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('hello-world') // 'hello_world'
 */
export function toSnakeCase(str: string): string {
  const words = getWords(str);
  return words.map((word) => word.toLowerCase()).join("_");
}

/**
 * 将字符串转换为kebab-case格式
 * @param str 字符串
 * @returns kebab-case格式的字符串
 * @example
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 */
export function toKebabCase(str: string): string {
  const words = getWords(str);
  return words.map((word) => word.toLowerCase()).join("-");
}

/**
 * 将字符串转换为camelCase格式
 * @param str 字符串
 * @returns camelCase格式的字符串
 * @example
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 */
export function toCamelCase(str: string): string {
  const words = getWords(str);

  if (words.length === 0) {
    return "";
  }

  const [first, ...rest] = words;

  return `${first.toLowerCase()}${rest.map((word) => capitalize(word)).join("")}`;
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function uuid() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
}
