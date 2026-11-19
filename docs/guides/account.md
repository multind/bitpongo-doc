---
title: Profile, account security and time zones
description: Manage your avatar, email, password, sessions and display time without confusing them with strategy execution settings.
---

![Account security menu, demonstration](/img/guides/account-en.png)

## Profile and avatar

Open **Me → Profile**. Edit your nickname, optional country/region and introduction, then save. The saved introduction is used on Me; an empty introduction may use default text. Choose a built-in avatar in the picker, or use native image selection in supported App builds. A browser cannot provide an App-only native photo bridge. Follow the displayed file-size/type limits and avoid images containing sensitive information.

Saving profile text and uploading/selecting an avatar may be separate requests. Wait for success and re-open the profile to verify persistence. Country/region selection is profile information; it does not change exchange legal eligibility or the App Store account's storefront.

## Password and email

Open **Me → Account security** for password change, email change/binding, display time and account deletion. Login sessions are also managed there. Use your own verified email and the current verification flow. Never reuse a registration verification request for password recovery or email replacement.

For forgotten passwords: request a recovery code, check the newest email, submit that request's code and a valid new password before expiration. Re-requesting can invalidate an older code. If a correct-looking code fails, do not repeatedly guess: note the error/time and request one fresh code.

## Display time versus execution zone

Display-time settings change how history instants are shown. A strategy's saved zone controls its schedule. Changing your phone zone while travelling should not silently move a DCA schedule. Always include a zone such as `Asia/Shanghai` in a timing support report; an hour number alone is ambiguous.

## Sessions and deletion

Review sessions and revoke unfamiliar sessions where offered. Logging out of the App does not necessarily stop server-side strategies. Before deletion, inspect running strategies, exchange positions/orders, exports and notification bindings. Follow the displayed verification and consequences; account deletion is not a substitute for closing positions at the exchange.

Support should never ask you to send your password, email code, API secret or device token. For delivery setup, see [email reminders](email.md).
