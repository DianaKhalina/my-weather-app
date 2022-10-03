function showTemperature(response){
  
  console.log(response);
    
  let daytemp = document.querySelectorAll(".day");
  let nightTemp = document.querySelectorAll(".night");
  let nowTemp = document.querySelector("#now-temp");
  let curCity2 = document.querySelector("#cur-city");
  curCity2.innerHTML = response.data.city.name;
  nowTemp.innerHTML = Math.round(response.data.list[0].main.temp);
 

  let a = 0; 
  let b = 8;
  let c = 12;
  while (a < 4) {
  daytemp[a].innerHTML = Math.round(response.data.list[b].main.temp);
  nightTemp[a].innerHTML = Math.round(response.data.list[c].main.temp);
a = a + 1;  
b = b + 8;
c = c + 8; 
}
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);

}

function navigatorStart(){
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function searchCity(event){
  event.preventDefault();
  
  let inputCity = document.querySelector("#input-city");
  let curCity = document.querySelector("#cur-city");
  curCity.innerHTML = `${inputCity.value}`;
  
  
  let apiURLforecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity.value}&cnt=37&APPID=${apiKey}&units=${units}`;
 axios.get(apiURLforecast).then(showTemperature);
}

let now = new Date();
let nowDay = document.querySelector("#day");
let firstDayForecast = document.querySelector("#first-day");
let daysforecast = document.querySelectorAll("#days");
let weekdays = document.querySelectorAll("#week-day");


let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let date = now.getDate();
let monthes = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let month = monthes[now.getMonth()];
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let day = days[now.getDay()];

nowDay.innerHTML = `${day}, ${hours}:${minutes}`;
firstDayForecast.innerHTML = `${date} ${month}`;
let formSearchCity = document.querySelector("#search-city");
formSearchCity.addEventListener("submit", searchCity);

let apiKey = "209f33579f32165aac3b50595a16eef6";
let units = "metric";

let newDate = new Date();
let i = 0;
while (i < 4){
  newDate.setDate(now.getDate() + i + 1);
  console.log(newDate);
  daysforecast[i].innerHTML = `${newDate.getDate()} ${monthes[newDate.getMonth()]}`;
  weekdays[i].innerHTML = `${days[newDate.getDay()]}`;
  i = i + 1;
} 


let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", navigatorStart);

