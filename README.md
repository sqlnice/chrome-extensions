# 网页助手

一个提供多种网页辅助功能的 Chrome 扩展。

## 功能列表

### 1. 自动跳转
- 自动跳过各大网站的中间跳转页面
- 可在弹窗中开启/关闭此功能
- 支持的网站：
  - 微博 (t.cn、weibo.cn)
  - 知乎
  - 简书
  - 豆瓣
  - CSDN
  - Steam
  - 开源中国
  - 微信开发者社区
  - 腾讯文档
  - Pixiv
  - QQ
  - 语雀
  - 掘金
  - 贴吧
  - ZAKER
  - QQ邮箱
  - Gitee
  - InfoQ
  - 力扣

### 2. 地图搜索
- 选中文字后右键可在百度地图中搜索
- 在新标签页打开搜索结果
- 可在弹窗中开启/关闭此功能
- 支持快捷键操作

## 项目结构

```
project/
├── manifest.json            # 扩展配置文件
├── popup/                   # 弹出窗口
│   ├── index.html          # 弹窗页面
│   ├── style.css           # 弹窗样式
│   └── popup.ts            # 弹窗逻辑
├── scripts/
│   ├── content.ts          # 内容脚本
│   ├── background.ts       # 后台脚本
│   └── features/           # 功能模块目录
│       ├── base.ts         # 功能基类
│       ├── autoRedirect/   # 自动跳转功能
│       │   ├── index.ts    # 功能实现
│       │   └── rules.ts    # 跳转规则配置
│       └── mapSearch/      # 地图搜索功能
│           └── index.ts    # 功能实现
├── lib/                    # 公共库
│   └── utils.ts            # 工具函数
├── dist/                   # 构建输出目录
│   ├── content.js          # 打包后的内容脚本
│   └── background.js       # 打包后的后台脚本
└── build.js                # 构建脚本
```

## 开发说明

### 功能模块化
- 每个功能都继承自 `Feature` 基类
- 配置与逻辑分离
- 便于维护和扩展

### 添加新功能
1. 在 `features` 目录下创建新功能目录
2. 实现功能类（继承 `Feature`）
3. 根据功能类型在相应文件中注册：
   - 网页交互功能 → `content.js`
   - Chrome API 功能 → `background.js`
4. 运行 `node build.js` 构建项目
5. 重新加载扩展

### 开发流程
1. 修改源代码（`scripts/`、`lib/` 目录下的文件）
2. 运行构建命令：
   ```bash
   node build.js
   ```
3. 在 Chrome 扩展管理页面点击"重新加载"图标
4. 测试功能

## 使用方法

1. 克隆仓库到本地
```bash
git clone https://github.com/sqlnice/chrome-extensions.git
```

2. 安装依赖
```bash
pnpm install
```

3. 构建项目
```bash
pnpm build
```

4. 打开 Chrome 扩展程序页面
```
chrome://extensions/
```

5. 开启开发者模式

6. 点击"加载已解压的扩展程序"，选择项目目录

## 功能配置

所有功能都可以在扩展的弹出窗口中开启或关闭：

1. 点击 Chrome 工具栏中的扩展图标
2. 使用开关来控制各项功能
3. 设置会自动保存并同步
