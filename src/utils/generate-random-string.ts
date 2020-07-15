/**
 * @author
 * @description：生成随机字符串
 * @date：2020/3/18
 */

export function generateRandomString(len: number): string {
  let i = 0,
    str = '';
  const base = 19968,
    range = 10;
  // 19968 至 40869
  while (i < len) {
    i++;
    const lower = parseInt('' + Math.random() * range);
    str += String.fromCharCode(base + lower);
  }
  return str;
}
