---
sidebar_position: 1
title: Introduction
description: Learn what Bitpongo does and how to use its documentation.
---

# Bitpongo documentation

Bitpongo helps users configure and monitor automated recurring investment strategies connected to supported exchange accounts.

Use these illustrated English and simplified Chinese guides to set up your account, understand strategy parameters and diagnose real problems. Traditional Chinese keeps its existing pages; newly added guides fall back to English. Documentation does not provide investment advice or promise investment returns.

## Available guides

- [Start safely](./guides/quick-start.md): registration, email verification and choosing a workflow.
- [Exchange API](./guides/exchange.md), [DCA](./guides/dca.md) and [F&G](./guides/fng.md): prerequisites, parameters and actual execution rules.
- [Markets](./guides/market.md) and [five-step price alerts](./guides/price-alerts.md).
- [App push](./guides/app-push.md), [email](./guides/email.md), [Telegram](./guides/telegram.md), [Webhook](./guides/webhook.md) and [perception/confirmation](./guides/perception.md).
- [Inbox](./guides/inbox.md), [sharing](./guides/sharing.md), [account security](./guides/account.md), [troubleshooting](./guides/troubleshooting.md) and [FAQ](./guides/faq.md).
- [Operator checklist](./operations/notifications.md) is separate from ordinary user setup.
- [Bark](./notifications/bark.md) is a separate optional/legacy channel, not a requirement for native App notifications.
- Explore the application source and contribute in the [Bitpongo frontend repository](https://github.com/multind/bitpongo).

## Security principles

- Keep exchange credentials and notification keys private.
- Use restricted exchange API permissions and do not enable withdrawal permissions.
- Store deployment secrets outside source control.
- Verify strategy settings and available balances before enabling automation.
