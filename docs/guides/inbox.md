---
title: Inbox, reminder logs and confirmation
description: Find triggered events, distinguish reading from confirmation and diagnose channel delivery separately.
---

![Inbox with no demonstration events](/img/guides/inbox-en.png)

## What belongs where

| View | Purpose | What it does not prove |
| --- | --- | --- |
| Inbox | User-facing triggered messages and their read/confirmation state | That every configured channel delivered successfully |
| Reminder logs | Reminder event history and the status exposed by the view | That a recipient read a message |
| Strategy execution records | Why a strategy evaluated, traded, skipped or failed | An exchange fill without matching order details |
| Trade history | Recorded executions/fills | That a device notification arrived |

## Find and confirm an event

1. Open **Alerts → Inbox**. Use the available filters/search to narrow the list.
2. Open the message and check its pair, rule/strategy and event time.
3. If confirmation is requested, explicitly confirm this event. Reading and confirmation have different meanings.
4. Load more as needed; lists are paginated, so the first screen is not necessarily the full history.

When escalating notifications are enabled, confirmation stops future eligible waves. It cannot undo external messages already sent. Deleting a message or logging out should not be used as a substitute for confirmation.

## Empty or inconsistent records

Clear filters, verify the signed-in account and refresh after reconnecting. Compare timestamps as **instants with time zones**, not just hour numbers. Device display time and a strategy's execution zone can differ. An old or filtered event may not appear in the current page.

For a support report, include App version, approximate event time with zone, affected page, safe IDs and a redacted screenshot. Never include tokens, API secrets or a full recipient webhook URL.
