/**
 * ESC 返回功能的纯逻辑,与 DOM / chrome API 解耦,便于测试
 */

/** 启用 ESC 返回的站点,新增站点只需在此追加 */
export const ESC_BACK_SITES: readonly string[] = ['tieba.baidu.com', 'x.com', 'twitter.com']

/**
 * 判断 hostname 是否属于启用站点(含子域名)
 */
export function isEscBackSite(
  hostname: string,
  sites: readonly string[] = ESC_BACK_SITES
): boolean {
  return sites.some(s => hostname === s || hostname.endsWith('.' + s))
}

/**
 * 判断 ESC 事件目标是否为可编辑元素(可编辑时 ESC 交还给页面,如清除搜索框)
 */
export function isEditableTarget(
  tagName: string | null | undefined,
  isContentEditable: boolean
): boolean {
  if (isContentEditable) return true
  const t = (tagName ?? '').toUpperCase()
  return t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT'
}

/**
 * ESC 按下后延迟比对两次 URL:未变说明页面没有自行处理(没有弹层可关),
 * 才由扩展执行 history.back();已变说明 SPA 自己消化了这次 ESC,不能再退
 */
export function shouldGoBack(hrefBefore: string, hrefAfter: string): boolean {
  return hrefBefore === hrefAfter
}

/** ESC 的处置动作 */
export type EscAction = 'back' | 'blur' | 'closeOverlay'

/**
 * 焦点在可编辑元素里时本次 ESC 只让它失焦(不返回):
 * 若直接忽略,焦点会一直困在输入框里,后续 ESC 永远无反应;
 * 让出焦点后,下一次 ESC 才执行返回。
 * 有全屏浮层(贴吧图片预览等,关闭不改 URL,URL 判定法失效)时,
 * 本次 ESC 只负责关浮层,不返回——x.com 改 URL 的弹层仍走 URL 判定。
 */
export function decideEscAction(isEditable: boolean, overlayOpen = false): EscAction {
  if (isEditable) return 'blur'
  if (overlayOpen) return 'closeOverlay'
  return 'back'
}
