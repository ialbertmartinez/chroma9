// DOM Elements
const modeSelectEl = document.getElementById('mode');
const getColorsBtn = document.getElementById('get-colors-btn');
const infoDisplay = document.getElementById('info-display');
const palette = document.getElementById('palette');


getColorsBtn.addEventListener("click", fetchData);

async function fetchData(e) {
   const zipCodeEl = document.getElementById('zip');
   let uZip = zipCodeEl.value.trim();  
   let mode = modeSelectEl.value;
   
   if ((!/^\d{5}$/.test(uZip)) || !uZip || uZip === null) {
      displayMessage('Please enter a valid 5-digit zip code.', 'error');
      return;
   }

   let url = `https://api.zippopotam.us/us/${uZip}`; // build endpoint url
   
   try {
      // get lat/lon coordinates from zippopotam API
      const geoResponse = await fetch(url);
   if (!geoResponse.ok) { throw new Error(`Error: ${geoResponse.status}\nPlease enter a zip code and select a color mode`); }
      const geoData = await geoResponse.json();

      const lat = geoData.places[0].latitude;
      const lon = geoData.places[0].longitude;
      const city = geoData.places[0]['place name'];
      console.log("geoData: ", geoData);

      // OPENWEATHER API CALL

      url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m&temperature_unit=fahrenheit`; 
      let weatherResponse = await fetch(url);
      if (!weatherResponse.ok) { throw new Error(`Error: ${weatherResponse.status}\nPlease enter a zip code and select a color mode`); }
      let weatherData = await weatherResponse.json();

      console.log("weatherData: ", weatherData);
      console.log(`Current temp in ${city}: ${weatherData.current.temperature_2m}°F`);
      let weatherCode = weatherData.current.weather_code;
      let condition = getWeatherCondition(weatherCode);
      console.log(weatherCode);
      let swatch = getColor(condition).replace('#', '');
      

      url = `https://www.thecolorapi.com/scheme?hex=${swatch}&mode=${mode}&count=5`;

      // CALL TO THE COLOR API
      let colorResponse = await fetch(url);
      if (!colorResponse.ok) { throw new Error(`Error: ${colorResponse.status}\nAn issue with fetching your color palette.`); }
      let colorData = await colorResponse.json();
      weatherData.mode = mode;
      // console.log("colorData: ", colorData);
      // console.log('Weather Condition:', weatherCondition);
      // console.log('Swatch Color: ', swatch);
      // console.log('Final Color Palette:', colorData);

      // populate the DOM
      displayMessage(`Showing ${weatherData.mode} palette for: ${condition} skies in ${city}`, "success");
      displayPalette(colorData);
      
      // reset input fields
      zipCodeEl.value = ""; // input reset
      modeSelectEl.selectedIndex = 0; // select reset

   } catch (error) {
      console.error(`Error in fetching data:\t${error.message}`);
      displayMessage(`Error message: ${error.message}`);
   }
}

function getWeatherCondition(weatherCode) {
   let condition = '';
   if(weatherCode > 90) { condition = 'Thunderstorm';}
   else if(weatherCode > 70) { condition = 'Snow'; }
   else if(weatherCode > 50) { condition = 'Rain'; }
   else if(weatherCode > 40) { condition = 'Foggy';}
   else if(weatherCode > 30) { condition = 'Overcast';}
   else if(weatherCode > 20) { condition = 'Cloudy';}
   else if(weatherCode >= 0) { condition = 'Clear';}

   return condition;
}

 function getColor(condition) {  
   switch (condition) {
      case "Snow": return "#f3f8ff";
      case "Clear": return "#f8db65";
      case "Cloudy": return "#58707e";
      case "Rain": return "#3dadad";
      case "Thunderstorm": return "#070b66";
      case 'Foggy':
      case 'Overcast':
      case 'Atmosphere' : return '#63df7c';
      default: return '#85c13c';
   };
}

function displayPalette(colorData) {
   const palette = document.getElementById('palette');
   palette.innerHTML = ""; // Clear previous results

   // Map through colors and create HTML string
   const htmlContent = colorData.colors.map((color, i) => `
      <div class="col-sm card mb-3 color-card" id="color${i}" style="border-top-color: ${color.hex.value}">
         <div class="col-sm swatch py-2 mb-2" style="background: ${color.hex.value}; color: ${color.contrast.value}; display: block;">
            ${color.name.value}
         </div>
         <ul class="list-group list-group-flush text-start" style="color: #323232;">
            <li class="list-group-item color-card-prop"><p>${color.hex.value}</p></li>
            <li class="list-group-item color-card-prop"><p>${color.rgb.value}</p></li>
            <li class="list-group-item color-card-prop"><p>${color.cmyk.value}</p></li>
         </ul>
      </div>
   `).join('');

   palette.innerHTML = htmlContent;
}

function displayMessage(message, type) {
   infoDisplay.style.display = "block"
   infoDisplay.innerHTML = "";
   infoDisplay.textContent = message;
   infoDisplay.className = `message ${type} text-${type}`;
   console.log(`${message} | ${type}`);
   return message + " " + type;
}