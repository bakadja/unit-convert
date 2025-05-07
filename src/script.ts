/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/
const UnitToConvert = {
  MeterToFeet: 3.281,
  LiterToGallon: 0.264,
  KilogrammToPound : 2.204,
}

interface Units {
  feet: string;
  meters: string;
  gallons: string;
  liters: string;
  pounds: string;
  kilos: string;
}
const cardsEl = document.getElementById('cards-el');
// solve the error: property 'value' does not exist on type 'HTMLElement' -> as HTMLInputElement
const inputNumEl = document.getElementById('num') as HTMLInputElement;
const formEl = document.getElementById('input-form')

function stringToNumber(stringNum: string) {
  const num = Number(stringNum);
  if (typeof num !== 'number') {
    throw new Error('only number is allowed');
  }
  return num;
}

function getConvertedNum(meter: string): Units {
  try {
    const num = stringToNumber(meter);

    return {
      feet: (num * UnitToConvert.MeterToFeet).toFixed(3),
      meters: (num / UnitToConvert.MeterToFeet).toFixed(3),
      gallons: (num * UnitToConvert.LiterToGallon).toFixed(3),
      liters: (num / UnitToConvert.LiterToGallon).toFixed(3),
      pounds: (num * UnitToConvert.KilogrammToPound).toFixed(3),
      kilos: (num / UnitToConvert.KilogrammToPound).toFixed(3),
    };
  } catch (err) {
    console.error('ERROR', err);
    //SOLVE: Function lacks ending return statement and return type does not include 'undefined'
    throw(err)
  }
}

function handleSubmit(event: Event) {
  event.preventDefault();
  //console.log('submit', event);
  if (inputNumEl) {
    conversion(inputNumEl.value);
  }
}

function conversion(stringNum: string) {

  const { feet, meters, gallons, liters, pounds, kilos } = getConvertedNum(
    stringNum
  );
  if (cardsEl) {
    cardsEl.innerHTML = `
      <section class="flex-layout cards">
        <div class="flex-layout card">
          <h2>Length (Meter/Feet)</h2>
         <p id="meter-feet">${inputNumEl.value} meters = ${feet} feet | ${inputNumEl.value} feet = ${meters} meters</p>
        </div>
        <div class="flex-layout card">
          <h2>Volume (Liters/Gallons)</h2>
          <p>${inputNumEl.value} liters = ${gallons} gallons | ${inputNumEl.value} gallons = ${liters} liters</p> 
        </div>
        <div class="flex-layout card">
          <h2>Mass (Kilograms/Pounds)</h2>
          <p>${inputNumEl.value} kilos = ${pounds} pounds  | ${inputNumEl.value} pounds = ${kilos} kilos</p> 
        </div>
       </section>  
      `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
 formEl?.addEventListener("submit", handleSubmit)
}, false)
