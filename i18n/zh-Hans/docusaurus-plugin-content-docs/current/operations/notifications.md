---
title: 运维检查：交易与通知服务
description: 面向运营人员的部署核对，不是普通用户配置通知的前置要求。
---

本页面向运维人员。真实密钥不得进入 Git 或截图，变量名称和默认值以当前后端配置为准。

## 开启自动化之前

- 执行迁移，确认只有计划投入生产的调度/执行实例运行。恢复的数据库副本不能误用真实 API 再次执行。
- 核对数据库、UTC 时刻、系统时钟和策略 IANA 时区；迁移前保留可恢复备份。
- 服务器更换后检查出口 IP 白名单，现货和合约权限分别验证。
- `FNG_EXECUTION_ENABLED` 默认为 false。开启允许符合条件的策略进行真实合约交易，不是无害的界面开关。

## 原生推送

设置 `FCM_ENABLED=true`、正确的 `FCM_PROJECT_ID`，并让 `GOOGLE_APPLICATION_CREDENTIALS` 指向**容器内**的服务账号 JSON。挂载真实文件，建议只读，并确认容器非 root 运行用户可读取。公开 Firebase 客户端配置与私密服务账号密钥不是同一个文件。

iOS 需匹配 Bundle ID、团队和项目，在 Firebase 配置 APNs 认证密钥，核对原生推送权限和正式构建参数。Android 需匹配应用 ID 和 Firebase 客户端，并具备可用 Google Play 服务。参见 [Firebase 官方 Flutter 配置](https://firebase.google.com/docs/cloud-messaging/flutter/get-started)。

按顺序验证：配置已加载 → 注册请求到达接口 → 账户设备记录存在 → 测试事件/队列生成 → 推送平台响应 → 真机收到。设备表没有数据应先查注册链路，不能直接认定是 FCM 发送失败。

## 邮件、Telegram 与 Webhook

- 配置实际邮件发送服务及模板，不只是用户接收地址；注册、找回密码和绑定验证码用途不能混用。
- Telegram 使用 `TELEGRAM_BOT_TOKEN`、`TELEGRAM_BOT_USERNAME`、`TELEGRAM_WEBHOOK_SECRET`。注册 HTTPS 回调 `/api/integrations/telegram/webhook` 时使用匹配的 secret。先验证机器人身份，再测试绑定；Token 不得出现在命令历史或日志。
- Webhook 提醒使用 `OUTBOUND_WEBHOOK_ENABLED`、`OUTBOUND_WEBHOOK_ENCRYPTION_KEY`。加密密钥格式必须符合实现要求，并跨重启保留，避免已有地址无法解密。
- 接收端签名密钥不是服务端存储加密密钥。

## 可靠性检查

核对队列租约/重试、无效设备 Token 清理、平台拒绝和逐级确认状态。标记已发送可能只代表平台接受，不代表用户看到。收集日志前遮罩 Token、密钥、接收邮箱和请求 URL。使用可控测试账户，不要靠反复触发真实交易测试消息。
