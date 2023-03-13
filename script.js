let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`
let $currentTemp = document.querySelector('.temp')
let $currentDescription = document.querySelector('#description')
let $descriptionIcon = document.querySelector('#descriptionIcon')
let $curentMaxTemp = document.querySelector('#maxTemp')
let $curentMinTemp = document.querySelector('#minTemp')
let $hours = document.querySelector('.hours')
let $daily = document.querySelector('.daily')
let $MAXtemp = document.querySelector('#MAXtemp')
let $MINtemp = document.querySelector('#MINtemp')


/*burger menu */
let $burger = document.querySelectorAll('.burger')
let $container = document.querySelector('.container')
let $pogoda = document.querySelector('.pogoda')

$burger.forEach(elem=> {
    elem.addEventListener('click', function(){
        $container.classList.toggle('active');
        elem.classList.toggle('active')
        $pogoda.classList.toggle('hide')
    })
})


let x = document.querySelector(".demo");

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
  }

/*end burger menu */


/*SEARCH BTN */

let result = document.querySelector('#result')
let searchBtn = document.querySelector('#search-btn')
let cityRef = document.querySelector('#city')
let getWeather = () => {
    let cityValue = cityRef.value;
    if(cityValue.length == 0){
        result.innerHTML = `<h3>Please write city</h3>`
    }
    else{
        let url3 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
        fetch(url3)
            .then(resp => resp.json())
            .then((data) => {
                console.log(data);
                result.innerHTML =`
                <h2 class="name-city">${data.name} <img id="navigator" src="img/placeholder.png" alt=""></h2>
                <div class="gradusy">
                <p>${data.main.temp}° </p>
                <h4 class="weather">${data.weather[0].description}</h4></div>
                <div class="imgweather">
                <img id="oblako" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></div>
                <div class="man-min">
                    <div>
                        <h4 class="title">Max</h4>
                        <h4 class="temp">${data.main.temp_max}°</h4>
                    </div>    
                    <div>
                        <h4 class="title">Min</h4>
                        <h4 class="temp">${data.main.temp_min}°</h4>
                    </div>
                    <div>
                        <h4 class="title">Feels like</h4>
                        <h4>${data.main.feels_like}° </h4>
                    </div>
                </div>`

            })
            .catch(() => {
                result.innerHTML = `<h3>Город не найден</h3>`
            });
    }

};
searchBtn.addEventListener('click', getWeather);
// window.addEventListener('load', getWeather)
/*END SEARCH BTN* */




let weekDays = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
// let weekreverse = weekDays.reverse();
fetch(url)
    .then(resp => resp.json())
    .then((data) => {
        console.log(data);
        $currentTemp.textContent = data.current.temp.toFixed(0) + '°'
        $currentDescription.textContent = data.current.weather[0].description
        $descriptionIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
        $curentMaxTemp.textContent = 'Макс.: ' + data.daily[0].temp.max.toFixed(0) +',' + '°'
        $curentMinTemp.textContent = 'мин.: ' + data.daily[0].temp.min.toFixed(0) +',' + '°'

        data.hourly.forEach((element, index) => {
            let hour = new Date().getHours() + index
            $hours.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? "Сейчас" : hour < 24 ? hour : hour < 48 ? hour - 24 : hour < 72 ? hour - 48 : hour}</p>
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"
                <p>${element.temp.toFixed(0)}°</p>
            </div>
            `)
        });
        data.daily.forEach((element, index) => {
            let days = new Date(element.dt * 1000).getDay();
            $daily.insertAdjacentHTML("beforeend", `
            <div class="prognoz">
                <span class="now">${index == 0 ? 'Сегодня' : weekDays[days]}</span>
                <div class="imgweathercod">
                    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                </div>
                <span id="min">Min${element.temp.min}°</span>
                <span>Max${element.temp.max}°</span>
            </div>`)
    })
    })


