/**
 * 移除 URL 协议头
 * @param {string} str - URL 字符串
 * @returns {string} 移除协议头后的 URL
 */
export const removeProtocol = (str: string): string => {
  return str.replace(/^https?\??:\/\//gm, '')
}

/**
 * 标准化 URL
 * @param {string} url - URL 字符串
 * @returns {string} 标准化后的 URL
 */
export const normalizeURL = (url: string): string => {
  if (!url) return ''
  if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
    return 'https://' + url
  }
  return url
}
