# Help source and capture audit — 2026-11-18

## Sources checked

All paths below are relative to the current sibling frontend/API checkout; no production queries or writes were used.

- `bitpongo-front/src/router/routes.ts`: current navigation, strategy creation, help, security/preferences routes.
- `src/views/fng/create.vue`, `src/views/list/strategy/index.vue`, `src/views/alerts/create.vue`: form fields, wizard stages, price inputs and default settings.
- `src/views/member/notification-methods/index.vue`, notification setup sheets: supported channels, controls and strengths.
- `bitpongo-api/src/main/java/com/multind/bitpongo/alerts/FngZone.java`, `FngAmountCalculator.java`, `FngStrategyService.java`, `FngExecutionService.java`: inclusive bands, margin multiplier, fresh observations/zone transitions, direction, exits, fill reconciliation and completed rounds.
- `PriceAlertEvaluator.java`: strict above/below, crossing previous values and channel-exit requirements.
- `notification/NotificationPerceptionPlan.java`, `NotificationPerceptionDelivery.java`, `NotificationPerceptionQueue.java`: five strengths, same-tier grouping, eligible selected channels, confirmation and five-minute next-wave scheduling.
- `content/ContentService.java`, migration V20 and frontend help/article detail: legacy content/fallback and language support.
- Current application configuration: `FNG_EXECUTION_ENABLED`, Webhook encryption variables. Operator credential values were never opened or copied for documentation.

## Illustrations

`scripts/capture-guides.mjs` captures the actual current H5 at local `127.0.0.1:5186`, at 390×844 CSS pixels in English and simplified Chinese. Every API route is intercepted; non-local network traffic is blocked. The script injects a dummy local session and example prices, does not log in to a real account and never submits a final create/save action. Output: 26 PNG files in `static/img/guides/`.

`scripts/generate-guide-diagrams.mjs` creates six labelled SVG concept diagrams in both languages. They explain relative profit drawdown, completed rounds, escalation and the separation between visibility/trading/delivery. They are not fabricated UI screenshots or performance evidence.

## External references checked

- Telegram official bot deep links: `https://core.telegram.org/bots/features#deep-linking`.
- Firebase official Flutter setup: `https://firebase.google.com/docs/cloud-messaging/flutter/get-started`.
- Slack official incoming webhooks: `https://docs.slack.dev/messaging/sending-messages-using-incoming-webhooks/`.
- Discord official Webhook API: `https://docs.discord.com/developers/resources/webhook`.

## Deliberate boundaries

- Do not promise exact delivery time, guaranteed stop fills, guaranteed investment returns or universal exchange/regional availability.
- Native photo permissions, OS push presentation and store-region availability still require real-device QA; screenshots are not evidence that those native paths were tested.
- Traditional Chinese keeps its original pages; new guide content uses explicit English fallback until translated.
- User guides do not expose operator secrets or describe SMS/phone as operational channels.
