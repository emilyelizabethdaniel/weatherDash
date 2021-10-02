var saveBtn = $('#saveBtn');
var addName = $("#city-name");
var addTemp = $("#temp");
var h = $("#h");
var addWind = $("#wind")
var dailyCityWeather = $('#daily-city-weather');
var savedCities = $('saved-cities');
var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";
var savedCitiesDiv = $('.saved-cities');


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
    debugger;
    var $input = $(`<input type="button" value="${getCityName()}" />`);
    $input.appendTo($("#saved-cities"));

    // var newButton = $('<button/>', {
    //     text: ,
    //     click: function() { alert(`click ${getCityName()}`); }
    // });

    // newButton.appendTo(savedCitiesDiv);
    // savedCitiesDiv.append(newButton);
    localStorage.setItem('newcityname', getCityName());

};


function getWeatherData(cityName) {

    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIkey;
    console.log(requestUrl);


    /////////////////////////////////////////////////////////////CURRENT DAY REQUEST/////////////////////

    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    // var cityTemp = data.main.temp;
                    // var cityHumidity = data.main.humidity;
                    // var cityWind = data.wind.speed;
                    // addName.append(cityName);
                    // addTemp.append("Temp: " + cityTemp);
                    // h.append("Humidity: " + cityHumidity);
                    // addWind.append("Wind: " + cityWind);

                    ////////////////////////////////////////////////////////////////////////////LAT AND LONG PULL///////////////////////
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    console.log(lat, lon);
                    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + APIkey;
                    fetch(oneCallUrl)
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
                    ///////////////////////////////////////////////////////////////////FIVE DAY REQUEST////////////////////

                    //     fetch(fiveDayRequest)
                    //         .then(function(response) {
                    //             if (response.ok) {
                    //                 response.json().then(function(data) {
                    //                     console.log(data);
                    //                 });
                    //             } else {
                    //                 alert('Error: ' + response.statusText);
                    //             }
                    //         })
                    //         .catch(function(error) {
                    //             alert('Unable to connect to Weather Dashboard');
                    //         });
                    // };

                    //save city 

                    //make cities a button

                    //city buttons get weather data

                    //city buttons show up upon refresh
                })
            }
        })
}