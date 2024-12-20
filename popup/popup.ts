document.addEventListener('DOMContentLoaded', async () => {
  // 获取所有功能的开关状态
  const features = await chrome.storage.sync.get(['autoRedirect', 'mapSearch'])

  // 自动跳转功能
  const autoRedirectSwitch = document.getElementById('autoRedirect') as HTMLInputElement
  autoRedirectSwitch.checked = features.autoRedirect !== false // 默认开启

  // 监听开关变化
  autoRedirectSwitch.addEventListener('change', e => {
    chrome.storage.sync.set({
      autoRedirect: (e.target as HTMLInputElement).checked
    })
  })

  // 地图搜索功能
  const mapSearchSwitch = document.getElementById('mapSearch') as HTMLInputElement
  mapSearchSwitch.checked = features.mapSearch !== false // 默认开启

  // 监听开关变化
  mapSearchSwitch.addEventListener('change', e => {
    chrome.storage.sync.set({
      mapSearch: (e.target as HTMLInputElement).checked
    })
    // 通知 background script 更新菜单
    chrome.runtime.sendMessage({
      type: 'toggleMapSearch',
      enabled: (e.target as HTMLInputElement).checked
    })
  })
})
