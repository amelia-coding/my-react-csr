/**
 * @author：姚嘉东
 * @description：获取 URL 参数
 * @date：2020/3/18
 */

/**
 * 获取 URL 参数
 * @param name
 */
export function getUrlParam(name: string): string | null {
  // 构造一个含有目标参数的正则表达式对象
  const reg = new RegExp('(^|&)' + name.toLowerCase() + '=([^&]*)(&|$)');
  // 匹配目标参数
  const r = window.location.search
    .substr(1)
    .toLowerCase()
    .match(reg);
  if (r != null) {
    //返回参数值
    return unescape(r[2]);
  }
  return null;
}

/**
 *
 * @param url 获取url中的query参数
 */
export const parseQueryString = (url: string): object => {
  if (typeof url === 'string') {
    const obj = {};
    const paramPart = url.replace(/#\S*/, '').match(/\?[^#]+/);
    if (paramPart === null) {
      return {};
    }
    const paramGroup = paramPart[0].substr(1).split('&');
    for (let i = 0, length = paramGroup.length; i < length; i++) {
      const name = paramGroup[i].split('=')[0];
      const value = paramGroup[i].match(/[=].*/) ? paramGroup[i].match(/[=].*/)[0].substr(1) : null;
      obj[name] = value;
    }

    return obj;
  } else {
    throw new Error('请传入字符串');
  }
};
