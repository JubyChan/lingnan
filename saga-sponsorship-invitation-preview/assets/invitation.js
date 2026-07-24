(function(){
  const body=document.body;
  const gate=document.querySelector('.invitation-gate');
  const main=document.querySelector('main');
  const chooser=document.querySelector('[data-choose]');
  function enter(view){
    body.classList.add('is-reading');
    body.dataset.view=view;
    main.setAttribute('tabindex','-1');
    window.setTimeout(()=>main.focus({preventScroll:true}),0);
    window.scrollTo(0,0);
  }
  document.querySelectorAll('[data-view-choice]').forEach((link)=>link.addEventListener('click',(event)=>{event.preventDefault();enter(link.dataset.viewChoice)}));
  if(chooser) chooser.addEventListener('click',()=>{body.classList.remove('is-reading');window.scrollTo(0,0);gate.focus();});
  const hour=document.querySelector('.watch-face .hour');
  const minute=document.querySelector('.watch-face .minute');
  const second=document.querySelector('.watch-face .second');
  const display=document.querySelector('.watch-time');
  function tick(){
    const now=new Date();
    const seconds=now.getSeconds()+now.getMilliseconds()/1000;
    const minutes=now.getMinutes()+seconds/60;
    const hours=(now.getHours()%12)+minutes/60;
    if(hour) hour.style.transform=`rotate(${hours*30}deg)`;
    if(minute) minute.style.transform=`rotate(${minutes*6}deg)`;
    if(second) second.style.transform=`rotate(${seconds*6}deg)`;
    if(display) display.textContent=now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
    requestAnimationFrame(tick);
  }
  tick();
})();
