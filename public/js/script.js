document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    console.log(`City entered: ${city}`);
    try {
      const response = await fetch(`/weather?city=${encodeURIComponent(city)}`);
      console.log('Fetch response:', response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received:', data);
  
      const localTime = new Date().toLocaleString("en-US", { timeZone: data.timeZone.timeZoneId });
  
      const cityData = `
        <div class="card">
          <div class="card-header">
            <h2>Information about ${data.weather.name}</h2>
          </div>
          <div class="card-body">
            <h3>Weather</h3>
            <p>Temperature: ${data.weather.main.temp} °C</p>
            <p>Description: ${data.weather.weather[0].description}</p>
            <p>Coordinates: ${data.weather.coord.lat}, ${data.weather.coord.lon}</p>
            <p>Feels Like: ${data.weather.main.feels_like} °C</p>
            <p>Humidity: ${data.weather.main.humidity} %</p>
            <p>Pressure: ${data.weather.main.pressure} hPa</p>
            <p>Wind Speed: ${data.weather.wind.speed} m/s</p>
            <p>Country Code: ${data.weather.sys.country}</p>
            <p>Rain Volume (last 3 hours): ${data.weather.rain ? data.weather.rain['3h'] : 'N/A'}</p>
            <h3>Air Quality</h3>
            <p>AQI: ${data.airQuality.list[0].main.aqi}</p>
            <h3>Local Time</h3>
            <p>Current Time: ${localTime}</p>
            <p>Timezone: ${data.timeZone.timeZoneId}</p>
            <h3>City Information</h3>
            <p>${data.cityInfo.extract}</p>
            <a href="${data.cityInfo.content_urls.desktop.page}" target="_blank" class="btn btn-info">Read more on Wikipedia</a>
          </div>
        </div>
      `;
  
      document.getElementById('cityData').innerHTML = cityData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  