import Feature from '../base.ts'
import { DARK_CSS } from './css.ts'

const STYLE_ID = 'tieba-dark-mode-style'
const PAGE_CLASS = 'tieba-dark-mode'

export default class TiebaDark extends Feature {
  constructor() {
    super('tiebaDark')
  }

  start() {
    if (window.location.hostname !== 'tieba.baidu.com') return

    if (this.isEnabled()) this.apply()

    // 监听 popup 的开关变化,切换即时生效,无需刷新页面
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync' || !('tiebaDark' in changes)) return
      if (changes.tiebaDark.newValue === false) this.remove()
      else this.apply()
    })
  }

  private apply() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = DARK_CSS
      ;(document.head || document.documentElement).appendChild(style)
    }
    document.documentElement.classList.add(PAGE_CLASS)
  }

  private remove() {
    document.getElementById(STYLE_ID)?.remove()
    document.documentElement.classList.remove(PAGE_CLASS)
  }
}
