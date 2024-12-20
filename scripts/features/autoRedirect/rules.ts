interface Rule {
  match: string
  redirect: string | (() => void)
  enableRegex?: boolean
}

const rules: Record<string, Rule> = {
  weibo: {
    match: 'http://t.cn/',
    redirect() {
      const element = document.querySelector('.open-url')
      const link = element?.children[0] as HTMLAnchorElement
      if (!link?.href) return
      window.location.replace(link.href)
    },
    enableRegex: false
  },
  weibo_2: { match: 'https://weibo.cn/sinaurl?u', redirect: 'u' },
  weibo_3: { match: 'https://weibo.cn/sinaurl?toasturl', redirect: 'toasturl' },
  weibo_4: {
    match: 'https://weibo.cn/sinaurl?',
    redirect() {
      const element = document.querySelector('.open-url')
      const link = element?.children[0] as HTMLAnchorElement
      if (!link?.href) return
      window.location.replace(link.href)
    },
    enableRegex: false
  },
  jianshu: { match: 'https://www.jianshu.com/go-wild?', redirect: 'url' },
  zhihu: { match: 'https://link.zhihu.com/?', redirect: 'target' },
  douban: { match: 'https://www.douban.com/link2/?url=', redirect: 'url' },
  csdn: { match: 'https://link.csdn.net/?target=', redirect: 'target' },
  steam: { match: 'https://steamcommunity.com/linkfilter/?url=', redirect: 'url' },
  oschina: { match: 'https://www.oschina.net/action/GoToLink?url=', redirect: 'url' },
  weixindev: {
    match: 'https://developers.weixin.qq.com/community/middlepage/href?href=',
    redirect: 'href'
  },
  weixin: {
    match: 'https://weixin110.qq.com/cgi-bin/mmspamsupport-bin/newredirectconfirmcgi?',
    redirect() {
      const element = document.querySelector('.ui-ellpisis-content')
      const link = element?.querySelector('p')?.textContent
      if (!link) return
      window.location.replace(link)
    },
    enableRegex: false
  },
  qqdocs: { match: 'https://docs.qq.com/scenario/link.html?url=', redirect: 'url' },
  pixiv: { match: 'https://www.pixiv.net/jump.php?url=', redirect: 'url' },
  qq: { match: 'https://c.pc.qq.com/(middlem|index).html', redirect: 'pfurl', enableRegex: true },
  yuque: { match: 'https://www.yuque.com/r/goto?url=', redirect: 'url' },
  juejin: { match: 'https://link.juejin.cn/?target=', redirect: 'target' },
  tieba: {
    match: 'https://jump2.bdimg.com/safecheck/index?url=',
    redirect() {
      const href = document.getElementsByClassName('btn')[0].getAttribute('href') || ''
      window.location.replace(href)
    }
  },
  zaker: { match: 'http://iphone.myzaker.com/zaker/link.php?', redirect: 'url' },
  qqmail: { match: 'https://mail.qq.com/cgi-bin/readtemplate', redirect: 'gourl' },
  gitee: { match: 'https://gitee.com/link?target=', redirect: 'target' },
  infoq: { match: 'https://xie.infoq.cn/link?target=', redirect: 'target' },
  leetcode: { match: 'https://leetcode.cn/link/?target', redirect: 'target' }
}

export default rules
