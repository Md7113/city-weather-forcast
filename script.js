cityName = ""


function runWeather(event){
    cityName = $(event.target).parent().children().eq(2).val()
    console.log(cityName)
    var cityCor = "http://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&appid=ca232c9f5c54a2dd3fb874485c4a91bd"
    fetch(cityCor)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var lat = data[0].lat
            var lon = data[0].lon
            var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid=ca232c9f5c54a2dd3fb874485c4a91bd"
            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                });
        });

    
    
}


$("#searchBtn").on("click", runWeather)