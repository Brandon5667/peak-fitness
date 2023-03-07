
var city = $("#location-field");

var getWeather = function(city) {
    var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=263899f28c1a4fdfb9c42daf32e3c285';
    console.log('get current weather');
    fetch(openWeatherUrl)
        .then (function(response){
            console.log('Got weather from api');
            return response.json();
        })
        .then (function(data){
            console.log('Weather', data);
        })
};

var buttonEl = $("#submit-btn");
buttonEl.on("click", function(event){
    event.preventDefault();
    getWeather(city.val())
});





// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '3f7720283amsh832fcd99762aa5ep13ac18jsn2a3f879a1146',
// 		'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
// 	}
// };

// fetch('https://trailapi-trailapi.p.rapidapi.com/trails/%7Bid%7D/maps/', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
