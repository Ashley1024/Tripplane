const startinputEle = document.querySelectorAll('input')[0];
const destinputEle = document.querySelectorAll('input')[1];
const planbtnEle=document.querySelector('.plan-trip');
const originresuleEle=document.querySelector('.origins');
const origin_liEle=document.querySelectorAll('.origins li');
const destresultEle=document.querySelector('.destinations');
const mytripEle=document.querySelector('.my-trip');


const mapboxToken='pk.eyJ1IjoiYXNobGV5a2VlIiwiYSI6ImNrYTV5bnU1bDAyNHYyeW9meWplZGU3MW4ifQ.douk1UHj2ibkR2-TzmCWpg';
const winnipegApi='Ih1V6TNl5DTR9QitZx';


let originGeo={};
let destGeo={};


originresuleEle.addEventListener('click',function(e){
  let so=document.querySelectorAll('.origins .selected');

  so.forEach(element => {
    element.className=false;
  });

  if(e.target.closest('li').className === 'false'){
 
    e.target.closest('li').className = 'selected';
    originGeo.latitude=e.target.closest('li').getAttribute('data-lat');
    originGeo.longtitude=e.target.closest('li').getAttribute('data-long');
    // console.log(originGeo);
    
  };
})

destresultEle.addEventListener('click',function(e){
  let sd=document.querySelectorAll('.destinations .selected');

  sd.forEach(element => {
    element.className=false;
  });

  if(e.target.closest('li').className === 'false'){
   
    e.target.closest('li').className = 'selected';
    destGeo.latitude=e.target.closest('li').getAttribute('data-lat');
    destGeo.longtitude=e.target.closest('li').getAttribute('data-long');
    // console.log(destGeo);
  };
})

planbtnEle.onclick=function(){
  console.log(originGeo);
  console.log(destGeo);
  // exclude the condion nothing input and same address
  if(originGeo.latitude!==destGeo.latitude&&originGeo.longtitude!==destGeo.longtitude){
    plantrip(originGeo,destGeo);
    
  }
  
};





function searchOrign(query){  
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Houston,  we have a problem.");
      }
    })
    .then(json => {

    
     insertaddress('origin',json.features);
     
    })
}



function searchDest(query){
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Houston,  we have a problem.");
      }
    })
    .then(json => {

  
     insertaddress('destination',json.features);

     
    })
};


function insertaddress(type,arr){
 
  if(type==='origin'){
    originresuleEle.innerHTML='';
  }
  if(type==='destination'){
    destresultEle.innerHTML='';
  }

  let html='';
  arr.forEach(element => {
    const addressarr=element.place_name.split(',');
   
  
    html+=`
        <li data-long="${element.geometry.coordinates[0]}" data-lat="${element.geometry.coordinates[1]}" class="false">
          <div class="name">${addressarr[0]}</div>
          <div>${addressarr[1]}</div>
        </li>
    `
    
  });
  if(type==='origin'){
    originresuleEle.innerHTML=html;
  }
  if(type==='destination'){
    destresultEle.innerHTML=html;
  }
  
  
}



startinputEle.addEventListener('keydown', event => {
 
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;
    
    console.log(startinputEle.value);
    searchOrign(startinputEle.value)
  }
});


destinputEle .addEventListener('keydown',event => {
 
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;
    searchDest(destinputEle.value);
    console.log(destinputEle.value);
  }
  });

