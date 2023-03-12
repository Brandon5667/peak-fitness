// Variables for Weather API
var city = $("#city-search");
var state = $("#state-search");
var $trailsList = $("#list-of-trails");
var $currantWeather = $("#current-weather");
console.log(city);

// Weather API Function, Pulls Weather, and Longitude/Latitude Coordinates for the City and State Entered
var getWeather = function(city, state) {
    var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city.val() + ','+ state.val() + ',USA&appid=263899f28c1a4fdfb9c42daf32e3c285';

    console.log('get current weather');
    fetch(openWeatherUrl)
        .then (function(response){
            console.log('Got weather from api');
            return response.json();
        })
        .then (function(data){
            console.log('Weather', data);
// Variables lat / lon pull Longitude and Latitude from the Weather API data set
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat);
            console.log(lon);
// Trail API uses the lat / lon variables to pull nearby Hiking Trails and their information
            getGetTrailList(lat, lon);
                
                
        })
        
};

var getGetTrailList = function(lat, lon){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3f7720283amsh832fcd99762aa5ep13ac18jsn2a3f879a1146',
            'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
        }
    };
    
    fetch('https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat='+lat+'&lon='+lon+'&per_page=3', options)
    .then (function(response){
        console.log('got trails');
        return response.json();
    })
    .then (function(data){
        console.log('trails', data);
        var trailData = data.data
        
        // for (const property in data) {
        // console.log(property, data[property]);
        // }
        
        
        createTrailsList(trailData);

    });
}

// Event Listner for Submit Button, to pull city and state from Input field to start all associated Functions
var buttonEl = $("#submit-btn");
buttonEl.on("click", function(event){
    event.preventDefault();
    getWeather(city, state);
});

var createTrailsList = function(data){
    console.log("create trails list daTA", data)

    for (i=0; i<data.length; i++){
        
        const cardTemplate = `
                <li>
                <div class="card">
                <div>${data[i].name}</div>
                <div>${data[i].description}</div>
                <div>${data[i].city}</div>
                </div>
                </li>
    
        `
        
        $trailsList.append(cardTemplate);
        
    }
    // $trailsList.append("<li>"+ trailCity +", "+ description +", "+ name +"</li>");
    console.log("Made a trail");
}
