const startinputEle = document.querySelectorAll('input')[0];
const destinputEle = document.querySelectorAll('input')[1];
const planbtnEle=document.querySelector('.plan-trip');
const originresuleEle=document.querySelector('.origins');
const origin_liEle=document.querySelectorAll('.origins li');
const destresultEle=document.querySelector('.destinations');
const mytripEle=document.querySelector('.my-trip');


const mapboxToken='pk.eyJ1IjoiYXNobGV5a2VlIiwiYSI6ImNrYTV5bnU1bDAyNHYyeW9meWplZGU3MW4ifQ.douk1UHj2ibkR2-TzmCWpg';
const winnipegApi='Ih1V6TNl5DTR9QitZx';




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

