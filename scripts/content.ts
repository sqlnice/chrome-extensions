import AutoRedirect from './features/autoRedirect/index.ts'
import TiebaDark from './features/tiebaDark/index.ts'
import EscBack from './features/escBack/index.ts'

// 依赖完整 DOM 的功能,等页面加载完成再启动
const domFeatures = [new AutoRedirect()]

// 越早越好的功能,立即启动:贴吧深色模式晚一毫秒就多一毫秒白屏闪烁
const instantFeatures = [new TiebaDark(), new EscBack()]

void (async () => {
  for (const feature of instantFeatures) {
    await feature.init()
    feature.start()
  }
})()

window.addEventListener('load', async () => {
  for (const feature of domFeatures) {
    await feature.init()
    feature.start()
  }
})
