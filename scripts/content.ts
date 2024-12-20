import AutoRedirect from './features/autoRedirect/index.ts'

// 初始化所有功能
const features = [
  new AutoRedirect()
  // 在这里添加新功能
]

// 启动所有功能
window.addEventListener('load', async () => {
  for (const feature of features) {
    await feature.init()
    feature.start()
  }
})
