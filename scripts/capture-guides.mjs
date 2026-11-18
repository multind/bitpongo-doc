// Captures the real H5 UI against intercepted demonstration responses only.
// Run a LOCAL H5 server first. This script must never target production.
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || '/Users/zhangcong/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.H5_PREVIEW_URL || 'http://127.0.0.1:5186';
if (!['127.0.0.1', 'localhost'].includes(new URL(base).hostname)) throw Error('Only local preview servers are allowed');
const output = path.resolve('static/img/guides');
await mkdir(output, {recursive: true});
const browser = await chromium.launch({executablePath: process.env.CHROME_EXECUTABLE || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true});
const enabled = {enabled: true, available: true, level: 'Weak', sequence: 1};
const channels = Object.fromEntries(['bitpongo','email','telegram','message','call','dingding','feishu'].map(key => [key, {...enabled, enabled: ['bitpongo','email','telegram'].includes(key)}]));
channels.confirmationEnabled = true;
const symbols = [{symbol:'BTCUSDT',baseAsset:'BTC',quoteAsset:'USDT',priceTickSize:'0.01'},{symbol:'ETHUSDT',baseAsset:'ETH',quoteAsset:'USDT',priceTickSize:'0.01'}];
const exchanges = [{id:1,name:'Demo connection',exchange:'binance',type:'binance',createdAt:'2026-11-18T00:00:00Z'}];
const emptyPage = {items:[],hasMore:false,page:0,size:20,total:0};
function mock(url) {
  if (url.includes('/alerts/capabilities')) return {perAlertChannels:true};
  if (url.includes('/notifications/webhook')) return {available:true,enabled:true,items:[]};
  if (url.includes('/market/symbols')) return symbols;
  if (url.includes('/market/tickers')) return symbols.map(s=>({symbol:s.symbol,lastPrice:s.symbol==='BTCUSDT'?'65000.00':'3200.00',changePercent:'1.25',volume:'1000000',updatedAt:'2026-11-18T00:00:00Z'}));
  if (url.includes('/market/indicators')) return {points:[{value:35,classification:'Fear',observedAt:'2026-11-18T00:00:00Z'}],fetchedAt:'2026-11-18T00:00:00Z',stale:false,sourceUrl:'https://alternative.me/crypto/fear-and-greed-index/'};
  if (url.includes('/exchanges/list')) return exchanges;
  if (url.includes('/notifications/channels/strengths')) return {email:'WEAK',bitpongo:'MODERATE_WEAK',telegram:'MODERATE',webhook:'MODERATE_STRONG'};
  if (url.includes('/notifications/channels')) return channels;
  if (url.includes('/notifications/email')) return {available:true,enabled:true,mode:'ACCOUNT',accountEmail:'demo@example.com',recipientEmail:'demo@example.com',hasVerifiedEmail:true};
  if (url.includes('/notifications/telegram')) return {available:true,enabled:true,bound:false,botUsername:'BitpongoDemoBot'};
  if (url.includes('/notifications/push')) return {available:true,enabled:true,deviceCount:0,tradeSucceeded:true,tradeFailed:true,planAlerts:true,systemAlerts:true,soundEnabled:true,locale:'en-us',timezone:'Asia/Shanghai'};
  if (url.includes('/users/profile/details')) return {name:'Demo user',country:'SG',introduction:'Learning Bitpongo step by step',upDownColor:'GREEN_UP'};
  if (url.includes('/users/timezone')) return {mode:'DEVICE',timezone:'Asia/Shanghai',deviceTimezone:'Asia/Shanghai'};
  if (/webhook|sessions|history|avatars/.test(url)) return [];
  if (url.includes('/users/profile')) return {id:900001,name:'Demo user',email:'demo@example.com'};
  return emptyPage;
}
try {
  for (const [locale, suffix] of [['en-us','en'],['zh-cn','zh']]) {
    const context = await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1.5,locale:locale==='zh-cn'?'zh-CN':'en-US'});
    await context.addInitScript(({locale})=>{
      localStorage.setItem('lang',locale);
      localStorage.setItem('user',JSON.stringify({token:'documentation-demo-only',info:{id:900001,name:'Demo user',email:'demo@example.com'}}));
    }, {locale});
    await context.route('**/*', async route=>{
      const url=new URL(route.request().url());
      if (url.pathname.startsWith('/api/')) return route.fulfill({contentType:'application/json',body:JSON.stringify({code:200,message:'ok',data:mock(url.pathname)})});
      if (url.origin !== new URL(base).origin && !url.protocol.startsWith('data')) return route.abort();
      return route.continue();
    });
    const page=await context.newPage();
    async function save(name) {
      await page.waitForTimeout(500);
      await page.evaluate(() => { document.getElementById('eruda')?.remove(); });
      await page.addStyleTag({content:'.eruda-container, #eruda, [class*="eruda"] {display:none!important}'});
      await page.screenshot({path:path.join(output,`${name}-${suffix}.png`),fullPage:true});
      console.log(`Captured ${name}-${suffix}`);
    }
    for (const [name, route] of [['login','/login'],['exchange','/member/exchange/create'],['dca','/create'],['fng','/fng/create'],['channels','/member/notification-methods'],['inbox','/alerts/events'],['account','/member/security'],['market','/market']]) {
      await page.goto(base+route,{waitUntil:'networkidle'});
      if (name==='fng') { await page.locator('[data-test="fng-name"]').fill(locale==='zh-cn'?'示例 F&G 策略':'Demo F&G strategy'); await page.locator('[data-test="fng-basic-amount"]').fill('20'); }
      await save(name);
    }
    await page.goto(base+'/alerts/create?symbol=BTCUSDT&price=65000',{waitUntil:'networkidle'});
    await page.locator('#alert-name').fill(locale==='zh-cn'?'BTC 价格提醒':'BTC price alert');
    // The query sets symbol/price through the normal UI; submit only advances, never saves.
    for(let step=1;step<=5;step++) {
      await save(`alert-step-${step}`);
      if(step<5) {
        if(step===2) await page.locator('#alert-target').fill('65000.00');
        await page.locator('[data-test="wizard-next"]').click();
      }
    }
    await context.close();
  }
} finally { await browser.close(); }
