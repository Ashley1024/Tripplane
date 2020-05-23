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

//1. listen input value
startinputEle.addEventListener('keydown', event => {
 // forbid the refresh of browser every return
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;

    searchOrign(startinputEle.value)
  }
});

destinputEle .addEventListener('keydown',event => {
 
  if (event.keyCode == 13) {
    event.cancelBubble=true;
    event.returnValue=false;
    searchDest(destinputEle.value);

  }
});


//2. according to input value fetch the address
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
      // add an attribute to recognize orign or destination
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


//3. insert html of fetched origin and destination address
function insertaddress(type,arr){

// recognize orign and destination, clean previou html
  if(type==='origin'){
    originresuleEle.innerHTML='';
  };
  if(type==='destination'){
    destresultEle.innerHTML='';
  };

  let html='';

  arr.forEach(element => {

    // change the address string to array and get part of it content
    const addressarr=element.place_name.split(',');
    
    html+=`

        <li data-long="${element.geometry.coordinates[0]}" data-lat="${element.geometry.coordinates[1]}" class="false">
          <div class="name">${addressarr[0]}</div>
          <div>${addressarr[1]}</div>
        </li>
    `
    
  });

  //recognize orign and destination, add html to different place
  if(type==='origin'){
    originresuleEle.innerHTML=html;
  }
  if(type==='destination'){
    destresultEle.innerHTML=html;
  }
  
};


//4. listen select content
originresuleEle.addEventListener('click',function(e){

  // find all previous seletcted origin and change the class to unselected
  const selectedOrigin=document.querySelectorAll('.origins .selected');

  selectedOrigin.forEach(element => {
    element.className=false;
  });

  // add selected class for clicked item and get the geo location
  if(e.target.closest('li').className === 'false'){
 
    e.target.closest('li').className = 'selected';
    originGeo.latitude=e.target.closest('li').getAttribute('data-lat');
    originGeo.longtitude=e.target.closest('li').getAttribute('data-long');
    
  };
})

destresultEle.addEventListener('click',function(e){
  const selecteDestinaton=document.querySelectorAll('.destinations .selected');

  selecteDestinaton.forEach(element => {
    element.className=false;
  });

  if(e.target.closest('li').className === 'false'){
   
    e.target.closest('li').className = 'selected';
    destGeo.latitude=e.target.closest('li').getAttribute('data-lat');
    destGeo.longtitude=e.target.closest('li').getAttribute('data-long');

  };
})


//5. listen click of button plan
planbtnEle.onclick=function(){

  // exclude the condion nothing input and same address
  if(originGeo.latitude!==destGeo.latitude&&originGeo.longtitude!==destGeo.longtitude){
    
    plantrip(originGeo,destGeo);
    
  }
  
};


//6. fetch data of plan trip
function plantrip(origin,destination){

  fetch(`https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/${origin.latitude},${origin.longtitude}&api-key=${winnipegApi}&destination=geo/${destination.latitude},${destination.longtitude}`)

    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Houston,  we have a problem.");
      }
    })

    .then(json => {

     plantripWrite(json.plans[0].segments);

    })

};


//7. insertHtml of plan trip
function plantripWrite(data){

  let img='';
  let innerText='';
  let html='';

  data.forEach(element => {
    
    if(element.type==='walk'){
      img="fas fa-walking";
      // two condition for walk sometimes walk to destination
      if(element.to.destination){

        innerText=`Walk for ${element.times.durations.total} minutes to destination`;
        
      } else {
     
      innerText=`Walk for ${element.times.durations.total} minutes to stop #${element.to.stop.key}-  ${element.to.stop.name} `};

      html+=`<li><i class='${img}' aria-hidden="true"></i>${innerText}</li>`;

    };

    if(element.type==='ride'){

      img="fas fa-bus";

      innerText=`Ride the ${element.route.name} for ${element.times.durations.total}`;
      html+=`<li><i class='${img}' aria-hidden="true"></i>${innerText}</li>`;
      
    };

    if(element.type==='transfer'){

      img="fas fa-ticket-alt";

      innerText=`Transfer from stop #${element.from.stop.key}- ${element.from.stop.name}$ to #${element.to.stop.key}-${element.to.stop.name}`;
      html+=`<li><i class='${img}' aria-hidden="true"></i>${innerText}</li>`;

    };
  });

  mytripEle.innerHTML=html;

};










