let apiKey = "f900c90c2d90a1026dcc387f04b6d627";
let input = $(".input");
let searchBtn = $(".searchBtn");

//Current city data
let cityName = $(".city");
let currentDate = $(".date");
let weatherIcon = $(".icon");
let searchedCities = $(".searchedCities");

//Current city weather details
let currentTemp = $(".temp");
let currentHumidity = $(".humidity");
let currentWind = $(".wind");
let currentUv = $(".uv");
let cardRow = $(".card-row")

// Current date 
var today = new Date();
let day = String(today.getDate()).padStart(2, '0');
let month = String(today.getMonth()).padStart(2, '0');
let year = today.getFullYear();
var today = month + '/' + day + '/' + year;

if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("Search History n/a")
}else{
    console.log("Search History found");
    renderSearchHistory();
}

//Search button
searchBtn.on("click", function(e) {
    e.preventDefault();
    if (input.val() === "") {
        alert("Enter your City");
        return;
    }
    console.log("button works")
    getWeatherInfo(input.val());
});

//Previous cities data
$(document).on("click", ".historyEntry", function() {
    console.log("History button works")
    let thisElement = $(this);
    getWeatherInfo(thisElement.text());
})

function renderSearchHistory(cityName) {
    searchedCities.empty();
    let searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for (let i = 0; i < searchHistoryArr.length; i++) {
      
        let newListItem = $("<li>").attr("class", "historyEntry");
        newListItem.text(searchHistoryArr[i]);
        searchedCities.prepend(newListItem);
    }
}

//Current city info
function renderWeatherInfo(cityName, currentTemp, currentHumidity, currentWind, weatherIcon, currentUv) {
    cityName.text(city)
    currentDate.text(`(${today})`)
    currentTemp.text(`Temperature: ${temp} °F`);
    currentHumidity.text(`Humidity: ${humidity}%`);
    currentWind.text(`Wind Speed: ${cityWindSpeed} MPH`);
    currentUv.text(`UV Index: ${uvVal}`);
    weatherIcon.attr("src", cityWeatherIcon);
}

function getWeatherInfo(cityEntered) {
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&APPID=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
    .then(function(weatherData) {
        let cityObject = {
            cityName: weatherData.name,
            currentTemp: weatherData.main.temp,
            currentHumidity: weatherData.main.humidity,
            currentWind: weatherData.wind.speed,
            currentUv: weatherData.coord,
            weatherIcon: weatherData.weather[0].icon
        }
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityObject.currentUv.lat}&lon=${cityObject.currentUv.lon}&APPID=${apiKey}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: 'GET'
    })

    .then(function(uvData) {
        if (JSON.parse(localStorage.getItem("searchHistory")) == null) {
            let searchHistoryList = [];
        
            if (searchHistoryList.indexOf(cityObject.cityName) === -1) {
                searchHistoryList.push(cityObject.cityName);
             
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryList));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObject.weatherIcon}.png`;
                renderWeatherData(cityObject.cityName, cityObject.cityTemp, cityObject.cityHumidity, cityObject.cityWindSpeed, renderedWeatherIcon, uvData.value);
                renderSearchHistory(cityObject.cityName);
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.weatherIcon}.png`;
                renderWeatherData(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, renderedWeatherIcon, uvData.value);
            }
        }else{
            let searchHistoryList = JSON.parse(localStorage.getItem("searchHistory"));
            // Keeps user from adding the same city to the searchHistory array list more than once
            if (searchHistoryList.indexOf(cityObj.cityName) === -1) {
                searchHistoryList.push(cityObj.cityName);
                // store our array of searches and save 
                localStorage.setItem("searchHistory", JSON.stringify(searchHistoryList));
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObject.weatherIcon}.png`;
                renderWeatherData(cityObject.cityName, cityObject.currentTemp, cityObject.currentHumidity, cityObject.currentWind, renderedWeatherIcon, currentUv.value);
                renderSearchHistory(cityObject.cityName);
            }else{
                console.log("City already in searchHistory. Not adding to history list")
                let renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObject.weatherIcon}.png`;
                renderWeatherData(cityObject.cityName, cityObject.currentTemp, cityObject.currentHumidity, cityObject.currentWind, renderedWeatherIcon, currentUv.value);
            }
        }
    })
        
    });
    FiveDayForecast();

    function FiveDayForecast() {
        cardRow.empty();
        let queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityEntered}&APPID=${apiKey}&units=imperial`;
        $.ajax({
            url: queryUrl,
            method: "GET"
        })
        .then(function(forecastResponse) {
            for (let i = 0; i != forecastResponse.list.length; i+=8 ) {
                let cityObject = {
                    date: forecastResponse.list[i].dt_txt,
                    icon: forecastResponse.list[i].weather[0].icon,
                    temp: forecastResponse.list[i].main.temp,
                    humidity: forecastResponse.list[i].main.humidity
                }
                let dateStr = cityObject.date;
                let trimDate = dateStr.substring(0, 10); 
                let weatherIco = `https:///openweathermap.org/img/w/${cityObject.icon}.png`;
                cardForecast(trimDate, weatherIco, cityObject.temp, cityObject.humidity);
            }
        })
    }   
}
function cardForecast(date, icon, temp, humidity) {

    let CardEl = $("<div>").attr("class", "five-day-card");
    let cardDate = $("<h3>").attr("class", "card-text");
    let cardIcon = $("<img>").attr("class", "icon");
    let cardTemp = $("<p>").attr("class", "card-text");
    let cardHumidity = $("<p>").attr("class", "card-text");

    cardRow.append(CardEl);
    cardDate.text(date);
    cardIcon.attr("src", icon);
    cardTemp.text(`Temp: ${temp} °F`);
    cardHumidity.text(`Humidity: ${humidity}%`);
    CardEl.append(cardDate, cardIcon, cardTemp, cardHumidity);
}
