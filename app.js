const startinputEle = document.querySelectorAll('input')[0];
const destinputEle = document.querySelectorAll('input')[1];
const planbtnEle=document.querySelector('.plan-trip');
const originresuleEle=document.querySelector('.origins');
const destresultEle=document.querySelector('.destinations');
const mytripEle=document.querySelector('.my-trip');


startinputEle.addEventListener('keydown', event => {
 
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;
    
    console.log(startinputEle.value);
  }
});


destinputEle .addEventListener('keydown',event => {
 
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;
    
    console.log(destinputEle.value);
  }
  });

planbtnEle.onclick=function(){
  console.log('hi');
  
}