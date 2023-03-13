// Variables for Weather API
var citySearchForm = $("#city-search");
var state = $("#state-search");
var $trailsList = $("#list-of-trails");
var $currantWeather = $("#current-weather");

// Variables for Previous Search History and Temperature
const degreeFahrenheit = "°F";
let citySearchHistory = [];
let previousCitySearch = "";


// Weather API Function, Pulls Weather, and Longitude/Latitude Coordinates for the City and State Entered
var getWeather = function (cityValue, stateValue) {
    var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityValue + ',' + stateValue + ',USA&appid=263899f28c1a4fdfb9c42daf32e3c285';
    fetch(openWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
// Variables lat / lon pull Longitude and Latitude from the Weather API data set
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            handleWeatherData(data);

// Trail API uses the lat / lon variables to pull nearby Hiking Trails and their information
            getGetTrailList(lat, lon);

//Save City and State to local storage
            saveLocalStorage(cityValue, stateValue);

        })
};

// Variable to Get Trail list and information
var getGetTrailList = function (lat, lon) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3f7720283amsh832fcd99762aa5ep13ac18jsn2a3f879a1146',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };

    fetch('https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=' + lat + '&lon=' + lon + '&per_page=3', options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var trailData = data.data
            createTrailsList(trailData);
        });
}

// Function to print Weather Data to the Screen
function handleWeatherData(weatherData) {
    $("#today-city").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
    $("#today-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + ` ` + degreeFahrenheit);
    $("#today-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + " MPH");
    $("#today-humid").text("Humidity: " + weatherData.main.humidity + "%");
}

// Event Listner for Submit Button, to pull city and state from Input field to start all associated Functions
var buttonEl = $("#submit-btn");
buttonEl.on("click", function (event) {
    event.preventDefault();
    var cityValue = citySearchForm.val();
    var stateValue = state.val();
    getWeather(cityValue, stateValue);
});
// Creation and Clearing of Trail List
var createTrailsList = function (data) {   
    $trailsList.html("");
    for (i = 0; i < data.length; i++) {
        const cardTemplate = `
                <li>
                <div class="card">
                <div>${data[i].name}</div>
                <div>${data[i].description}</div>
                <div>${data[i].city}</div>
                </div>
                </li>`
        $trailsList.append(cardTemplate);
    }
}

// Function to Save Search to Local Storage
function saveLocalStorage(cityName, stateName) {
    cityAndState = cityName + "," + stateName;
    previousCitySearch = cityAndState
    if (!citySearchHistory.includes(cityAndState)) {
        citySearchHistory.push(cityAndState);
    }
    localStorage.setItem("weatherSearchHistory", JSON.stringify(citySearchHistory));
    localStorage.setItem("lastCitySearched", JSON.stringify(previousCitySearch));
    loadLocalStorage();
};

//Function to Load Local Storage
function loadLocalStorage() {
    citySearchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
    previousCitySearch = JSON.parse(localStorage.getItem("lastCitySearched"));
    if (!citySearchHistory) {
        citySearchHistory = [];
    }

    if (!previousCitySearch) {
        previousCitySearch = "";
    }

//Empty to remove duplicates 
    $("#searchDropDown").empty();
    for (i = 0; i < citySearchHistory.length; i++) {
        $("#searchDropDown").append("<li class='dropdown-item'><a href='#' id='" + citySearchHistory[i] + "'>" + citySearchHistory[i] + "</a> </li>");
    }
};

//Local Storage Loading Code
loadLocalStorage();
if (previousCitySearch != "") {
    var selectedCity = "";
    var selectedState = "";
    var array = previousCitySearch.split(",");
    selectedCity = array[0];
    selectedState = array[1];
    getWeather(selectedCity, selectedState);
}

// Drop Down Menu for Previous Search
var trigger = document.querySelector(".dropdown-trigger");
trigger.addEventListener("click", function (event) {
    document.querySelector(".dropdown-items").classList.toggle("is-open");
});

$("#searchDropDown").on("click", function (event) {
    let selectedOption = $(event.target).closest("a").attr("id");
    var array = selectedOption.split(",");
    selectedCity = array[0];
    selectedState = array[1];
    citySearchForm.text("");
    getWeather(selectedCity, selectedState);
});

