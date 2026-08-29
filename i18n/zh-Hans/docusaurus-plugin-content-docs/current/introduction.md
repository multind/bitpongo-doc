---
sidebar_position: 1
title: 简介
description: 了解 Bitpongo 的用途以及如何使用本项目文档。
---

# Bitpongo 文档

Bitpongo 帮助用户配置并监控与所支持交易所账户连接的自动化定期投资策略。

本文档重点介绍安全配置、通知行为、运行预期和部署配置。它不提供投资建议，也不承诺任何投资回报。

## 现有指南

- [配置 Bark 通知](./notifications/bark.md)，接收交易结果、策略事件和运行告警。
- 在 [Bitpongo 文档仓库](https://github.com/multind/bitpongo-doc)中查看源码或提出文档改进建议。

## 安全原则

- 妥善保管交易所凭据和通知密钥。
- 使用权限受限的交易所 API，切勿启用提现权限。
- 将部署密钥存放在源代码之外。
- 启用自动化前，检查策略设置和可用余额。
