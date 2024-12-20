import MapSearch from './features/mapSearch/index.ts'

// 初始化地图搜索功能
const mapSearch = new MapSearch()
mapSearch.init()

// 监听消息
chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'toggleMapSearch') {
    if (!message.enabled) {
      // 移除右键菜单
      chrome.contextMenus.remove(mapSearch.id)
    } else {
      // 重新创建右键菜单
      chrome.contextMenus.create({
        id: mapSearch.id,
        title: '在百度地图中搜索 "%s"',
        contexts: ['selection']
      })
    }
  }
})
