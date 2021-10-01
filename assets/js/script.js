var saveBtn = $('#saveBtn');
var addName = $("#city-name");
var addTemp = $("#temp");
var h = $("#h");
var addWind = $("#wind")
var dailyCityWeather = $('#daily-city-weather');
var savedCities = $('saved-cities');
var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";
var cityButton = $('.city-buttons');


saveBtn.on('click', function(event) {
    event.preventDefault();
    var cityName = getCityName();
    getWeatherData(cityName);
    saveCityButton();
});


function getCityName() {
    return $("#city-search").val();
};

function saveCityButton() {
    cityButton.append(getCityName());
    localStorage.setItem('newcityname', getCityName());

};


function getWeatherData(cityName) {

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
    console.log(requestUrl);
    var fiveDayRequest = "https://api.openweathermap.org/data/2.5/forecast?q= " + cityName + "&appid=" + APIkey;

    /////////////////////////////////////////////////////////////CURRENT DAY REQUEST/////////////////////

    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var cityTemp = data.main.temp;
                    var cityHumidity = data.main.humidity;
                    var cityWind = data.wind.speed;
                    addName.append(cityName);
                    addTemp.append("Temp: " + cityTemp);
                    h.append("Humidity: " + cityHumidity);
                    addWind.append("Wind: " + cityWind);
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

//save city 

//make cities a button

//city buttons get weather data

//city buttons show up upon refresh