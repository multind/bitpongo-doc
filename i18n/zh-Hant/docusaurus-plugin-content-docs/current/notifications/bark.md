---
title: 設定 Bark 通知
description: 為 Bitpongo 使用者或伺服器部署設定 Bark 通知。
---

# 設定 Bark 通知

[Bark](https://github.com/Finb/Bark) 是一款開放原始碼的 iOS 通知應用程式。Bitpongo 使用它傳送交易結果、策略事件和系統警示。系統會根據事件類型自動選擇通知音效和緊急程度。

:::warning 妥善保管推播網址

Bark 推播網址包含可以向你的裝置傳送通知的 Device Key。請將完整網址視為密鑰，不要將它發布在螢幕截圖、日誌、Issue、原始碼或公開聊天中。

:::

## Bitpongo 使用者設定方式

### 1. 安裝並開啟 Bark

從 iOS App Store 安裝 Bark，並至少開啟一次，讓它完成通知註冊。iOS 要求通知權限時請選擇允許。

### 2. 複製 Bark 測試網址

在 Bark 主畫面複製顯示的測試網址，格式類似：

```text
https://api.day.app/YOUR_DEVICE_KEY/Test
```

複製完整網址。不要替換 Device Key，也不要自行加入音效或 `call=1` 參數。Bitpongo 會為每種事件統一套用通知策略。

### 3. 儲存到 Bitpongo

1. 登入 Bitpongo。
2. 開啟 **我的**。
3. 選擇 **通知**。
4. 將複製的網址貼到 **Bark 推播網址**。
5. 保持通知開關開啟並選擇 **儲存**。

伺服器會加密儲存該網址。儲存後，Bitpongo 只顯示遮罩處理後的網址，絕不會把完整 Device Key 傳回 App。

### 4. 傳送測試通知

在 Bark 通知頁面選擇 **測試**。測試成功時使用一般提示音，不會開啟持續響鈴。

如果沒有收到通知：

1. 在 iOS 設定中確認 Bark 已取得通知權限。
2. 開啟 Bark，確認其內建測試網址可以正常使用。
3. 重新複製完整網址，貼到 Bitpongo 後再次測試。
4. 檢查專注模式、通知摘要、音量和網路連線。

### 停用或刪除 Bark

- 關閉通知開關並儲存，可以暫停傳送而不替換已儲存的網址。
- 選擇 **刪除 Bark 設定** 可以移除網址。該使用者尚未傳送的通知會被略過，並且不會在重新啟用 Bark 後補發。

## 通知行為

Bitpongo 統一決定 Bark 的層級、音效和群組。從測試網址複製的查詢參數無法覆蓋此策略。

| 事件 | 傳送方式 |
| --- | --- |
| 排程器嚴重錯誤或需要人工處理的訂單 | 嚴重警示、警報音效、最大音量並持續響鈴 |
| 交易失敗或市場服務長時間中斷 | 時效性警報，不持續響鈴 |
| 策略執行被略過或延遲 | 時效性通知，不持續響鈴 |
| 交易成功 | 主動通知，使用 `minuet` 音效 |
| 資產快照失敗 | 主動通知 |
| 服務復原或啟動 | 被動通知；預設關閉啟動通知 |

持續響鈴只用於需要維運人員立即處理的事件。一般交易失敗不會持續響鈴。

## Bitpongo 部署設定方式

本節適用於伺服器管理員。一般使用者應透過 App 設定 Bark。

### 1. 產生憑證加密金鑰

產生一個使用 Base64 編碼的獨立 32 位元組金鑰：

```bash
openssl rand -base64 32
```

將輸出儲存到密鑰管理系統，並透過 `BARK_CREDENTIAL_ENCRYPTION_KEY` 注入。不要重複使用 JWT 密鑰，也不要提交產生的值。

:::danger 必須保留此金鑰

此金鑰用於加密使用者的 Bark Device Key。所有部署和備份必須使用相同的值。更換或遺失此金鑰後，伺服器將無法解密現有 Bark 設定，受影響的使用者必須重新儲存 Bark 網址。

:::

### 2. 設定環境變數

使用以下部署範本：

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

| 變數 | 用途 |
| --- | --- |
| `BARK_USER_NOTIFICATIONS_ENABLED` | 允許使用者儲存自己的 Bark 網址並接收通知。 |
| `BARK_ADMIN_PUSH_URL` | 管理員 Bark 網址，用於接收排程器、市場、基礎設施和人工處理警示。可留空以關閉管理員通知。 |
| `BARK_ALLOWED_HOSTS` | 以逗號分隔的 Bark 主機名稱或 `host:port` 精確清單，預設值為 `api.day.app`。 |
| `BARK_ALLOW_PRIVATE_HOSTS` | 設為 `true` 時允許清單中明確設定的私人網路主機。使用公共 Bark 服務時請保持 `false`。 |
| `BARK_CREDENTIAL_ENCRYPTION_KEY` | 加密使用者 Device Key 所需的 32 位元組 Base64 金鑰。 |
| `BARK_NOTIFY_ON_STARTUP` | 啟用後，在服務啟動時向管理員傳送被動通知。 |
| `BARK_DISPATCH_ENABLED` | 執行寄件匣分派器，傳送已排入佇列的業務通知。 |
| `APP_PUBLIC_URL` | 選用的 Bitpongo 公開網址，會附加到支援的通知中。 |

`BARK_ADMIN_PUSH_URL` 和 `BARK_CREDENTIAL_ENCRYPTION_KEY` 都屬於密鑰。請透過部署密鑰或受保護的 `.env` 檔案提供，不要寫入原始碼或映像檔建置參數。

### 3. 套用 Docker 設定

修改環境變數後，重新建立 API 容器：

```bash
docker compose up -d --force-recreate api
docker compose ps
docker compose logs --tail=100 api
```

當加密金鑰遺失或不是有效的 32 位元組 Base64 值時，部署會立即失敗；即使關閉使用者通知也是如此。

### 自行架設 Bark 伺服器

使用公開 HTTPS Bark 伺服器時，加入其精確主機名稱：

```dotenv
BARK_ALLOWED_HOSTS=api.day.app,bark.example.com
BARK_ALLOW_PRIVATE_HOSTS=false
```

對於經過審核的私人網路部署，請列出精確的主機名稱或 `host:port`，並明確允許私人位址：

```dotenv
BARK_ALLOWED_HOSTS=bark.internal.example:8443
BARK_ALLOW_PRIVATE_HOSTS=true
```

Bitpongo 僅接受 HTTPS 目標，預設拒絕回送位址、連結本機位址和私人位址，也不會跟隨跨主機重新導向。

## 常見部署錯誤

### `Bark 憑據加密密鑰必須是 32-byte Base64`

加密金鑰為空、格式錯誤，或解碼後的長度不是 32 位元組。使用 `openssl rand -base64 32` 產生新值，儲存時不要加入引號或空格，然後重新建立 API 容器。

不要只為修正新部署中的格式問題而替換正在正式環境使用的金鑰。應先找回用於加密現有設定的原始值。

### 測試成功，但業務通知沒有送達

確認 `BARK_DISPATCH_ENABLED=true`，並且使用者通知開關已開啟。測試端點會立即傳送，而交易和策略事件會透過通知寄件匣傳送，遇到 Bark 暫時性故障時可能會重試。

### 自行架設的網址被拒絕

確認網址使用 HTTPS，精確的主機名稱或 `host:port` 已加入 `BARK_ALLOWED_HOSTS`，並且只在目標解析為私人位址時明確啟用私人主機。

## 隱私和可靠性

- API 回應只傳回遮罩處理後的 Bark 網址。
- Device Key 在寫入儲存空間前會被加密。
- 通知失敗不會回復交易、策略、快照或對帳結果。
- 業務通知會排入佇列、去除重複項目，並在暫時性故障後重試。
- 刪除帳戶會同時刪除 Bark 設定，並略過尚未傳送的使用者通知。
