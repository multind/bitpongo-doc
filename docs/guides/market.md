---
title: Markets, candles and chart-picked prices
description: Find trading pairs, read candles and use a chart price to start an alert without placing an order.
---

![Market list with demonstration prices](/img/guides/market-en.png)

## Browse and inspect

1. Open **Markets**, search for the asset or pair, and choose the quote currency where available.
2. Open a pair's candle chart. Choose a supported interval such as 1m, 15m, 1h or 1d.
3. Check the selected pair and interval before interpreting the chart. Different intervals aggregate different periods; they are not different predictions.
4. Use the chart's price-picking action to start a [price alert](price-alerts.md). Confirm the pair and proposed target in the creation form.

## Precision and freshness

Picked prices are formatted using the pair's configured tick/price precision. A BTC pair and a low-priced token may need different decimal places. Rounding a display is not a promise that every exchange will accept an order at that exact price.

Market data can be delayed, cached or temporarily unavailable. Refresh after reconnecting; an empty chart or a load-failure notice is not a price of zero. Never interpret a screenshot's demonstration price as a live quote.

## Fear & Greed index

Open the indicator page from Markets to inspect the latest index and dated history. The sentiment label summarizes an index observation, not your account performance and not a recommendation to buy/sell. A new daily observation is different from repeatedly reading the same one. [F&G strategy rules](fng.md) explain the exact trigger bands and freshness checks.

## Expected result and common problems

- Opening the chart does not submit a trade.
- Starting an alert from the chart pre-fills inputs; you still review and save the rule.
- If a pair is missing, clear filters and search the complete supported symbol name. Exchange products are not necessarily identical across spot and futures.
- If prices load but the chart does not, retry the chart request and verify connectivity; do not recreate a live strategy as a workaround.
