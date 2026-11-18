# Bitpongo 文档

## 图文教程与 App 帮助中心

新增 16 个用户主题及独立运维指南，提供英文、简体中文版本，覆盖开户、交易所连接、定投/F&G、价格提醒、通知渠道、分享及账号安全。繁体中文原有页面保留，新教程暂回退到英文。

`docs/guides/` 与对应简体中文 Markdown 是网站和 App 帮助的共同内容源。`help-topics.json` 明确列出公开用户主题；运维指南和内部计划不会进入 App 帮助包。

依次执行 `npm test`、`npm run typecheck`、`npm run build`、`npm run check:help`、`npm run check:i18n`。构建会导出 `build/help-docs/`。更新 App 帮助时，在相邻前端仓库执行 `npm run sync:help`，检查并提交生成的 `public/help-docs/`，再构建前端。只更新文档网站不会替换已安装 App 内的资源包。

截图来自真实 H5 界面和本地拦截的演示数据，不包含真实账号或订单。启动本地 H5 后，通过 `H5_PREVIEW_URL=http://127.0.0.1:5186 npm run capture:guides` 重新截图；脚本禁止外部请求，不提交策略或提醒的最终表单。示意图通过 `node scripts/generate-guide-diagrams.mjs` 生成。提交前必须检查截图排版和敏感数据。

[English](README.md) | [简体中文](README_zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.10.2-3ECC5F.svg)](https://docusaurus.io/)
[![Languages](https://img.shields.io/badge/languages-en%20%7C%20zh--Hans%20%7C%20zh--Hant-18D6C6.svg)](#多语言)

本仓库包含 Bitpongo 文档网站的源代码。网站使用 Docusaurus 构建，在同一套版本化源代码中发布英文、简体中文和繁体中文文档。

当前文档以中英文实用图文教程为主，保留原有繁体中文及 Bark 资料。新教程在繁体中文界面下明确回退至英文。

## 在线体验 Bitpongo

打开在线应用：[https://app.imastermind.io](https://app.imastermind.io)。注册或登录账号，连接受支持的交易所账户后，即可直接在浏览器中创建并监控自动化策略。

这是正式在线服务，不是模拟演示。根据交易所和策略配置，操作可能提交真实订单。API Key 只应开启交易权限，必须关闭提现权限，并在启动策略前仔细检查全部配置。

## 相关仓库

| 项目 | 仓库 |
| --- | --- |
| Web 前端 | [multind/bitpongo](https://github.com/multind/bitpongo) |
| 后端 API | [multind/bitpongo-api](https://github.com/multind/bitpongo-api) |

## 环境要求

- Node.js 20 或更高版本
- npm 10 或更高版本

## 本地开发

```bash
npm install
npm start
```

开发站点默认地址为 `http://localhost:3000`。

## 验证与生产构建

```bash
npm run typecheck
npm run build
npm run check:i18n
npm run serve
```

生成的网站位于 `build/`：

| 语言 | 路径 |
| --- | --- |
| 英文 | `/` |
| 简体中文 | `/zh-Hans/` |
| 繁体中文 | `/zh-Hant/` |

`npm run check:i18n` 会检查多语言构建结果、仓库链接和移动端导航 CSS。

## 添加文档

英文 Markdown 或 MDX 文件放在 `docs/` 下，并在 [`sidebars.ts`](sidebars.ts) 中注册。

翻译文件使用相同的相对路径：

```text
docs/<document>.md
i18n/zh-Hans/docusaurus-plugin-content-docs/current/<document>.md
i18n/zh-Hant/docusaurus-plugin-content-docs/current/<document>.md
```

静态资源放在 `static/` 下。文档中使用以 `/` 开头的路径引用，例如 `/img/example.png`。

## 多语言

默认语言为英文，支持以下 Locale：

- `en`
- `zh-Hans`
- `zh-Hant`

主题翻译位于各语言目录下的 `code.json`、`navbar.json` 和 `footer.json`。增加新的界面文案后，应先重新生成翻译目录，再填写翻译：

```bash
npm run write-translations -- --locale zh-Hans
npm run write-translations -- --locale zh-Hant
```

修改导航栏或页脚链接时，需要同时更新 Docusaurus 配置和对应的多语言翻译文件。

## Docker 镜像

Dockerfile 会把已生成的 `build/` 目录打包到 `nginx:latest`。

```bash
npm install
npm run typecheck
npm run build
npm run check:i18n
docker build -t corbettzhang/bitpongodoc:latest .
docker run --rm -p 8080:80 corbettzhang/bitpongodoc:latest
```

打开 `http://localhost:8080` 验证容器。

推送镜像：

```bash
docker push corbettzhang/bitpongodoc:latest
```

## 内容规范

- 使用清晰、面向任务的标题和简短示例。
- 不要发布 API Key、Bark Device Key、密码、Access Token 或生产日志。
- 对不可撤销操作和交易风险进行明确提示。
- 命令应可以执行，提交 Pull Request 前检查引用路径。
- 英文与简体中文教程须成对维护；已有繁体中文页面应同步维护，新教程可明确回退到英文。

## 参与贡献

1. 创建范围清晰的分支。
2. 同时更新英文源文档和两份中文翻译。
3. 运行类型检查、生产构建和 `check:i18n`。
4. 在桌面端和移动端宽度下检查导航。
5. Pull Request 中说明受影响的文档和语言。

## 许可证

本项目采用 [MIT License](LICENSE)。
