---
title: 配置 Webhook 提醒
description: 接入钉钉、飞书、Slack 或 Discord，区分平台与签名，并保护接收地址。
---

Webhook 提醒是 Bitpongo **向外发送**消息到聊天平台，不等于接收外部信号的入站 Webhook。

![Webhook 设置入口和渠道开关](/img/guides/channels-zh.png)

## 添加接收端

1. 在目标平台为指定群组/频道创建有权使用的机器人或入站 Webhook。
2. 打开「我的 → 提醒方式 → Webhook → 前往设定」，添加接收端。
3. 选择匹配的平台：**钉钉、飞书、Slack、Discord**。不要选了飞书却粘贴 Slack 地址。
4. 填写便于识别的名称和完整 HTTPS 地址。钉钉/飞书开启签名时，在专用输入框填写对应签名密钥。
5. 保存后，打开单个接收端和 Webhook 总开关，发送测试消息，到目标群/频道检查。

| 平台 | 创建什么 | 重点核对 |
| --- | --- | --- |
| 钉钉 | 群自定义机器人 | 签名/关键词限制与配置一致 |
| 飞书 | 群机器人 Webhook | 开启签名时填写匹配密钥 |
| Slack | 已授权工作区和频道的 Incoming Webhook | 授权和目标频道正确 |
| Discord | 频道的 Incoming Webhook | 频道权限正常，Webhook 没有被删除 |

官方参考：[Slack](https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/)、[Discord](https://docs.discord.com/developers/resources/webhook)。平台和地址有安全限制，不能当作任意 URL 请求工具。

## 地址也是敏感信息

Webhook URL 往往自带凭据。不要出现在截图、公开代码、访问日志或求助聊天中。泄露后先在平台删除/轮换，再更新应用配置。

## 收不到时怎么查

依次核对平台、地址、签名密钥、接收端与总开关、平台安全限制和频率限制。平台接受消息不代表用户已经阅读。同一个 Webhook 渠道可包含多个开启的接收端；逐级发送与确认规则见 [感知设置](perception.md)。
