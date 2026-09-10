import Feature from '../base.ts'
import { isEscBackSite, isEditableTarget, shouldGoBack } from './logic.ts'

/** 等待页面自行消化 ESC(如关闭弹层)的时间窗口,毫秒 */
const SPA_SETTLE_DELAY = 150

export default class EscBack extends Feature {
  constructor() {
    super('escBack')
  }

  start() {
    if (!this.isEnabled()) return
    if (!isEscBackSite(window.location.hostname)) return

    window.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return
      const target = e.target as HTMLElement | null
      if (isEditableTarget(target?.tagName, target?.isContentEditable ?? false)) return

      const hrefBefore = window.location.href
      setTimeout(() => {
        // x.com 原生用 ESC 关推文详情弹层(URL 会回退);窗口期内 URL 已变
        // 说明页面自己处理了这次 ESC,不能再 history.back() 退过头
        if (shouldGoBack(hrefBefore, window.location.href)) {
          history.back()
        }
      }, SPA_SETTLE_DELAY)
    })
  }
}
