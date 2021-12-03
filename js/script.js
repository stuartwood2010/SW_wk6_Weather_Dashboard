const srchBtn = $('.srchbtn');

let cityEl = $('#cityid.text');;
const requestUrl = 'api.openweathermap.org/data/2.5/weather?q=' + cityEl.text + '&appid=a31971324859b8bfdaba0df04f7db013';
console.log(requestUrl);
console.log(cityEl);