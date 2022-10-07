cityName = ""
$("#big-data-card").addClass('hidden')
$("#little-data-card").addClass('hidden')

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
            var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&exclude=minutely,hourly&appid=ca232c9f5c54a2dd3fb874485c4a91bd"
            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    $("#cityName").text(cityName)
                    for(i=0;i<6;i++){
                    if(i==0){
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text(data.list[0].main.temp)
                    $("#windC"+i).text(data.list[0].wind.speed)
                    $("#humC"+i).text(data.list[0].main.humidity)
                    }else{
                    b=(i*8)-1
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[b].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text(data.list[b].main.temp)
                    $("#windC"+i).text(data.list[b].wind.speed)
                    $("#humC"+i).text(data.list[b].main.humidity)
                    $("#big-data-card").removeClass('hidden')
                    $("#little-data-card").removeClass('hidden')

                    }
                    }
                });
        });

    
    
}


$("#searchBtn").on("click", runWeather)