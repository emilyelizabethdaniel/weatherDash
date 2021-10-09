//---------------------------------------------------------------------//
//global variables//
//---------------------------------------------------------------------//

var saveBtn = $('#saveBtn');
var addName = $("#city-name");
var addTemp = $("#temp");
var h = $("#h");
var addWind = $("#wind");
var addUvi = $("#uvi");
var dailyCityWeather = $('#daily-city-weather');
var savedCities = $('#saved-cities');
var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";
var savedCitiesDiv = $('.saved-cities');
var dayOneInfo = $('#day-one-info');

//---------------------------------------------------------------------//
//saving local variable as global variable//
//---------------------------------------------------------------------//

function getCityName() {
    return $("#city-search").val();
};

//---------------------------------------------------------------------//
//function to clear all info before repopulating
//---------------------------------------------------------------------//

function clearData() {
    addName.empty();
    addTemp.empty();
    h.empty();
    addWind.empty();
    addUvi.empty();
    $('#weather-info-day-0').empty();
    $('#weather-info-day-1').empty();
    $('#weather-info-day-2').empty();
    $('#weather-info-day-3').empty();
    $('#weather-info-day-4').empty();
};

//---------------------------------------------------------------------//
//search city button click, brings up weather data//
//---------------------------------------------------------------------//

saveBtn.on('click', function(event) {
    event.preventDefault();
    clearData();
    var cityName = getCityName();
    getWeatherData(cityName);
    addButtonToSavedCityDiv();
});

//---------------------------------------------------------------------//
//when saved ciy button is clicked, it brings up the weather data//
//---------------------------------------------------------------------//

function handleSavedCityButtonClick(savedButton) {
    alert("ur mom is not a hoe, except for in " + savedButton.value);
    clearData();
    getWeatherData(savedButton.value);
};

//---------------------------------------------------------------------//
//makes the button of the city name, and saves to local storage//
//---------------------------------------------------------------------//

function addButtonToSavedCityDiv() {
    var $input = $(`<input type="button" value="${getCityName()}" onclick=handleSavedCityButtonClick(this) />`);
    $input.addClass("city-button-styling");
    $input.appendTo($("#saved-cities"));
    var allCities = [];
    allCities.push($input.val());
    localStorage.setItem('newcityname', allCities);
};

//---------------------------------------------------------------------//
//gets data from local storage//
//---------------------------------------------------------------------//
function getStoredCityNames() {
    var getCityButton = localStorage.getItem('newcityname', allCities);
    var $showCityButton = $(`<input type="button" value="${getCityButton}" onclick=handleSavedCityButtonClick(this) />`);
    $showCityButton.appendTo($("#saved-cities"));
};

//---------------------------------------------------------------------//
//displays the weather value for current city changes uv color//
//---------------------------------------------------------------------//

function setCurrentWeatherPanel(data, cityName) {
    var cityTemp = data.current.temp;
    var cityHumidity = data.current.humidity;
    var cityWind = data.current.wind_speed;
    var uvIndex = data.current.uvi;
    addName.append(cityName);
    addTemp.append("Temp: " + cityTemp);
    h.append("Humidity: " + cityHumidity);
    addWind.append("Wind: " + cityWind);
    addUvi.append("UV Index: " + uvIndex);

    if (uvIndex <= 2) {
        dailyCityWeather.css("background-color", "#DDFB96");
        dailyCityWeather.css("border", "1px solid green");
        // alert("UV is low")
    } else if (uvIndex > 3 && uvIndex <= 7) {
        dailyCityWeather.css("background-color", "#FBEA96");
        dailyCityWeather.css("border", "1px solid yellow");
        // alert("UV index is Moderate")
    } else if (uvIndex > 7) {
        dailyCityWeather.css("background-color", "#F37070");
        dailyCityWeather.css("border", "1px solid red");
        // alert("UV index High!");
    }
};

//---------------------------------------------------------------------//
//displays the 5 days when called with number//
//---------------------------------------------------------------------//

function setFirstDayWeatherPanel(data, dayNumber) {

    var dayOneTemp = data.daily[dayNumber].temp.day;
    var dayOneHumidity = data.daily[dayNumber].humidity;
    var dayOneUv = data.daily[dayNumber].uvi;
    var dayOneWind = data.daily[dayNumber].wind_speed;
    var dayOneIcon = data.daily[dayNumber].weather[0].icon;

    var $dayOneAppendTemp = $(`<p>Temp: ${dayOneTemp}</p>`);
    var $dayOneAppendUv = $(`<p>UV: ${dayOneUv}</p>`);
    var $dayOneAppendHumidity = $(`<p>Humidity: ${dayOneHumidity}</p>`);
    var $dayOneAppendWind = $(`<p>Wind Speed: ${dayOneWind}</p>`);
    var iconurl = "http://openweathermap.org/img/w/" + dayOneIcon + ".png";


    $('#weather-info-day-' + dayNumber).prepend($('<img>', { id: 'theImg', src: iconurl }))
    $dayOneAppendTemp.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendHumidity.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendUv.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendWind.appendTo($('#weather-info-day-' + dayNumber));
    $('#wicon').attr('src', iconurl);
};

//---------------------------------------------------------------------//
//doing all the fetching of data//
//---------------------------------------------------------------------//

function getWeatherData(cityName) {

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;

    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    console.log(lat, lon);
                    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&units=imperial&appid=" + APIkey;

                    fetch(oneCallUrl)
                        .then(function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {

                                    setCurrentWeatherPanel(data, cityName);
                                    setFirstDayWeatherPanel(data, 0);
                                    setFirstDayWeatherPanel(data, 1);
                                    setFirstDayWeatherPanel(data, 2);
                                    setFirstDayWeatherPanel(data, 3);
                                    setFirstDayWeatherPanel(data, 4);
                                });

                            } else {
                                alert('Error: ' + response.statusText);
                            }
                        })
                        .catch(function(error) {
                            alert('Unable to connect to Weather Dashboard');

                        });
                })
            }
        })
};