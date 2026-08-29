---
sidebar_position: 1
title: 簡介
description: 瞭解 Bitpongo 的用途以及如何使用本專案文件。
---

# Bitpongo 文件

Bitpongo 協助使用者設定並監控與支援交易所帳戶連接的自動化定期投資策略。

本文件著重說明安全設定、通知行為、系統運作預期和部署設定。它不提供投資建議，也不承諾任何投資報酬。

## 現有指南

- [設定 Bark 通知](./notifications/bark.md)，接收交易結果、策略事件和系統警示。
- 在 [Bitpongo 文件儲存庫](https://github.com/multind/bitpongo-doc)中查看原始碼或提出文件改善建議。

## 安全原則

- 妥善保管交易所憑證和通知金鑰。
- 使用權限受限的交易所 API，切勿啟用提款權限。
- 將部署密鑰存放在原始碼之外。
- 啟用自動化前，檢查策略設定和可用餘額。
