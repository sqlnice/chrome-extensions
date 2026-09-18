import Feature from '../base.ts'
import { isEscBackSite, isEditableTarget, shouldGoBack, decideEscAction } from './logic.ts'

/** 等待页面自行消化 ESC(如关闭弹层)的时间窗口,毫秒 */
const SPA_SETTLE_DELAY = 150

/**
 * 已知的全屏浮层:ESC 应先关它们而不是返回。
 * 这些浮层关闭时不改 URL,x.com 那套 URL 判定法对它们无效。
 * 遇到新站点的灯箱/弹层,在这里追加一行即可。
 */
const OVERLAY_LAYERS: ReadonlyArray<{ open: string; close: string }> = [
  // 贴吧图片预览(Element Plus el-image-viewer)
  { open: '.el-image-viewer__wrapper', close: '.el-image-viewer__close' }
]

/** 排障日志开关,问题定位后改为 false 即可静音 */
const DEBUG = true

const log = (...args: unknown[]) => {
  if (DEBUG) console.log('[网页助手]', ...args)
}

function findOverlay(): { root: HTMLElement; close: string } | null {
  for (const layer of OVERLAY_LAYERS) {
    const el = document.querySelector<HTMLElement>(layer.open)
    if (el && el.getBoundingClientRect().width > 0) {
      return { root: el, close: layer.close }
    }
  }
  return null
}

export default class EscBack extends Feature {
  constructor() {
    super('escBack')
  }

  start() {
    if (!isEscBackSite(window.location.hostname)) return
    if (!this.isEnabled()) {
      log('escBack:功能开关已关闭(popup 里可开启),不监听 ESC')
      return
    }
    log(`escBack v0.5:开始监听 ESC(${window.location.hostname},捕获阶段)`)

    let loggedFirstKey = false
    window.addEventListener(
      'keydown',
      e => {
        if (!loggedFirstKey) {
          loggedFirstKey = true
          log(`escBack:首次收到 keydown(key=${e.key}),监听通道正常`)
        }
        if (e.key !== 'Escape') return
        const target = e.target as HTMLElement | null
        const isEditable = isEditableTarget(target?.tagName, target?.isContentEditable ?? false)

        const action = decideEscAction(isEditable, findOverlay() !== null)
        if (action === 'blur') {
          // x.com 加载后焦点常落在搜索/登录输入框,直接忽略会让 ESC 永远无反应;
          // 先让输入框失焦,下一次 ESC 即可返回
          log(`ESC:焦点在 ${target?.tagName},让它失焦(本次不返回,再按一次返回)`)
          target?.blur()
          return
        }
        if (action === 'closeOverlay') {
          // 贴吧图片预览等浮层:本次 ESC 只关浮层(页面自己关,或 150ms 后代点关闭按钮),
          // 绝不 history.back(),否则会带着预览直接退页
          const overlay = findOverlay()
          log(`ESC:检测到全屏浮层(${overlay?.root.className?.slice(0, 40)}),关闭它而不返回`)
          setTimeout(() => {
            const still = findOverlay()
            if (still) {
              log('ESC:页面没有自行关闭浮层,代点关闭按钮')
              still.root.querySelector<HTMLElement>(still.close)?.click()
            }
          }, SPA_SETTLE_DELAY)
          return
        }

        const hrefBefore = window.location.href
        log(`ESC:焦点在 ${target?.tagName ?? '未知'},进入 ${SPA_SETTLE_DELAY}ms 判定`)
        setTimeout(() => {
          // x.com 原生用 ESC 关推文详情弹层(URL 会回退);窗口期内 URL 已变
          // 说明页面自己处理了这次 ESC,不能再 history.back() 退过头
          if (shouldGoBack(hrefBefore, window.location.href)) {
            log(`ESC 判定:URL 未变 → history.back()(history.length=${history.length})`)
            history.back()
          } else {
            log('ESC 判定:URL 已被页面自己改变,跳过返回')
          }
        }, SPA_SETTLE_DELAY)
      },
      // 必须捕获阶段:登录态 x.com 等会在下层节点对 ESC stopPropagation,
      // 冒泡阶段监听收不到事件;window 捕获是事件链第一站,且我们只观察不拦截
      true
    )
  }
}
