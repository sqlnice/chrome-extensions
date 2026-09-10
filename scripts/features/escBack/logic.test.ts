import { describe, it, expect } from 'vitest'
import { isEscBackSite, isEditableTarget, shouldGoBack, ESC_BACK_SITES } from './logic.ts'

describe('isEscBackSite', () => {
  it('匹配配置内的站点', () => {
    expect(isEscBackSite('tieba.baidu.com')).toBe(true)
    expect(isEscBackSite('x.com')).toBe(true)
    expect(isEscBackSite('twitter.com')).toBe(true)
  })

  it('匹配站点的子域名', () => {
    expect(isEscBackSite('mobile.twitter.com')).toBe(true)
    expect(isEscBackSite('m.x.com')).toBe(true)
  })

  it('拒绝伪装成配置站点后缀的域名', () => {
    expect(isEscBackSite('evil-x.com')).toBe(false)
    expect(isEscBackSite('tieba.baidu.com.evil.com')).toBe(false)
    expect(isEscBackSite('x.com.evil.com')).toBe(false)
  })

  it('拒绝无关域名与空值', () => {
    expect(isEscBackSite('www.baidu.com')).toBe(false)
    expect(isEscBackSite('')).toBe(false)
  })

  it('默认站点列表包含贴吧与 x.com', () => {
    expect(ESC_BACK_SITES).toContain('tieba.baidu.com')
    expect(ESC_BACK_SITES).toContain('x.com')
  })
})

describe('isEditableTarget', () => {
  it('输入类元素视为可编辑', () => {
    expect(isEditableTarget('INPUT', false)).toBe(true)
    expect(isEditableTarget('TEXTAREA', false)).toBe(true)
    expect(isEditableTarget('SELECT', false)).toBe(true)
    expect(isEditableTarget('input', false)).toBe(true)
  })

  it('contentEditable 元素视为可编辑', () => {
    expect(isEditableTarget('DIV', true)).toBe(true)
  })

  it('普通元素与缺失 tagName 不视为可编辑', () => {
    expect(isEditableTarget('BODY', false)).toBe(false)
    expect(isEditableTarget('DIV', false)).toBe(false)
    expect(isEditableTarget(undefined, false)).toBe(false)
    expect(isEditableTarget(null, false)).toBe(false)
  })
})

describe('shouldGoBack', () => {
  it('URL 未变说明页面没自己处理 ESC,应返回', () => {
    expect(shouldGoBack('https://x.com/home', 'https://x.com/home')).toBe(true)
  })

  it('URL 已变说明 SPA 自己处理了 ESC(如关闭弹层),不应再返回', () => {
    expect(shouldGoBack('https://x.com/status/123', 'https://x.com/home')).toBe(false)
  })
})
