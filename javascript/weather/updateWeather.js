
const weatherDiv = document.getElementsByClassName('weather-info')[0];
const weatherIconNode = document.getElementsByClassName('weather-icon')[0].firstChild;
const weatherConditionNode = document.getElementsByClassName('weather-condition')[0].firstChild;
const weatherLocationNode = document.getElementsByClassName('weather-location')[0].firstChild;
const weatherCurrentNode = document.getElementsByClassName('weather-current')[0].firstChild;
const weatherHighNode = document.getElementsByClassName('weather-high')[0].children[1];
const weatherLowNode = document.getElementsByClassName('weather-low')[0].children[1];

//location should be an array containing longitude and latitude information
async function getCurrentWeatherData(localAPIKey, location) {
    const apiKey = localAPIKey;
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const units = 'imperial';
    const params = `?lat=${location[0]}&lon=${location[1]}&appid=${apiKey}&units=${units}`;
    const endpoint = `${baseUrl}${params}`;

    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log(error);
    }
}

async function updateWeather(localAPIKey, location) {
    try{
        const jsonWeather = await getCurrentWeatherData(localAPIKey, location);
        console.log(jsonWeather)
        weatherConditionNode.innerHTML = jsonWeather.weather.description;
        weatherLocationNode.innerHTML = jsonWeather.name;
        weatherCurrentNode.innerHTML = Math.floor(jsonWeather.main.temp);
        weatherHighNode.innerHTML = Math.floor(jsonWeather.main.temp_max);
        weatherLowNode.innerHTML = Math.floor(jsonWeather.main.temp_min);
    } catch (error) {
        console.log(error);
        weatherDiv.style.display = none;
    }
}

updateWeather('bb4b1b99480f1a6b642420364d6d7427', [44.9778, -93.2650]);


