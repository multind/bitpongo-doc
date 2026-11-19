---
title: 绑定 Telegram 提醒
description: 使用自己的 Telegram 私聊绑定机器人，点击 Start，并确认实际接收账户。
---

![提醒方式中的 Telegram 设置入口](/img/guides/channels-zh.png)

## 绑定步骤

1. 打开「我的 → 提醒方式 → Telegram → 前往设定」。
2. 点击「绑定 Telegram」，用希望接收消息的 Telegram 账户打开生成的链接。
3. 在机器人的**私聊**里点击底部 **Start（开始）**。这一步会发送链接对应的绑定命令，只打开 Telegram 不算完成。
4. 返回 Bitpongo，按弹窗提示刷新或检查绑定状态。
5. 开启 Telegram 渠道并保存，有测试入口时再发测试消息确认。

旧链接过期后重新生成，不要把绑定链接分享或转发给其他人，因为它会把聊天账户与你的 Bitpongo 账户关联。群聊也不能代替要求的私聊。

## Start 是什么意思

Start 是 Telegram 机器人聊天底部的开始按钮。绑定链接中可以携带参数，后端收到对应开始命令后才知道要绑定哪个请求。机制见 [Telegram 官方深链说明](https://core.telegram.org/bots/features#deep-linking)。

## 绑定或收不到消息时

- 确认是正确机器人的私聊，并点击了 Start，而不是只搜索到同名机器人。
- 返回应用检查状态；跳转成功不等于绑定成功。
- 手机无法唤起 Telegram 时，可用链接网页入口或安装/更新 Telegram，再重新绑定。
- 页面提示未接入时，需要运营方配置机器人和回调，不应让普通用户提供服务器 Bot Token。
- 检查是否屏蔽机器人、Telegram 网络是否正常、Telegram 自身通知是否开启。

更换接收账户时，先在应用解除绑定，再绑定目标账户。逐级感知见 [感知设置](perception.md)。
