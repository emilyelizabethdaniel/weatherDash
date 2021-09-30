var saveBtn = $('#saveBtn');
var cityToSearch = $("#city-search").val();
var addName = $("#city-name");
var addTemp = $("#temp");
var addHumidity = $("humidity");
var addWind = $("#wind")

console.log(cityToSearch);



saveBtn.on('click', function(event) {
    event.preventDefault();

    getWeatherData();
    addName.css('display', 'none');
});

function getWeatherData() {
    cityToSearch = $("#city-search").val();
    console.log(cityToSearch);
    var APIkey = "3eaff4dcea866e57c4766356b8dd3f28";
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityToSearch + "&appid=" + APIkey;
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var cityName = cityToSearch;
                    var cityTemp = data.main.temp;
                    var cityHumidity = data.main.humidity;
                    var wind = data.wind.speed;
                    addName.append(cityName);
                    addTemp.append(cityTemp);
                    addHumidity.append(cityHumidity);
                    addWind.append(wind);
                    console.log(humidity);
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