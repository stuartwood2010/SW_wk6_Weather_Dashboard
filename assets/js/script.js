/*Set Variables*/
const srchBtn = $('#srchbtn');
const cityEl = $('#cityid');
const todaysDate = $('#todaysDate')
const citiesList = $('#cities-container')
const weatherIconToday = $('#weatherIcon');
const todayHeader = $('#today-header');
const descriptionToday = $('#descriptionToday');
const tempToday = $('#tempToday');
const windToday = $('#windToday');
const humidityToday = $('#humidityToday');
const uvIndex = $('#uvIndexToday');
const futureEl = $('.future');
let cityId;

/*Set todays Date on the screen*/
todaysDate.text(moment().format('L'));

/*When the user searches for a city, display the current weather information for that city*/
srchBtn.on('click', function(event) {
    event.preventDefault();
    futureEl.empty();
    cityId = cityEl.val();
    if (cityId === "") {
        alert('Please enter a City Name')
        document.location.reload();
    }    
    todayHeader.text(cityId);
    const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityId + '&units=imperial&appid=a31971324859b8bfdaba0df04f7db013';
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            // Get the latitude and longitude for the User Input City
            let latitude = data.coord.lat;
            let lat = latitude.toFixed(2);
            let longitude = data.coord.lon;
            let long = longitude.toFixed(2);
            let forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude&units=imperial&appid=a31971324859b8bfdaba0df04f7db013"
            // Using the lat/long fetch the weather information for that city
            fetch(forecastURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function (data) {
                    // Get the info for todays forecast
                    const weatherIcon = data.current.weather[0].icon;
                    const iconImg = "http://openweathermap.org/img/w/" + weatherIcon +".png"
                    weatherIconToday.attr('src', iconImg);
                    descriptionToday.text(data.current.weather[0].description);
                    let temp0 = data.daily[0].temp.max.toFixed(0);
                    tempToday.text("Temp: " + temp0 + " °F");
                    let wind0 = data.current.wind_speed.toFixed(0);
                    windToday.text("Wind: " + wind0 + " mph");
                    humidityToday.text("Humidity: " + data.current.humidity + "%");
                    uvIndex.text("UV Index: " + data.current.uvi)
                    // Get the info for the 5 day forecast
                    for (i=1; i < 6; i++) {                        
                        let forecastCard = $('<div></div>');
                        forecastCard.attr('id', 'day' + i);
                        let futureIcon = data.daily[i].weather[0].icon;
                        let futureImg =  $('<img />').attr('src', "http://openweathermap.org/img/w/" + futureIcon +".png");
                        let futureInfo = $('<ul></ul>');
                        let currentDay = moment(new Date())
                        futureDate = moment(currentDay,'DD-MM-YYYY' ).add(i, 'days').format('MM-DD-YYYY');
                        futureInfo.text(futureDate);
                        futureInfo.attr('style', 'list-style-type: none');
                        let temp = data.daily[i].temp.max.toFixed(0);
                        let futureTemp = $('<li></li>').text("T: " + temp + "°F");
                        let wind = data.daily[i].wind_speed.toFixed(0);
                        let futureWind = $('<li></li>').text("W: " + wind + " mph");
                        let futureHumidity = $('<li></li>').text("H: " + data.daily[i].humidity + "%");
                        futureInfo.append(futureTemp, futureWind, futureHumidity);
                        forecastCard.append(futureImg, futureInfo);
                        futureEl.append(forecastCard);
                    }
                })
        })
        /*Save the cityId to Local Storage*/
        if (localStorage.getItem('cityid') === null) {
        myCities = [];
        myCities.push(cityId);
        localStorage.setItem('cityid', JSON.stringify(myCities));
    } else {
        myCities = JSON.parse(localStorage.getItem('cityid'));
        for (var i = 0; i < myCities.length; i++) {
            // If the current city is already saved to favorites, do nothing.
            if (myCities[i] === cityId) {
                return;
            }
            // If the current city is not saved to favorites, add it to favorites.
            if (i === myCities.length - 1) {
                myCities.push(cityId);
                localStorage.setItem('cityid', JSON.stringify(myCities));
                return;
            }
        }
    }  
})
function listCities() {
    const savedCities = JSON.parse(localStorage.getItem('myCities'));
    // If there is nothing saved to local storage, do nothing.
    if (savedCities === null) {} else {
        // Loop through the array of saved Meals and list them out as buttons on the screen.
        for (let i = 0; i < savedCitiess.length; i++) {
            let myCity = savedCitiess[i];
            let myCityBtn = document.createElement('button');
            myCityBtn.setAttribute('class', 'cityButtons');
            myCityBtn.setAttribute('class', 'btn btn-primary col-10 mx-5 btn mt-1')
            console.log();
            myCityBtn.textContent = myCity;
            citiesList.append(myCityBtn);
        }
    }
}
listCities();