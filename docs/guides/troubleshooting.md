---
title: Diagnose missing trades and notifications
description: Work from recorded evidence to separate scheduler, signal, exchange, accounting and delivery problems.
---

## A strategy says running but has no trade

![Illustrative checks: evaluation, exchange fill, records and delivery](/img/guides/controls-en.svg)

1. Verify the account, strategy ID, enabled state and **execution time zone**.
2. For DCA, compare the next scheduled time, execution records and price/buying gates. A trigger count is not a filled-order count.
3. For F&G, check whether a **new** observation entered the relevant band after activation, with the correct direction, remaining rounds and concurrency capacity.
4. Verify API permissions and the operator's current egress IP allowlist. Spot access working does not prove futures access.
5. Check the correct wallet's **free** balance and per-asset minimums/precision.
6. Inspect exchange order history before retrying anything with an uncertain result.

## Common evidence and next step

| Symptom | Check next |
| --- | --- |
| Invalid key/IP/permissions | Key validity, exact product permissions and server IP allowlist |
| Insufficient balance | Free funds in the right wallet, locked funds and total cycle allocations |
| Triggered but no order | Execution records, gates, new-signal rules and worker availability |
| Order accepted but no recorded fill | Exchange status and server reconciliation; don't blindly resubmit |
| Small remaining position | Actual partial fills, exchange minimums and review state |
| No return chart | Filled-history/snapshot availability, date range and data-loading errors |
| Displayed times differ by hours | Convert the same instant into each named zone before comparing |

## A notification did not arrive

Separate four stages: **event created → message queued → provider accepted → recipient received**. No single earlier stage proves the last one.

- App: system permission, current-device registration, account/event preferences, network and OS presentation settings.
- Email: verified recipient, spam filters and operator mail-service availability.
- Telegram: correct bound chat, Start completed, bot not blocked.
- Webhook: matching provider/URL/secret, enabled destination and channel, platform response.
- Perception: check whether the next stronger wave is intentionally waiting for the five-minute confirmation window.

## Send a useful support report

Include App version/build, safe strategy/event ID, timestamp **with zone**, the exact error and a redacted screenshot. Explain what you expected versus what happened. Do not include passwords, verification codes, API keys, service-account files or full Webhook URLs. Do not delete records to “reset” a failure before collecting evidence.
