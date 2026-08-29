---
title: Configure Bark Notifications
description: Configure Bark notifications for a Bitpongo user or server deployment.
---

# Configure Bark Notifications

[Bark](https://github.com/Finb/Bark) is an open-source iOS notification app. Bitpongo uses it to deliver trade results, strategy events, and operational alerts. Notification sound and urgency are selected automatically according to the event type.

:::warning Keep the push URL private

A Bark push URL contains a Device Key that can send notifications to your device. Treat the complete URL as a secret. Do not post it in screenshots, logs, issues, source code, or public chat.

:::

## Configure Bark as a Bitpongo user

### 1. Install and open Bark

Install Bark from the iOS App Store and open it once so that it can register for notifications. Allow notifications when iOS asks for permission.

### 2. Copy the Bark test URL

In Bark, copy the test URL displayed on the main screen. It looks similar to:

```text
https://api.day.app/YOUR_DEVICE_KEY/Test
```

Copy the complete address. Do not replace the Device Key and do not add custom sound or `call=1` parameters. Bitpongo applies a consistent notification policy for each event type.

### 3. Save it in Bitpongo

1. Sign in to Bitpongo.
2. Open **Me**.
3. Select **Notifications**.
4. Paste the copied address into **Bark push URL**.
5. Keep notifications enabled and select **Save**.

The saved address is encrypted by the server. After saving, Bitpongo only shows a masked address and never returns the complete Device Key to the app.

### 4. Send a test notification

Select **Test** on the Bark notification page. A successful test uses a normal notification sound and does not enable continuous ringing.

If no notification arrives:

1. Confirm that Bark has notification permission in iOS Settings.
2. Open Bark and verify that its own test URL works.
3. Paste a newly copied complete URL into Bitpongo and test again.
4. Check Focus mode, notification summaries, volume, and network connectivity.

### Disable or remove Bark

- Turn off the notification switch and save to pause delivery without replacing the saved address.
- Select **Delete Bark settings** to remove the address. Pending notifications for that user are skipped and are not delivered after Bark is enabled again.

## Notification behavior

Bitpongo decides the Bark level, sound, and group centrally. Query parameters copied from a test URL do not override this policy.

| Event | Delivery behavior |
| --- | --- |
| Scheduler fatal error or order requiring manual review | Critical alert, alarm sound, maximum volume, and continuous ringing |
| Trade failure or sustained market outage | Time-sensitive alarm without continuous ringing |
| Skipped or delayed strategy execution | Time-sensitive notification without continuous ringing |
| Successful trade | Active notification with the `minuet` sound |
| Asset snapshot failure | Active notification |
| Service recovery or startup | Passive notification; startup notification is disabled by default |

Continuous ringing is reserved for events that require immediate operator attention. A normal trade failure does not ring continuously.

## Configure Bark for a Bitpongo deployment

This section is for server administrators. Users should configure Bark through the app instead.

### 1. Generate the credential encryption key

Generate an independent 32-byte key encoded as Base64:

```bash
openssl rand -base64 32
```

Store the output in a secret manager and inject it as `BARK_CREDENTIAL_ENCRYPTION_KEY`. Do not reuse the JWT secret and do not commit the generated value.

:::danger Preserve this key

The key encrypts user Bark Device Keys. Keep the same value across deployments and backups. Replacing or losing it prevents the server from decrypting existing user Bark settings; affected users must then save their Bark URLs again.

:::

### 2. Configure environment variables

Use the following deployment template:

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

| Variable | Purpose |
| --- | --- |
| `BARK_USER_NOTIFICATIONS_ENABLED` | Allows users to save and receive notifications through their own Bark URLs. |
| `BARK_ADMIN_PUSH_URL` | Optional administrator Bark URL for scheduler, market, infrastructure, and manual-review alerts. Leave it empty to disable administrator delivery. |
| `BARK_ALLOWED_HOSTS` | Comma-separated exact Bark host names or `host:port` entries. The default is `api.day.app`. |
| `BARK_ALLOW_PRIVATE_HOSTS` | Allows explicitly listed private-network hosts when set to `true`. Keep it `false` for the public Bark service. |
| `BARK_CREDENTIAL_ENCRYPTION_KEY` | Required 32-byte Base64 key used to encrypt user Device Keys. |
| `BARK_NOTIFY_ON_STARTUP` | Sends a passive administrator startup notification when enabled. |
| `BARK_DISPATCH_ENABLED` | Runs the outbox dispatcher that sends queued business notifications. |
| `APP_PUBLIC_URL` | Optional public Bitpongo URL attached to supported notifications. |

`BARK_ADMIN_PUSH_URL` and `BARK_CREDENTIAL_ENCRYPTION_KEY` are secrets. Supply them through deployment secrets or a protected `.env` file, not through source control or image build arguments.

### 3. Apply the Docker configuration

After changing the environment, recreate the API container:

```bash
docker compose up -d --force-recreate api
docker compose ps
docker compose logs --tail=100 api
```

The deployment fails fast when the encryption key is missing or is not a valid 32-byte Base64 value, including when user notifications are disabled.

### Self-hosted Bark server

For a public HTTPS Bark server, add its exact host name:

```dotenv
BARK_ALLOWED_HOSTS=api.day.app,bark.example.com
BARK_ALLOW_PRIVATE_HOSTS=false
```

For a reviewed private-network deployment, list the exact host or `host:port` and explicitly allow private destinations:

```dotenv
BARK_ALLOWED_HOSTS=bark.internal.example:8443
BARK_ALLOW_PRIVATE_HOSTS=true
```

Bitpongo accepts HTTPS targets only, rejects loopback, link-local, and private addresses by default, and does not follow cross-host redirects.

## Common deployment errors

### `Bark 凭据加密密钥必须是 32-byte Base64`

The encryption key is empty, malformed, or decodes to a value other than 32 bytes. Generate a new value with `openssl rand -base64 32`, store it without extra quotes or spaces, and recreate the API container.

Do not replace a working production key merely to resolve formatting in a new deployment. First recover the value already used to encrypt existing settings.

### The test works, but business notifications do not arrive

Confirm that `BARK_DISPATCH_ENABLED=true` and that the user notification switch is enabled. The test endpoint sends immediately, while trade and strategy events are delivered through the notification outbox and may be retried after a temporary Bark failure.

### A self-hosted URL is rejected

Confirm that the URL uses HTTPS, the exact host or `host:port` appears in `BARK_ALLOWED_HOSTS`, and private hosting is explicitly enabled only when the target resolves to a private address.

## Privacy and reliability

- API responses return only a masked Bark address.
- Device Keys are encrypted before storage.
- Notification failures do not roll back trades, strategies, snapshots, or reconciliation results.
- Business notifications are queued, deduplicated, and retried after temporary failures.
- Deleting an account removes its Bark setting and skips undelivered user notifications.
