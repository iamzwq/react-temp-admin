/**
 * 检查值是否为 null 或 undefined
 * @param value 要检查的值
 * @returns 如果值为 null 或 undefined 返回 true，否则返回 false
 * @example
 * isNil(null); // true
 * isNil(undefined); // true
 * isNil(0); // false
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * 检查值是否为字符串
 * @param value 要检查的值
 * @returns 如果值为字符串返回 true，否则返回 false
 * @example
 * isString("Hello"); // true
 * isString(123); // false
 * isString(""); // true
 */
export function isString(value: any): value is string {
  return typeof value === "string";
}

/**
 * 检查值是否为数字
 * @param value 要检查的值
 * @returns 如果值为数字返回 true，否则返回 false
 * @example
 * isNumber(123); // true
 * isNumber("123"); // false
 * isNumber(NaN); // false
 */
export function isNumber(value: any): value is number {
  return typeof value === "number" && !Number.isNaN(value);
}

/**
 * 检查值是否为布尔值
 * @param value 要检查的值
 * @returns 如果值为布尔值返回 true，否则返回 false
 * @example
 * isBool(true); // true
 * isBool(false); // true
 * isBool(1); // false
 */
export function isBool(value: any): value is boolean {
  return typeof value === "boolean";
}

/**
 * 检查值是否为函数
 * @param value 要检查的值
 * @returns 如果值为函数返回 true，否则返回 false
 * @example
 * isFunc(() => {}); // true
 * isFunc(123); // false
 * isFunc(null); // false
 */
export function isFunc(value: any): value is Function {
  return typeof value === "function";
}

/**
 * 检查值是否为数组
 * @param value 要检查的值
 * @returns 如果值为数组返回 true，否则返回 false
 * @example
 * isArray([]); // true
 * isArray([1, 2, 3]); // true
 * isArray({}); // false
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value);
}

/**
 * 检查值是否为对象
 * @param value 要检查的值
 * @returns 如果值为对象且不为 null 返回 true，否则返回 false
 * @example
 * isObject({}); // true
 * isObject(null); // false
 * isObject([]); // true
 */
export function isObject(value: any): value is object {
  return typeof value === "object" && value !== null;
}

/**
 * 检查值是否为普通对象
 * @param val 要检查的值
 * @returns 如果值为普通对象返回 true，否则返回 false
 * @example
 * isPlainObject({}); // true
 * isPlainObject(new Date()); // false
 */
export function isPlainObject(val: any): val is object {
  return !!val && typeof val === "object" && val.constructor === Object;
}

/**
 * 检查值是否为空
 * 针对 nil、数组、字符串和对象进行检查
 * @param value 要检查的值
 * @returns 如果值为空返回 true，否则返回 false
 * @example
 * isEmpty(null); // true
 * isEmpty([]); // true
 * isEmpty(""); // true
 * isEmpty({}); // true
 * isEmpty([1, 2]); // false
 * isEmpty("hello"); // false
 * isEmpty({ key: "value" }); // false
 * 另一种写法
 * const isEmpty = val => val === null || val === undefined || !Object.keys(val).length;
 */
export function isEmpty(value: any): boolean {
  if (isNil(value)) {
    return true;
  }

  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

/**
 * 检查值是否为有效的邮箱地址
 * @param value 要检查的值
 * @returns 如果值为有效的邮箱地址返回 true，否则返回 false
 * @example
 * isEmail("test@example.com"); // true
 * isEmail("invalid-email"); // false
 */
export function isEmail(value: any): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return isString(value) && emailRegex.test(value);
}

/**
 * 检查值是否为有效的 JSON 字符串
 * @param value 要检查的值
 * @returns 如果值为有效的 JSON 字符串返回 true，否则返回 false
 * @example
 * isValidJSON('{"key": "value"}'); // true
 * isValidJSON('invalid json'); // false
 */
export function isValidJSON(value: any): boolean {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
