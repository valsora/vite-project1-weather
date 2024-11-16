'use strict';

import { APPID } from "./api";

const urlWeather = 'https://ru.api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityForm = document.getElementById('city_form');
cityForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  let cityName = document.getElementById('city_input').value;
  try {
    let response = await fetch(urlWeather + cityName + APPID);
    if (response.ok) {
      let data = await response.json();
      for (let key in data) {
        console.log(key);
        console.log(data[key]);
      }
      document.getElementsByClassName('weather_div')[0].hidden = false;
      document.querySelector('.h2_city_name').textContent = data.name;
      document.querySelector('.p_weather').textContent = data.weather[0].description;
      document.querySelector('.p_temp').textContent = data.main.temp + '°C';
      document.querySelector('.p_feels_like').textContent = 'feels like ' + data.main.feels_like + '°C';
    } else {
      alert('HTTP error: ' + response.status);
    }
  } catch(error) {
    alert(error);
  }
});

const cityInput = document.getElementById('city_input');
cityInput.addEventListener('keyup', (event) => {
  if (cityInput.value === '') {
    document.getElementsByClassName('submit_button')[0].disabled = true;
  } else {
    document.getElementsByClassName('submit_button')[0].disabled = false;
  }
});
