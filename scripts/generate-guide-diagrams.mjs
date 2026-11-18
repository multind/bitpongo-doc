import {mkdir, writeFile} from 'node:fs/promises';
const escape = text => text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const diagrams = {
  'fng-rules-en': ['F&G: profit drawdown and a completed round', [
    ['Peak unrealized profit: 20%', 'Drawdown setting: 5% of that profit'],
    ['Trailing threshold: 20% × 0.95 = 19%', 'Not 15% — these are different calculations'],
    ['Entry → holding → exit → fill reconciliation', 'Only a completed closure advances the round count'],
  ], 'Illustration only. Target or stop loss may trigger first.'],
  'fng-rules-zh': ['F&G：相对盈利回撤与完整交易周期', [
    ['最高浮盈率 20%', '回撤设置：浮盈的 5%'],
    ['回撤阈值：20% × 0.95 = 19%', '不是 15%：相对比例与百分点不同'],
    ['开仓 → 持仓 → 平仓 → 核对实际成交', '完成整轮平仓后才增加已完成轮数'],
  ], '规则示意；止盈目标或止损可能先触发。'],
  'delivery-en': ['Example: escalation by strength', [
    ['First wave: email (Weak)', 'Same-strength eligible channels share one wave'],
    ['No confirmation for 5 min → Webhook', 'Then another 5 min → the next stronger wave'],
    ['Explicit confirmation stops later waves', 'Opening the App or reading is not confirmation'],
  ], 'Illustration only. Provider/network delays still apply.'],
  'delivery-zh': ['示例：按感知强度逐级推送', [
    ['第一组：邮件（弱）', '相同强度的可用渠道组成同一组'],
    ['五分钟未确认 → Webhook', '再过五分钟未确认 → 下一更强的组'],
    ['明确确认后停止后续升级', '打开 App 或标记已读，不等于确认'],
  ], '流程示意；实际投递仍受网络和平台延迟影响。'],
  'controls-en': ['Keep execution, visibility and delivery separate', [
    ['Strategy enabled → eligible evaluation', 'A timer tick or signal is not an exchange fill'],
    ['Exchange fill → recorded execution', 'Reconcile partial fills before counting a full round'],
    ['Display switch / notification preferences', 'Visibility is not trading; sending is not reading'],
  ], 'Concept diagram, not a screenshot or live trading result.'],
  'controls-zh': ['分清执行、展示与消息投递', [
    ['策略启用 → 满足条件后评估', '调度触发或产生信号，不等于交易所成交'],
    ['交易所成交 → 核对并记录', '部分成交需要核对，不能直接计作完整周期'],
    ['展示开关 / 通知偏好', '公开展示不是交易启停，发送成功不是用户已读'],
  ], '概念示意，不是界面截图或真实交易结果。'],
};
await mkdir('static/img/guides', {recursive:true});
for (const [name,[title,rows,caption]] of Object.entries(diagrams)) {
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="760" height="490" viewBox="0 0 760 490" role="img" aria-labelledby="title desc"><title id="title">${escape(title)}</title><desc id="desc">${escape(caption)}</desc><rect width="760" height="490" rx="24" fill="#fffaf5"/><g font-family="system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif"><text x="32" y="48" font-size="23" font-weight="700" fill="#244038">${escape(title)}</text>${rows.map(([first,second],i)=>`<rect x="28" y="${76+i*116}" width="704" height="94" rx="16" fill="#fff" stroke="#dce6e0"/><circle cx="58" cy="${110+i*116}" r="17" fill="#1765cf"/><text x="58" y="${116+i*116}" text-anchor="middle" fill="white" font-size="18">${i+1}</text><text x="90" y="${112+i*116}" font-size="21" font-weight="600" fill="#244038">${escape(first)}</text><text x="90" y="${146+i*116}" font-size="18" fill="#59685e">${escape(second)}</text>${i<2?`<path d="M380 ${178+i*116}v12m-5-5 5 5 5-5" stroke="#1765cf" fill="none" stroke-width="2"/>`:''}`).join('')}<text x="32" y="464" font-size="17" fill="#68766c">${escape(caption)}</text></g></svg>`;
  await writeFile(`static/img/guides/${name}.svg`,svg);
}
console.log(`Generated ${Object.keys(diagrams).length} labelled guide diagrams`);
