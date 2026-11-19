import assert from 'node:assert/strict';
import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
const topics=JSON.parse(await readFile('help-topics.json','utf8'));
const catalog=JSON.parse(await readFile('build/help-docs/catalog.json','utf8'));
assert.equal(catalog.version,1);
assert.equal(catalog.articles.length,topics.length*2);
let imageUses=0;
for(const topic of topics){
  for(const [locale,prefix] of [['en',''],['zh-Hans','zh-Hans/']]){
    const rows=catalog.articles.filter(a=>a.id===topic.id && a.locale===locale);
    assert.equal(rows.length,1,`${locale}/${topic.id} must have one guide`);
    assert.ok(rows[0].searchText.length>250,`${locale}/${topic.id} has substantive body content`);
    await access(`build/${prefix}docs/guides/${topic.id}/index.html`);
    async function check(block){
      if(block.tag==='img'){
        assert.ok(block.alt,`Missing image description: ${topic.id}`);
        await access(path.join('build',block.src));
        imageUses++;
      }
      for(const child of block.children??[])await check(child);
    }
    for(const block of rows[0].blocks)await check(block);
  }
}
assert.ok(imageUses>=30,'Core guides need real illustrations');
for(const prefix of ['','zh-Hans/','zh-Hant/']){
  const names=await readdir(`build/${prefix}docs`);
  assert.ok(!names.includes('superpowers'),'Internal specs/plans must not be published');
}
assert.ok(!catalog.articles.some(a=>a.id.startsWith('operations') || a.id.includes('superpowers')),'Only public user guides go into the App');
console.log(`Verified ${catalog.articles.length} guides, ${imageUses} illustrated placements, paired routes and internal-content exclusion.`);
