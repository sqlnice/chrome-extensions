import Feature from '../base.ts'

export default class MapSearch extends Feature {
  private menuId: string
  constructor() {
    super('mapSearch')
    this.menuId = 'searchInBaiduMap'
  }

  get id() {
    return this.menuId
  }

  /**
   * 初始化功能
   */
  async init() {
    await super.init()
    if (this.isEnabled()) {
      // 创建右键菜单
      chrome.contextMenus.create({
        id: this.menuId,
        title: '在百度地图中搜索 "%s"',
        contexts: ['selection']
      })

      // 监听菜单点击事件
      chrome.contextMenus.onClicked.addListener(info => {
        if (info.menuItemId === this.menuId && info.selectionText) {
          const searchText = encodeURIComponent(info.selectionText)
          const url = `https://map.baidu.com/search?querytype=s&wd=${searchText}`
          chrome.tabs.create({ url })
        }
      })
    }
    return this
  }

  /**
   * 启动功能
   */
  start() {
    // 由于主要逻辑在 background script 中，这里不需要实现
  }
}
