import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// 加载插件
dayjs.extend(utc);
dayjs.extend(timezone);

type DateFormat = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD";

/**
 * 将UTC时间转换为本地时间
 * @param utcTime UTC时间，可以是Day.js支持的任何类型
 * @param format 转换后的日期格式，默认为"YYYY-MM-DD HH:mm:ss"
 * @param withAbbr 是否包含时区缩写，默认为true
 * @param timeZone 指定时区，不传时，默认为浏览器的本地时区
 * @returns 转换后的本地时间字符串
 */
export function convertUTCToLocal(
  utcTime: dayjs.ConfigType,
  format: DateFormat = "YYYY-MM-DD HH:mm:ss",
  withAbbr = true,
  timeZone?: string,
) {
  // 将UTC时间转换为指定时区的时间，timeZone不传时，则默认为浏览器的本地时区
  // 或者使用 dayjs.tz.guess()显式地传递时区
  // timeZone = timeZone || dayjs.tz.guess();
  const localTime = dayjs.utc(utcTime).tz(timeZone);

  // 如果不需要时区缩写，则直接返回格式化后的时间
  if (!withAbbr) {
    return localTime.format(format);
  }

  // 获取时区缩写
  const timeZoneAbbr = localTime.format("z");

  // 格式化时间并拼接时区缩写
  return `${localTime.format(format)} ${timeZoneAbbr}`;
}

/**
 * 格式化日期
 * @param date 日期，可以是Day.js支持的任何类型
 * @param format 格式化字符串，默认为"YYYY-MM-DD HH:mm:ss"
 * @returns 格式化后的日期字符串
 */
export function dateFormat(date: dayjs.ConfigType, format: DateFormat = "YYYY-MM-DD HH:mm:ss") {
  return dayjs(date).format(format);
}
