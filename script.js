let APIKey = "f900c90c2d90a1026dcc387f04b6d627";
let input = $(".input");
let searchBtn = $(".searchBtn");

//Current city data
let city = $(".city");
let date = $(".date");
let icon = $(".icon");
let searchedCities = $(".searchedCitties");

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





