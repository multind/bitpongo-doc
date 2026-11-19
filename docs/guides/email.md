---
title: Choose an email reminder recipient
description: Use your verified account email or specify a different recipient, and understand verification and delivery.
---

![Email setup is accessed from Notification methods](/img/guides/channels-en.png)

## Configure the recipient

1. Open **Me → Notification methods** and select the email recipient/setup action.
2. Review the account email displayed in the dialog.
3. Choose the default account email, or the custom-recipient option and enter the address that should receive reminders.
4. Follow any verification required by the dialog before saving. Entering an address alone is not proof that you own it.
5. Save the recipient and enable the email channel; save the overall notification settings as well if the page asks you to.

If the account has no verified default email, follow the **Bind email** action into the binding/verification flow first. This applies to future phone-number and third-party accounts too: a provider-supplied address is not automatically a verified Bitpongo recipient in every login flow.

## How to verify it works

Use a test action if provided, then check the actual destination mailbox and spam folder. Confirm that a custom address is not accidentally still set when you intended to use your login email. Changing the reminder recipient is not necessarily the same operation as changing the account login email.

## Common problems

- **Not available/not connected:** a recipient address is not enough; the operator must configure the mail delivery service.
- **Verification code rejected:** use the newest request and its purpose; see [account recovery](account.md).
- **Sent but not received:** inspect spam, filtering, mailbox storage and address spelling; allow time for mail provider processing.
- **Escalation:** if email has the weakest strength, it can be the first wave rather than being sent together with all other channels. See [perception settings](perception.md).

Never provide your mailbox password, verification code or server email credentials in support screenshots.
