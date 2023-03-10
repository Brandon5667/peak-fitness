// Variables for Weather API
var city = $("#city-search");
var state = $("#state-search");
console.log(city);

// Weather API Function, Pulls Weather, and Longitude/Latitude Coordinates for the City and State Entered
var getWeather = function(city, state) {
    var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city.val() + ','+ state.val() + ',USA&appid=263899f28c1a4fdfb9c42daf32e3c285&units=imperial';

    console.log('get current weather');
    fetch(openWeatherUrl)
        .then (function(response){
            console.log('Got weather from api');
            return response.json();
        })
        .then (function(data){
            console.log('Weather', data);
// Variables to pull and print data to screen
            var weatherDescription = data.weather[0].description;
            console.log('Weather Description', weatherDescription);

            var weatherIcon = data.weather[0].icon;
            console.log('Icon',weatherIcon)

            var currentHumidity = data.main.humidity;
            console.log('Humidity', currentHumidity);

            var tempMin = data.main.temp_min;
            var tempMax = data.main.temp_max;
            console.log('Temp Min ',tempMin,'Temp Max ',tempMax);

            var windSpeed = data.wind.speed;
            console.log('Wind Speed',windSpeed);
// Variables lat / lon pull Longitude and Latitude from the Weather API data set
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat);
            console.log(lon);  
        .then (function()){
            fetch(getTrailUrl)
        }
                
        })
};
// Trail API uses the lat / lon variables to pull nearby Hiking Trails and their information




var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3f7720283amsh832fcd99762aa5ep13ac18jsn2a3f879a1146',
        'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
    }
};
var trailApiCall = function(){
        var getTrailUrl = 'https://trailapi-trailapi.p.rapidapi.com/activity/?lat=' + lat + '&limit=10&lon=' + lon + '&radius=25&q-activities_activity_type_name_eq=hiking', options
        fetch(getTrailUrl)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

}




// Event Listner for Submit Button, to pull city and state from Input field to start all associated Functions
var buttonEl = $("#submit-btn");
buttonEl.on("click", function(event){
    event.preventDefault();
    getWeather(city, state);
});






