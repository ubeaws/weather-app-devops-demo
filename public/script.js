function getWeather() {
  const city = document.getElementById("cityInput").value;
  fetch(`/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      const result = document.getElementById("result");
      if (data && data.main) {
        result.innerHTML = `🌡️ ${data.name}: ${data.main.temp}°C`;
      } else {
        result.innerHTML = "City not found.";
      }
    })
    .catch(err => {
      document.getElementById("result").innerHTML = "Error fetching weather.";
    });
}

