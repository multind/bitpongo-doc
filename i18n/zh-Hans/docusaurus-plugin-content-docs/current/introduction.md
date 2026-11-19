---
sidebar_position: 1
title: 简介
description: 了解 Bitpongo 的用途以及如何使用本项目文档。
---

# Bitpongo 文档

Bitpongo 帮助用户配置并监控与所支持交易所账户连接的自动化定期投资策略。

本文档重点介绍安全配置、通知行为、运行预期和部署配置。它不提供投资建议，也不承诺任何投资回报。

## 现有指南

新增教程以英文、简体中文为主，配当前界面的脱敏演示截图与规则示意图。繁体中文现有内容保留，新增指南尚未完成繁体翻译。

- [快速开始](./guides/quick-start.md)：注册、邮箱验证与使用路线。
- [API 配置](./guides/exchange.md)、[定投](./guides/dca.md)、[F&G 策略](./guides/fng.md)：按真实参数说明操作和执行逻辑。
- [行情](./guides/market.md)、[五步价格提醒](./guides/price-alerts.md)、[收件箱](./guides/inbox.md)。
- [App 通知](./guides/app-push.md)、[邮件](./guides/email.md)、[Telegram](./guides/telegram.md)、[Webhook](./guides/webhook.md)、[感知设置](./guides/perception.md)。
- [广场与分享](./guides/sharing.md)、[账号安全](./guides/account.md)、[故障排查](./guides/troubleshooting.md)、[常见问题](./guides/faq.md)。
- [运维人员指南](./operations/notifications.md)：与普通用户操作分开。
- [配置 Bark 通知](./notifications/bark.md)：独立的可选/历史渠道，不是使用原生 App 通知的必要条件。
- 在 [Bitpongo 前端仓库](https://github.com/multind/bitpongo)中查看应用源码并参与贡献。

## 安全原则

- 妥善保管交易所凭据和通知密钥。
- 使用权限受限的交易所 API，切勿启用提现权限。
- 将部署密钥存放在源代码之外。
- 启用自动化前，检查策略设置和可用余额。
