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