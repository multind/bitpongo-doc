---
title: 配置 Bark 通知
description: 为 Bitpongo 用户或服务器部署配置 Bark 通知。
---

# 配置 Bark 通知

[Bark](https://github.com/Finb/Bark) 是一款开源的 iOS 通知应用。Bitpongo 使用它发送交易结果、策略事件和运行告警。系统会根据事件类型自动选择通知声音和紧急程度。

:::warning 妥善保管推送地址

Bark 推送地址包含可以向你的设备发送通知的 Device Key。请将完整地址视为密钥，不要将它发布在截图、日志、Issue、源代码或公开聊天中。

:::

## Bitpongo 用户配置方式

### 1. 安装并打开 Bark

从 iOS App Store 安装 Bark，并至少打开一次，让它完成通知注册。iOS 请求通知权限时请选择允许。

### 2. 复制 Bark 测试地址

在 Bark 主界面复制显示的测试地址，格式类似：

```text
https://api.day.app/YOUR_DEVICE_KEY/Test
```

复制完整地址。不要替换 Device Key，也不要自行添加声音或 `call=1` 参数。Bitpongo 会为每种事件统一应用通知策略。

### 3. 保存到 Bitpongo

1. 登录 Bitpongo。
2. 打开 **我的**。
3. 选择 **通知**。
4. 将复制的地址粘贴到 **Bark 推送地址**。
5. 保持通知开关开启并选择 **保存**。

服务器会加密保存该地址。保存后，Bitpongo 只显示脱敏地址，绝不会把完整 Device Key 返回给 App。

### 4. 发送测试通知

在 Bark 通知页面选择 **测试**。测试成功时使用普通提示音，不会开启持续响铃。

如果没有收到通知：

1. 在 iOS 设置中确认 Bark 已获得通知权限。
2. 打开 Bark，确认其自带测试地址可以正常使用。
3. 重新复制完整地址，粘贴到 Bitpongo 后再次测试。
4. 检查专注模式、通知摘要、音量和网络连接。

### 停用或删除 Bark

- 关闭通知开关并保存，可以暂停发送而不替换已保存地址。
- 选择 **删除 Bark 设置** 可以移除地址。该用户尚未发送的通知会被跳过，并且不会在重新启用 Bark 后补发。

## 通知行为

Bitpongo 统一决定 Bark 的级别、声音和分组。从测试地址复制的查询参数无法覆盖该策略。

| 事件 | 发送方式 |
| --- | --- |
| 调度器致命错误或需要人工处理的订单 | 严重告警、警报声音、最大音量并持续响铃 |
| 交易失败或市场服务长时间中断 | 时效性警报，不持续响铃 |
| 策略执行被跳过或延迟 | 时效性通知，不持续响铃 |
| 交易成功 | 主动通知，使用 `minuet` 声音 |
| 资产快照失败 | 主动通知 |
| 服务恢复或启动 | 被动通知；默认关闭启动通知 |

持续响铃仅用于需要运维人员立即处理的事件。普通交易失败不会持续响铃。

## Bitpongo 部署配置方式

本节面向服务器管理员。普通用户应通过 App 配置 Bark。

### 1. 生成凭据加密密钥

生成一个使用 Base64 编码的独立 32 字节密钥：

```bash
openssl rand -base64 32
```

将输出保存到密钥管理系统，并通过 `BARK_CREDENTIAL_ENCRYPTION_KEY` 注入。不要复用 JWT 密钥，也不要提交生成的值。

:::danger 必须保留此密钥

该密钥用于加密用户的 Bark Device Key。所有部署和备份必须使用同一个值。更换或丢失该密钥后，服务器将无法解密现有 Bark 设置，受影响用户必须重新保存 Bark 地址。

:::

### 2. 配置环境变量

使用以下部署模板：

```dotenv
BARK_USER_NOTIFICATIONS_ENABLED=true
BARK_ADMIN_PUSH_URL=https://api.day.app/YOUR_ADMIN_DEVICE_KEY
BARK_ALLOWED_HOSTS=api.day.app
BARK_ALLOW_PRIVATE_HOSTS=false
BARK_CREDENTIAL_ENCRYPTION_KEY=YOUR_32_BYTE_BASE64_KEY
BARK_NOTIFY_ON_STARTUP=false
BARK_DISPATCH_ENABLED=true
APP_PUBLIC_URL=https://your-bitpongo.example.com
```

| 变量 | 用途 |
| --- | --- |
| `BARK_USER_NOTIFICATIONS_ENABLED` | 允许用户保存自己的 Bark 地址并接收通知。 |
| `BARK_ADMIN_PUSH_URL` | 管理员 Bark 地址，用于接收调度器、市场、基础设施和人工处理告警。可留空以关闭管理员通知。 |
| `BARK_ALLOWED_HOSTS` | 以逗号分隔的 Bark 主机名或 `host:port` 精确列表，默认值为 `api.day.app`。 |
| `BARK_ALLOW_PRIVATE_HOSTS` | 设为 `true` 时允许列表中明确配置的私有网络主机。使用公共 Bark 服务时请保持 `false`。 |
| `BARK_CREDENTIAL_ENCRYPTION_KEY` | 加密用户 Device Key 所需的 32 字节 Base64 密钥。 |
| `BARK_NOTIFY_ON_STARTUP` | 启用后，在服务启动时向管理员发送被动通知。 |
| `BARK_DISPATCH_ENABLED` | 运行发件箱调度器，发送已入队的业务通知。 |
| `APP_PUBLIC_URL` | 可选的 Bitpongo 公网地址，会附加到支持的通知中。 |

`BARK_ADMIN_PUSH_URL` 和 `BARK_CREDENTIAL_ENCRYPTION_KEY` 都属于密钥。请通过部署密钥或受保护的 `.env` 文件提供，不要写入源代码或镜像构建参数。

### 3. 应用 Docker 配置

修改环境变量后，重新创建 API 容器：

```bash
docker compose up -d --force-recreate api
docker compose ps
docker compose logs --tail=100 api
```

当加密密钥缺失或不是有效的 32 字节 Base64 值时，部署会立即失败；即使关闭用户通知也同样如此。

### 自建 Bark 服务器

使用公网 HTTPS Bark 服务器时，添加其精确主机名：

```dotenv
BARK_ALLOWED_HOSTS=api.day.app,bark.example.com
BARK_ALLOW_PRIVATE_HOSTS=false
```

对于经过审核的私有网络部署，请列出精确的主机名或 `host:port`，并明确允许私有地址：

```dotenv
BARK_ALLOWED_HOSTS=bark.internal.example:8443
BARK_ALLOW_PRIVATE_HOSTS=true
```

Bitpongo 仅接受 HTTPS 地址，默认拒绝回环地址、链路本地地址和私有地址，也不会跟随跨主机重定向。

## 常见部署错误

### `Bark 凭据加密密钥必须是 32-byte Base64`

加密密钥为空、格式错误，或解码后的长度不是 32 字节。使用 `openssl rand -base64 32` 生成新值，保存时不要添加引号或空格，然后重新创建 API 容器。

不要仅为修复新部署中的格式问题而替换正在生产环境使用的密钥。应先找回用于加密现有设置的原始值。

### 测试成功，但业务通知没有到达

确认 `BARK_DISPATCH_ENABLED=true`，并且用户通知开关已开启。测试接口会立即发送，而交易和策略事件通过通知发件箱发送，遇到 Bark 临时故障时可能会重试。

### 自建地址被拒绝

确认地址使用 HTTPS，精确的主机名或 `host:port` 已加入 `BARK_ALLOWED_HOSTS`，并且仅在目标解析到私有地址时明确启用私有主机。

## 隐私和可靠性

- API 响应只返回脱敏后的 Bark 地址。
- Device Key 在写入存储前会被加密。
- 通知失败不会回滚交易、策略、快照或对账结果。
- 业务通知会排队、去重，并在临时故障后重试。
- 删除账户会同时删除 Bark 设置，并跳过尚未发送的用户通知。
