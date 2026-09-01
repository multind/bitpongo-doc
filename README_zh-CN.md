# Bitpongo 文档

[English](README.md) | [简体中文](README_zh-CN.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.10.2-3ECC5F.svg)](https://docusaurus.io/)
[![Languages](https://img.shields.io/badge/languages-en%20%7C%20zh--Hans%20%7C%20zh--Hant-18D6C6.svg)](#多语言)

本仓库包含 Bitpongo 文档网站的源代码。网站使用 Docusaurus 构建，在同一套版本化源代码中发布英文、简体中文和繁体中文文档。

当前文档主要包括 Bitpongo 基础概念、项目入口和 Bark 通知配置。参与贡献时应同步维护所有支持的语言。

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
- 英文、简体中文和繁体中文内容需要同步更新。

## 参与贡献

1. 创建范围清晰的分支。
2. 同时更新英文源文档和两份中文翻译。
3. 运行类型检查、生产构建和 `check:i18n`。
4. 在桌面端和移动端宽度下检查导航。
5. Pull Request 中说明受影响的文档和语言。

## 许可证

本项目采用 [MIT License](LICENSE)。
