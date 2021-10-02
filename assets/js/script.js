var saveBtn = $('#saveBtn');
var addName = $("#city-name");
var addTemp = $("#temp");
var h = $("#h");
var addWind = $("#wind");
var addUvi = $("#uvi");
var dailyCityWeather = $('#daily-city-weather');
var savedCities = $('saved-cities');
var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";
var savedCitiesDiv = $('.saved-cities');
var dayOneInfo = $('#day-one-info');


saveBtn.on('click', function(event) {
    event.preventDefault();

    var cityName = getCityName();
    getWeatherData(cityName);
    addButtonToSavedCityDiv();
});


function getCityName() {
    return $("#city-search").val();
};

function handleSavedCityButtonClick(savedButton) {
    alert("ur mom is not a hoe, excent for in " + savedButton.value);
    getWeatherData(savedButton.value);
}

function addButtonToSavedCityDiv() {
    var newButtonHtmlString = '<input type="button" value="' + getCityName() + '" onclick=handleSavedCityButtonClick(this) />';
    var $input = $(newButtonHtmlString);
    var $input = $(`<input type="button" value="${getCityName()}" onclick=handleSavedCityButtonClick(this) />`);
    $input.appendTo($("#saved-cities"));
    localStorage.setItem('newcityname', getCityName());
};

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
        dailyCityWeather.css("background-color", "green");
    } else if (uvIndex > 3 && uvIndex <= 7) {
        dailyCityWeather.css("background-color", "yellow");
    } else if (uvIndex > 8) {
        dailyCityWeather.css("background-color", "red");
    }
};

function setFirstDayWeatherPanel(data, dayNumber) {


    var dayOneTemp = data.daily[dayNumber].temp.day;
    var dayOneHumidity = data.daily[dayNumber].humidity;
    var dayOneUv = data.daily[dayNumber].uvi;
    var dayOneWind = data.daily[dayNumber].wind_speed;
    var dayOneIcon = data.daily[dayNumber].weather[0].icon;

    var $dayOneAppendTemp = $(`<p>${dayOneTemp}</p>`);
    var $dayOneAppendUv = $(`<p>${dayOneUv}</p>`);
    var $dayOneAppendHumidity = $(`<p>${dayOneHumidity}</p>`);
    var $dayOneAppendWind = $(`<p>${dayOneWind}</p>`);
    var $dayOneAppendIcon = $(`<p>${dayOneIcon}</p>`);

    $dayOneAppendTemp.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendHumidity.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendUv.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendWind.appendTo($('#weather-info-day-' + dayNumber));
    $dayOneAppendIcon.appendTo($('#weather-info-day-' + dayNumber));
};


function getWeatherData(cityName) {

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;

    /////////////////////////////////////////////////////////////CURRENT DAY REQUEST/////////////////////

    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    ////////////////////////////////////////////////////////////////////////////LAT AND LONG PULL///////////////////////
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


                    //city buttons get weather data

                    //city buttons show up upon refresh
                })
            }
        })
}