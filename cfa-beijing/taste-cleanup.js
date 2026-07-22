document.addEventListener('DOMContentLoaded',()=>{
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{node.nodeValue=node.nodeValue.replace(/[–—]/g,'-')});
  if(location.pathname.includes('cfa-shenzhen')){
    const replacements=new Map([
      ['24张 × 699元/张，按季军组实际人数采购','27张 × 699元/张，按季军组上限人数测算'],
      ['16,776','18,873'],
      ['3,324','1,227'],
      ['Wind年卡按24张测算','Wind年卡按27张测算']
    ]);
    const bodyWalker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    while(bodyWalker.nextNode()){
      let value=bodyWalker.currentNode.nodeValue;
      replacements.forEach((to,from)=>{value=value.replaceAll(from,to)});
      bodyWalker.currentNode.nodeValue=value;
    }
    const budgetSection=document.querySelector('#budget');
    if(budgetSection){
      const budgetNote=document.createElement('p');
      budgetNote.className='note';
      budgetNote.innerHTML='<strong>预算说明：</strong>以上为赛事初步预算，具体支出以活动实际执行情况为准。';
      budgetSection.appendChild(budgetNote);
    }
    const requestBox=document.querySelector('#request .ask');
    if(requestBox){
      const fundNote=document.createElement('p');
      fundNote.className='fund-note';
      fundNote.innerHTML='<strong>资金管理说明：</strong>赞助资金将专款专用，按照赛事实际发生费用实报实销，相关支出可提供对应明细及凭证。';
      requestBox.appendChild(fundNote);
    }
  }
});
