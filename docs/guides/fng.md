---
title: F&G strategy parameters and execution
description: Understand sentiment bands, futures position sizing, exits and completed trading rounds.
---

The F&G strategy uses Fear & Greed observations to generate **supported futures** signals. It is different from an F&G notification subscription. Futures and leverage can cause substantial loss; a stop rule is not a guaranteed fill price.

![F&G creation form with example settings](/img/guides/fng-en.png)

## Preconditions and creation

Open **List → Strategy → F&G strategy**. Select a supported exchange connection and pair; set the name and the parameters below. Check futures permissions, futures collateral and the account's required one-way position mode. The operator must also enable futures execution. A strategy can appear enabled without having a new eligible observation to trade.

## Parameters, matched to current implementation

| Field | Meaning |
| --- | --- |
| Lower limit L / interval dL | Lower trigger band is `[max(0, L − dL), L]`, endpoints included |
| Upper limit U / interval dU | Upper trigger band is `[U, min(100, U + dU)]`, endpoints included |
| Basic amount B | Base margin used by the position-sizing calculation, in USDT |
| Increase ratio r | Lower-band margin is `B × (1 + r/100)`; upper-band margin is `B × (1 − r/100)`; multiplier is bounded to 0.1–10 |
| Direction | LONG entries use lower-band signals; SHORT entries use upper-band signals |
| Leverage | Requested leverage, validated between 1 and 20; not a substitute for controlling margin |
| Trading rounds | Positive integer limit up to 10,000; counts completed position rounds, not samples or entry attempts |
| Profit target type | PERCENT compares unrealized PnL as a percentage of margin; USDT compares unrealized PnL amount |
| Profit target | Threshold for the selected target type |
| Profit drawdown % | Relative drop from the highest positive unrealized-profit percentage |
| Stop loss % | Loss percentage of margin; triggers when PnL percentage is at or below its negative threshold |
| Maximum orders | Concurrent in-flight execution states, not lifetime historical order count |
| Maximum positions | Concurrent pending/open/closing positions, including positions awaiting reconciliation |

With L=25, dL=5, U=75 and dU=5, the bands are **20–25** and **75–80**, not all values below 25 or above 75. New observations entering the same band repeatedly do not create a new entry each poll. The observation must be newer than strategy activation/update and the last processed observation; stale data is not a fresh signal.

## Drawdown: why 20% can become 19%

The formula is **peak profit % × (1 − drawdown % / 100)**. Peak=20% and drawdown=5% gives `20% × 0.95 = 19%`, not 15%. This measures a relative drop in profit, not a five-percentage-point change. The trailing rule starts after any positive peak; it does **not** wait for the profit target. Stop loss is checked first, then target, then drawdown.

![Illustrative relative drawdown and trading-round flow](/img/guides/fng-rules-en.svg)

## Orders, rounds and controls

The current gateway places market entries and reduce-only market exits, then reconciles actual fills. An acknowledgement is not a completed fill. Partial exits must be reconciled; small unsellable remainders depend on exchange rules and may require review. Do not assume a partial exit completed a round.

A completed take-profit/stop-loss/other reconciled full closure advances the completed-round count. Failed entry attempts do not. Reaching the limit stops new entries; raising the limit does not itself place a new order. Pause stops new entries, not necessarily risk management of existing positions. Review Trade history and Execution records before deletion, re-enabling or changing limits.

If nothing happens, inspect fresh observations, band transitions, direction, round/concurrency limits, execution availability and [exchange permissions](exchange.md), in that order.
