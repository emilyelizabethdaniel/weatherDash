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

function addButtonToSavedCityDiv() {
    var $input = $(`<input type="button" value="${getCityName()}" />`);
    $input.appendTo($("#saved-cities"));
    localStorage.setItem('newcityname', getCityName());

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
                                    console.log(data);
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


                                    var dayOneTemp = data.daily[0].temp.day;
                                    var dayOneHumidity = data.daily[0].humidity;
                                    var dayOneUv = data.daily[0].uvi;
                                    var dayOneWind = data.daily[0].wind_speed;
                                    var dayOneIcon = data.daily[0].weather[0].icon;

                                    var $dayOneAppendTemp = $(`<p>${dayOneTemp}</p>`);
                                    $dayOneAppendTemp.appendTo($('#day-one-info'));

                                    var $dayOneAppendHumidity = $(`<p>${dayOneHumidity}</p>`);
                                    $dayOneAppendHumidity.appendTo($('#day-one-info'));

                                    var $dayOneAppendUv = $(`<p>${dayOneUv}</p>`);
                                    $dayOneAppendUv.appendTo($('#day-one-info'));

                                    var $dayOneAppendWind = $(`<p>${dayOneWind}</p>`);
                                    $dayOneAppendWind.appendTo($('#day-one-info'));

                                    var $dayOneAppendIcon = $(`<p>${dayOneIcon}</p>`);
                                    $dayOneAppendIcon.appendTo($('#day-one-info'));
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