/**
 * Created by 文利 on 2017/4/21.
 */
/**
 *
 * @param date
 * @param fmt  'yyyy-MM-dd hh:mm'
 * @returns {string}
 */
export function formatDate(date, fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear()+'').substr(4-RegExp.$1.length);
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)?str:padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero(str) {
  str = ('00'+str).substr(str.length);
  return str;
}
