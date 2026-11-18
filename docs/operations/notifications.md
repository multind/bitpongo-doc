---
title: Operator checklist — trading and notification services
description: Deployment-side checks for operators; never ask end users to provide service credentials.
---

This page is for operators, not an end-user setup requirement. Keep actual secrets outside Git and screenshots. Use the backend repository's current configuration as the authority for variable names and defaults.

## Before enabling automation

- Apply database migrations and start only the intended production scheduler/worker instance. Avoid accidentally running restored copies against live exchange credentials.
- Confirm database/UTC instant handling, system clock and strategy IANA zones. Take a recoverable backup before migrations.
- Verify the new server's egress IP against exchange allowlists. Inspect spot and futures separately.
- `FNG_EXECUTION_ENABLED` defaults to false. Enabling it permits real futures execution for eligible strategies; it is not a harmless UI toggle.

## Native push

Use `FCM_ENABLED=true`, the correct `FCM_PROJECT_ID` and `GOOGLE_APPLICATION_CREDENTIALS` pointing to a service-account JSON **inside the container**. Mount a real file read-only and ensure the container's non-root runtime user can read it. The public Firebase app configuration and the private service-account key are different artifacts.

For iOS, match bundle ID/team/project, configure an APNs authentication key in Firebase and verify the native build's push entitlement and release defines. For Android, match the application ID and Firebase client; Google Play services must be available. See [Firebase's official Flutter setup](https://firebase.google.com/docs/cloud-messaging/flutter/get-started).

Verify in sequence: configuration loaded → device registration request reaches API → device row exists for the account → test event/outbox is created → provider response → actual device receipt. No database row indicates an earlier registration problem, not necessarily an FCM send failure.

## Email, Telegram and Webhook

- Configure the application's actual email sender and templates, not just recipient preferences. Keep registration, password-recovery and binding code purposes distinct.
- Telegram uses `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME` and `TELEGRAM_WEBHOOK_SECRET`. Register the HTTPS callback `/api/integrations/telegram/webhook` with the matching secret. Verify bot identity before testing binding; never expose its token in command history or logs.
- Webhook reminders use `OUTBOUND_WEBHOOK_ENABLED` and `OUTBOUND_WEBHOOK_ENCRYPTION_KEY`. Follow the implementation's required encryption-key format. Persist encryption keys across restarts or existing stored destinations may become unreadable.
- Distinguish the reminder destination's signing secret from the service's encryption key.

## Reliability checks

Inspect queue lease/retry states, invalid-device-token cleanup, provider rejections and confirmation-wave progression. A queue row marked sent can mean provider acceptance, not that the human saw the message. Redact tokens, credentials, recipient addresses and request URLs before collecting logs. Use a controlled test account; do not repeatedly trigger live trading to test notification delivery.
