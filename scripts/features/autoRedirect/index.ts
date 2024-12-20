import Feature from '../base.ts'
import { removeProtocol, normalizeURL } from '../../../lib/utils.ts'
import rules from './rules.ts'

export default class AutoRedirect extends Feature {
  private curURL: string
  constructor() {
    super('autoRedirect')
    this.curURL = window.location.href
  }

  /**
   * 跳转到目标 URL
   * @param {string} fakeURLStr - 中间页面 URL
   * @param {string} trueURLParam - 真实 URL 参数名
   */
  redirect(fakeURLStr: string, trueURLParam: string) {
    if (!this.isEnabled()) return

    const fakeURL = new URL(fakeURLStr)
    let trueURL = fakeURL.searchParams.get(trueURLParam)
    if (!trueURL) return

    window.location.replace(normalizeURL(trueURL))
  }

  /**
   * 检查 URL 是否匹配规则
   * @param {string} pattern - URL 匹配模式
   * @param {boolean} enableRegex - 是否启用正则匹配
   * @returns {boolean} 是否匹配
   */
  match(pattern: string, enableRegex = false) {
    const curURLProto = removeProtocol(this.curURL)
    pattern = removeProtocol(pattern)

    if (enableRegex) return curURLProto.search(pattern) > -1
    return curURLProto.indexOf(pattern) === 0
  }

  /**
   * 启动自动跳转功能
   */
  start() {
    if (!this.isEnabled()) return

    for (const [key, rule] of Object.entries(rules)) {
      if (this.match(rule.match, rule.enableRegex)) {
        switch (typeof rule.redirect) {
          case 'string':
            this.redirect(this.curURL, rule.redirect)
            break
          case 'function':
            rule.redirect()
            break
          default:
            console.log(`${key} redirect rule error!`)
            break
        }
      }
    }
  }
}
