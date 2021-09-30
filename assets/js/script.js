var saveBtn = $('#saveBtn');
var cityToSearch = $("#city-search").val();
// var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityToSearch + '&appid=3eaff4dcea866e57c4766356b8dd3f28';
// console.log(requestUrl);



saveBtn.on('click', function(event) {
    event.preventDefault();
    cityToSearch = $("#city-search").val();
    console.log(cityToSearch);
    var requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityToSearch + '&appid=3eaff4dcea866e57c4766356b8dd3f28';
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
        })
});