/**
 * 数组分组，返回一个对象，对象的 key 为分组依据的属性值，value 为分组后的数组
 * @param arr - 需要分组的数组
 * @param getKeyFromItem - 获取分组依据的函数，传入数组中的每一项，返回其分组依据的属性值
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 * const result = groupBy(array, item => item.category);
 * // {
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' }
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' }
 * //   ]
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  arr: readonly T[],
  getKeyFromItem: (item: T) => K,
): Record<K, T[]> {
  const result = Object.create(null) as Record<K, T[]>;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = getKeyFromItem(item);

    if (result[key] == null) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}

/**
 * 获取数组中第一个元素
 * @param arr - 数组
 * @example
 * const arr = [1, 2, 3];
 * const lastElement = last(arr); // 3
 */
export function last<T>(arr: readonly T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * 比较两个值，返回 -1、0、1
 * @param a - 值 a
 * @param b - 值 b
 * @param order - 排序顺序，"asc" 或 "desc"
 * @example
 * // const result = compareValues(1, 2, "asc"); // -1
 * // const result = compareValues(1, 2, "desc"); // 1
 * // const result = compareValues(1, 1, "asc"); // 0
 */
export function compareValues(a: any, b: any, order: "asc" | "desc"): 0 | -1 | 1 {
  if (a < b) {
    return order === "asc" ? -1 : 1;
  }
  if (a > b) {
    return order === "asc" ? 1 : -1;
  }
  return 0;
}

/**
 * 数组排序，支持多字段排序
 * @param arr - 需要排序的数组
 * @param criteria - 排序依据，可以是函数或属性名
 * @param orders - 排序顺序，"asc" 或 "desc"
 * @example
 * // user升序，age降序
 * const users = [
 *   { user: 'fred', age: 48 },
 *   { user: 'barney', age: 34 },
 *   { user: 'fred', age: 40 },
 *   { user: 'barney', age: 36 },
 * ];
 * const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
 * // [
 * //   { user: 'barney', age: 36 },
 * //   { user: 'barney', age: 34 },
 * //   { user: 'fred', age: 48 },
 * //   { user: 'fred', age: 40 },
 * // ]
 */
export function orderBy<T extends object>(
  arr: readonly T[],
  criteria: Array<((item: T) => unknown) | keyof T>,
  orders: Array<"asc" | "desc">,
): T[] {
  return arr.slice().sort((a, b) => {
    const ordersLength = orders.length;

    for (let i = 0; i < criteria.length; i++) {
      const order = ordersLength > i ? orders[i] : orders[ordersLength - 1];
      const criterion = criteria[i];
      const criterionIsFunction = typeof criterion === "function";

      const valueA = criterionIsFunction ? criterion(a) : a[criterion];
      const valueB = criterionIsFunction ? criterion(b) : b[criterion];

      const result = compareValues(valueA, valueB, order);

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });
}

/**
 * 数字数组去重
 * @param arr - 数组
 * @example
 * const arr = [1, 2, 3, 2, 1];
 * const result = uniq(arr); // [1, 2, 3]
 */
export function uniq<T>(arr: readonly T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * 对象数组去重，根据某个属性值或函数返回值进行去重
 * @param arr - 数组
 * @param mapper - 获取去重依据的函数，传入数组中的每一项，返回其去重依据的属性值
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 * ];
 * const result = uniqBy(arr, item => item.category);
 * // [
 * //   { category: 'fruit', name: 'apple' },
 * //   { category: 'vegetable', name: 'carrot' },
 * // ]
 */
export function uniqBy<T, U>(arr: readonly T[], mapper: (item: T) => U): T[] {
  const map = new Map<U, T>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = mapper(item);

    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}

/**
 * 获取数组中指定索引的元素，支持负数索引
 * @param array - 数组
 * @param index - 索引
 * @example
 * const arr = [1, 2, 3];
 * const result = at(arr, 1); // 2
 * const result = at(arr, -1); // 3
 */
export function at<T>(array: T[], index: number): T | undefined {
  if (array.length === 0) return undefined;

  if (index < 0) index += array.length;

  if (index < 0 || index >= array.length) return undefined;

  return array[index];
}
