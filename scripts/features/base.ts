/**
 * 功能模块基类
 */
export default class Feature {
  private name: string
  private enabled: boolean

  constructor(name: string) {
    this.name = name
    this.enabled = true
  }

  async init() {
    const result = await chrome.storage.sync.get([this.name])
    this.enabled = result[this.name] !== false
    return this
  }

  isEnabled() {
    return this.enabled
  }

  start() {
    throw new Error('Feature must implement start method')
  }
}
