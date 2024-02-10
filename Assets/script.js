document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var cityInput = document.getElementById('city-input').value;
    if (cityInput) {
      fetchWeather(cityInput);
      document.getElementById('city-input').value = '';
    }
  });
  
  function fetchWeather(city) {
    var apiKey = '21bcef3ec0b60c3c6771d221537cb318';
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('City not found!');
        }
      })
      .then(function(data) {
        displayCurrentWeather(data);
        displayForecast(data);
      })
      .catch(function(error) {
        alert(error.message);
      });
  }
  
  function displayCurrentWeather(data) {
    var currentWeather = document.getElementById('current-weather');
    currentWeather.innerHTML = `
      <div class="weather-card">
        <h3>${data.city.name} (${new Date().toLocaleDateString()})</h3>
        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" alt="${data.list[0].weather[0].description}">
        <p>Temperature: ${data.list[0].main.temp}°C</p>
        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Wind Speed: ${data.list[0].wind.speed} m/s</p>
      </div>
    `;
  }
  
  function displayForecast(data) {
    var forecastContainer = document.getElementById('forecast');
    var forecastHTML = '<div class="forecast-container">';
    for (var i = 0; i < data.list.length; i++) {
      if (data.list[i].dt_txt.includes('12:00:00')) {
        forecastHTML += `
          <div class="forecast-card">
            <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt="${data.list[i].weather[0].description}">
            <p>Temp: ${data.list[i].main.temp}°C</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
          </div>
        `;
      }
    }
    forecastHTML += '</div>';
    forecastContainer.innerHTML = forecastHTML;
  }
  