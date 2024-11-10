/**
 * 获取嵌套对象或数组中的值，类似于 Lodash 的 _.get 方法。
 * @param obj - 要从中获取值的对象或数组。
 * @param path - 表示路径的字符串、字符串数组或数字数组。
 * @param defaultValue - 如果路径不存在时返回的默认值。
 * @returns 路径对应的值，如果路径不存在则返回默认值。
 * @example
 * const obj = { a: { b: [ { c: 1 } ] } };
 * get(obj, 'a.b[0].c'); // 1
 * get(obj, ['a', 'b', 0, 'c'], 'default'); // 1
 * get(obj, 'a.b.0.c', 'default'); // 1
 * get(obj, 'a.b.2.c', 'default'); // 'default'
 */
export function get<T>(obj: any, path: string | string[] | number[], defaultValue?: T): T | undefined {
  const paths = Array.isArray(path) ? path : path.replace(/\[(\w+)\]/g, ".$1").split(".");

  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (!obj || !(key in obj)) {
      return defaultValue;
    }

    obj = obj[key];
  }

  return obj as T;
}

type Primitive = null | undefined | boolean | number | string | symbol | bigint;

function isPrimitive(value: any): value is Primitive {
  return (
    value === null || typeof value !== "object" || typeof value === "symbol" || typeof value === "bigint"
  );
}

export function deepClone<T>(value: T): T {
  if (isPrimitive(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item)) as unknown as T;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof RegExp) {
    return new RegExp(value) as unknown as T;
  }

  if (value instanceof Map) {
    const map = new Map();
    value.forEach((val, key) => {
      map.set(key, deepClone(val));
    });
    return map as unknown as T;
  }

  if (value instanceof Set) {
    const set = new Set();
    value.forEach((val) => {
      set.add(deepClone(val));
    });
    return set as unknown as T;
  }

  if (value instanceof Function) {
    return value.bind(value) as unknown as T;
  }

  if (typeof value === "object") {
    const clone: any = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        clone[key] = deepClone(value[key]);
      }
    }
    return clone as T;
  }

  throw new Error("Unsupported type");
}

/**
 * 从对象中选择指定的属性并返回一个新的对象。
 * @param obj - 要从中选择属性的对象。
 * @param keys - 要选择的属性键的数组。
 * @returns 包含指定属性的新对象。
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * pick(obj, ['a', 'c']); // { a: 1, c: 3 }
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, K>,
  );
}

/**
 * 从对象中排除指定的属性并返回一个新的对象。
 * @param obj - 要从中排除属性的对象。
 * @param keys - 要排除的属性键的数组。
 * @returns 排除了指定属性的新对象。
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * omit(obj, ['b']); // { a: 1, c: 3 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return Object.keys(obj).reduce(
    (acc, key) => {
      if (!keys.includes(key as K)) {
        acc[key as keyof Omit<T, K>] = obj[key as keyof Omit<T, K>];
      }
      return acc;
    },
    {} as Omit<T, K>,
  );
}
