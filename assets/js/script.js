var saveBtn = $('#saveBtn');
var cityToSearch = $("#city-search").val();
var addName = $("#city-name");
var addTemp = $("#temp");
var h = $("#h");
var addWind = $("#wind")
var dailyCityWeather = $('#daily-city-weather');
var savedCities = $('saved-cities');
var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";




saveBtn.on('click', function(event) {
    event.preventDefault();
    // dailyCityWeather.h3.remove();
    // dailyCityWeather.p.remove();
    getWeatherData();
});


function getWeatherData() {
    cityToSearch = $("#city-search").val();
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&units=imperial&appid=" + APIkey;
    console.log(requestUrl);
    var fiveDayRequest = "https://api.openweathermap.org/data/2.5/forecast?q= " + cityToSearch + "&appid=" + APIkey;

    /////////////////////////////////////////////////////////////CURRENT DAY REQUEST/////////////////////

    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var cityName = cityToSearch;
                    var cityTemp = data.main.temp;
                    var cityHumidity = data.main.humidity;
                    var cityWind = data.wind.speed;
                    addName.append(cityName);
                    addTemp.append(cityTemp);
                    h.append(cityHumidity);
                    addWind.append(cityWind);

                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Weather Dashboard');

        });

    ///////////////////////////////////////////////////////////////////FIVE DAY REQUEST////////////////////

    fetch(fiveDayRequest)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Weather Dashboard');
        });

};




// function displayCurrentCityDay() {

//         var cityName = cityToSearch;
//         var cityTemp = data.main.temp;
//         var cityHumidity = data.main.humidity;
//         var wind = data.wind.speed;
//         addName.append(cityName);
//         addTemp.append(cityTemp);
//         addHumidity.append(cityHumidity);
//         addWind.append(wind);  
// };


//save city 

//make cities a button

//city buttons get weather data

//city buttons show up upon refresh