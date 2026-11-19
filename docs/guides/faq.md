---
title: Frequently asked questions
description: Direct answers about trading, strategy controls, notification confirmation and app updates.
---

## Does a price/F&G alert automatically trade?

No. Notification rules and F&G subscriptions are different from executable DCA/F&G strategies. See [price alerts](price-alerts.md) and [F&G trading](fng.md).

## Does logging out stop my strategy?

Do not assume so. Server-side automation is independent of whether the App is open. Use the strategy's actual controls and inspect exchange positions before making changes.

## Does pausing sell my assets or close all futures positions?

No. DCA pause does not reverse filled spot purchases. F&G pause prevents new entries; existing position management has its own rules. Read the confirmation and [strategy guide](fng.md).

## Why do I see no trade even though the trigger count increased?

Evaluation, eligibility, order submission and fill are separate stages. Check execution records and exchange orders, then [troubleshoot](troubleshooting.md).

## What does “one trading round” mean for F&G?

A reconciled complete position cycle, not a timer tick or entry attempt. Partial exits and failed entries do not automatically count as completed rounds.

## Why do notifications arrive through different channels later?

With [confirmation escalation](perception.md), weaker eligible channels go first; the next stronger wave follows after five minutes without explicit confirmation. Opening the App alone is not confirmation.

## Must I install Bark?

Not for native App push, email, Telegram or supported Webhook reminders. Bark is a separate optional/legacy integration where still exposed by a deployment, not a requirement for all users.

## Does updating the website update every native feature?

No. H5 content can update independently, but native push, image selection and store-update checks require compatible App builds. Use **Me → About → Check for updates** in a supported App and follow the App Store/Google Play flow. Store availability can vary by account region and release track.

## Can support ask for my exchange key or verification code?

No. Send only safe IDs, versions, timestamps with zones and redacted errors. [Account security](account.md) explains the boundaries.
