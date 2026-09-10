const FEATURE_IDS = ['autoRedirect', 'mapSearch', 'tiebaDark', 'escBack'] as const

document.addEventListener('DOMContentLoaded', async () => {
  // 获取所有功能的开关状态
  const states = await chrome.storage.sync.get([...FEATURE_IDS])

  for (const id of FEATURE_IDS) {
    const input = document.getElementById(id) as HTMLInputElement | null
    if (!input) continue
    input.checked = states[id] !== false // 默认开启

    input.addEventListener('change', () => {
      chrome.storage.sync.set({ [id]: input.checked })
      if (id === 'mapSearch') {
        // 右键菜单只能在 background 里增删,切换时通知它
        chrome.runtime.sendMessage({ type: 'toggleMapSearch', enabled: input.checked })
      }
    })
  }
})
