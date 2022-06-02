
const weatherDiv = document.getElementsByClassName('weather-info')[0];
const weatherIconNode = document.getElementsByClassName('weather-icon')[0].children[0];
const weatherConditionNode = document.getElementsByClassName('weather-condition')[0].children[0];
const weatherLocationNode = document.getElementsByClassName('weather-location')[0].children[0];
const weatherCurrentNode = document.getElementsByClassName('weather-current')[0].children[0];
const weatherHighNode = document.getElementsByClassName('weather-high')[0].children[1];
const weatherLowNode = document.getElementsByClassName('weather-low')[0].children[1];


function titleCase(string) {
    const words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        let newWord = words[i][0].toUpperCase();
        newWord += words[i].slice(1);
        words[i] = newWord;
    }
    return words.join(' ');
}

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

function getWeatherIcon(id) {
    const baseIconUrl = 'http://openweathermap.org/img/wn'
    let icon = '';
    const extension = '.png'
    if (id >= 200 && id <= 232) {
        icon = '11d';
    } else if (id >= 300 && id <= 321) {
        icon = '09d';
    } else if (id >= 500 && id <= 504) {
        icon = '10d';
    } else if (id === 511) {
        icon = '13d';
    } else if (id >= 520 && id <= 531) {
        icon = '09d';
    } else if (id >= 600 && id <= 622) {
        icon = '13d';
    } else if (id >= 701 && id <= 781) {
        icon = '50d';
    } else if (id === 800) {
        icon = '01d';
    } else if (id === 801) {
        icon = '02d';
    } else if (id === 802) {
        icon = '03d';
    } else if (id === 803 || id === 804) {
        icon = '04d';
    }
    return `${baseIconUrl}/${icon}${extension}`;
};

async function updateWeather(localAPIKey, location) {
    try{
        const jsonWeather = await getCurrentWeatherData(localAPIKey, location);

        const conditionID = jsonWeather.weather[0].id;
        const iconSrc = getWeatherIcon(conditionID);
        weatherIconNode.src = iconSrc;

        let weatherDescription = jsonWeather.weather[0].description;
        weatherDescription = titleCase(weatherDescription);
        weatherConditionNode.innerHTML = weatherDescription;

        weatherLocationNode.innerHTML = jsonWeather.name;
        weatherCurrentNode.innerHTML = Math.floor(jsonWeather.main.temp);
        weatherHighNode.innerHTML = Math.floor(jsonWeather.main.temp_max);
        weatherLowNode.innerHTML = Math.floor(jsonWeather.main.temp_min);
    } catch (error) {
        console.log(error);
        weatherDiv.style.opacity = 0;
    }
}

updateWeather('bb4b1b99480f1a6b642420364d6d7427', [44.9778, -93.2650]);
