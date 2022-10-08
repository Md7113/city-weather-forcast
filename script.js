cityName = ""
var day = moment().format("MMM Do YY")
var day1 = moment().add(1,'day').format("MMM Do YY")
var day2 = moment().add(2,'day').format("MMM Do YY")
var day3 = moment().add(3,'day').format("MMM Do YY")
var day4 = moment().add(4,'day').format("MMM Do YY")
var day5 = moment().add(5,'day').format("MMM Do YY")
$("#dateC1").text(day1)
$("#dateC2").text(day2)
$("#dateC3").text(day3)
$("#dateC4").text(day4)
$("#dateC5").text(day5)
console.log(day1)
$("#big-data-card").addClass('hidden')
$("#little-data-card").addClass('hidden')
 var repeat = 1
function popContent(){
 var popBtn = JSON.parse(localStorage.getItem("citySave")) || []
if(popBtn.length!=0){
    for(i=0;i<popBtn.length;i++){
        var newBtn = document.createElement('button')
            $(newBtn).text(popBtn[i])
            $(newBtn).attr('id',popBtn[i])
            $('#custom-btn').append(newBtn)
    }
}
}
popContent()
function deleteContent(){
    $('#custom-btn').empty()
}
function runWeather(event){
    cityName = $(event.target).parent().children().eq(2).val()
    if(!cityName){
        alert("enter a city name")
    }else{
        var cityArr = JSON.parse(localStorage.getItem("citySave")) || []
        for(i=0;i<cityArr.length;i++){
            if(cityName === cityArr[i]){
                repeat = 2
            }
        }
        console.log(repeat)
        if(repeat==1){
            cityArr.push(cityName)
            if(cityArr.length > 5){
                cityArr.splice(0,1)
            }
            localStorage.setItem("citySave",JSON.stringify(cityArr))
            deleteContent()
            popContent()
        }
        

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
                    $("#cityName").text(cityName+'---'+day)
                    for(i=0;i<6;i++){
                    if(i==0){
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text('Temp: '+data.list[0].main.temp)
                    $("#windC"+i).text('wind: '+data.list[0].wind.speed)
                    $("#humC"+i).text('Humidity: '+data.list[0].main.humidity)
                    }else{
                    b=(i*8)-1
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[b].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text('Temp: '+data.list[b].main.temp)
                    $("#windC"+i).text('Wind: '+data.list[b].wind.speed)
                    $("#humC"+i).text('Humidity: '+data.list[b].main.humidity)
                    $("#big-data-card").removeClass('hidden')
                    $("#little-data-card").removeClass('hidden')
                    
                    }
                    }
                });
        });
}}

function runWeather2(event){
    cityName = $(event.target).attr('id')
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
                    $("#cityName").text(cityName+'---'+day)
                    for(i=0;i<6;i++){
                    if(i==0){
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text('Temp: '+data.list[0].main.temp)
                    $("#windC"+i).text('wind: '+data.list[0].wind.speed)
                    $("#humC"+i).text('Humidity: '+data.list[0].main.humidity)
                    }else{
                    b=(i*8)-1
                    $("#symC"+i).attr("src","http://openweathermap.org/img/wn/"+data.list[b].weather[0].icon+"@2x.png")
                    $("#tempC"+i).text('Temp: '+data.list[b].main.temp)
                    $("#windC"+i).text('Wind: '+data.list[b].wind.speed)
                    $("#humC"+i).text('Humidity: '+data.list[b].main.humidity)
                    $("#big-data-card").removeClass('hidden')
                    $("#little-data-card").removeClass('hidden')
                    
                    }
                    }
                });
        });
}

$("#searchBtn").on("click", runWeather)
$("#custom-btn").on("click", runWeather2)