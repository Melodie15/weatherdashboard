let APIKey = "f900c90c2d90a1026dcc387f04b6d627";
let input = $(".input");
let searchBtn = $(".searchBtn");

//Current city data
let city = $(".city");
let date = $(".date");
let icon = $(".icon");
let searchedCities = $(".searchedCities");

//Current city weather details
let temp = $(".temp");
let humidity = $(".humidity");
let wind = $(".wind");
let uv = $(".uv");
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