var cityName
var stateInitial


fetch('https://api.openweathermap.org/data/2.5/weather?q='+ cityName +','+ stateInitial +' &appid=263899f28c1a4fdfb9c42daf32e3c285',{
})
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
});



// function openWeatherMap(city) {
//     let apiUrl = openWeather + city + appId;
// fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     handleWeatherData(data);
//                 });
//             } else {
//                 alert(“Error: ” + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             alert(“Unable to connect to OpenWeather”);
//         })
// };





const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3f7720283amsh832fcd99762aa5ep13ac18jsn2a3f879a1146',
		'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
	}
};

fetch('https://trailapi-trailapi.p.rapidapi.com/trails/%7Bid%7D/maps/', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

