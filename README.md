# Bunmix 🥟🍹

> **Bun + Remix v3**：极致轻量的现代无打包全栈最小实践模板，基于 **Bun** 运行时驱动。

无需繁重的打包器（Webpack/Vite），采用原生 ESM、无打包（Unbundled）资产服务与轻量孤岛水合架构。

---

## ✨ 架构亮点

- ⚡ **原生 Bun 驱动**：秒级冷启动，原生运行 TypeScript / TSX，免除构建等待。
- 🏝️ **组件级孤岛水合**：服务端渲染静态 HTML，仅对高频交互组件（如 `<Counter />`）按需泼水水合，极致轻量。
- 🎯 **直觉式极简路由**：去除繁冗的契约样板层，直接基于 `createRouter` 链式挂载路由与中间件。
- 📦 **原生 ESM 编译服务**：内置 `createAssetServer`，结合浏览器 `<ImportMap>`，实现毫秒级源码即时交付与热更新。
- 🎨 **开箱即用 TailwindCSS**：基于现代浏览器运行时加载，即写即见。

---

## 🚀 快速开始

### 1. 安装依赖
```bash
bun install
```

### 2. 开发模式（监听与热重载）
```bash
bun run watch
```
打开浏览器访问 [http://localhost](http://localhost) 即可查看页面。

### 3. 生产启动
```bash
bun run start
```

---

## 📁 项目结构

```text
bunmix
├── main.tsx        # 服务端主入口（Bun.serve、路由定义与 SSR 页面）
├── entry.ts       # 客户端水合入口（Hydration Runner 与 HMR 监听）
├── button.tsx      # 客户端交互组件（具有独立客户端状态的 Counter）
├── package.json    # 极简依赖与启动脚本
├── tsconfig.json   # 现代化精简 TS 配置（支持裸导入别名解析）
└── README.md       # 项目文档
```

---

## 🛠️ 核心技术栈
- [Remix v3](https://remix.run/) - 现代全栈框架底层模块
- [Bun](https://bun.sh/) - 现代高性能 JavaScript / TypeScript 运行时
