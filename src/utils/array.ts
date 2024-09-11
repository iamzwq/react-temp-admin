type SortOrder = "asc" | "desc";

/**
 * 数组排序，支持多字段排序
 * @param array - 需要排序的数组
 * @param sortModel - 排序规则，格式为 [{ key: "name", order: "asc" }]，其中 key 为数组中对象的属性名，order 为排序顺序，可选值为 "asc"（升序）和 "desc"（降序）
 */
export function sortBy<T>(array: T[], sortModel: Array<{ key: keyof T; order: SortOrder }>): T[] {
  return array.slice().sort((a, b) => {
    for (const { key, order } of sortModel) {
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
}
