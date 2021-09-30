var saveBtn = $('#saveBtn');
var cityToSearch = $("#city-search").val();

console.log(cityToSearch);

saveBtn.on('click', function(event) {
    event.preventDefault();
    getWeatherData();
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
                    console.log(data, cityToSearch);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Weather Dashboard');
        });
}