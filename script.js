document.addEventListener("DOMContentLoaded", () => {
    let cityInput=document.getElementById("city-input");
    let getWeatherBtn=document.getElementById("get-weather-btn");
    let weatherInfo=document.getElementById("weather-info");
    let cityNameDisplay=document.getElementById("city-name");
    let temperatureDisplay=document.getElementById("temperature");
    let descriptionDisplay=document.getElementById("description");
    let errorMessage=document.getElementById("error-message");
    const APIKEY="4c9fb832ca132aba47c8201e57681e76"

       getWeatherBtn.addEventListener('click', async () => {
        let city=cityInput.value.trim()
        if(!city)return;
          
   try{
    let weatherData= await fetchWeatherData(city);
    displayWeatherData(weatherData);
} catch(error){
showError();
    }
    });

 async function fetchWeatherData(city){
    //gets the data
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`;
    let response= await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE",response);
   
    if(!response.ok){
        throw new Error("city not found");
    }
     let data=await response.json();
     return data;
 }

function displayWeatherData(data){
console.log(data)
const {name, main, weather} = data;
cityNameDisplay.textContent= name;
temperatureDisplay.textContent = `Temperature : ${main.temp}`;
descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

//unlock the display
weatherInfo.classList.remove("hidden");
errorMessage.classList.add("hidden");
}

function showError(){
    weatherInfo.classList.add("hidden")
    errorMessage.classList.remove("hidden")
}
})