const apiKey = "836c4a85e1101a30df4faaba35ccf881"; // Replace with your real API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim(); // Trim spaces
    if (!city) {
        weatherResult.innerHTML = "Please enter a city!";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = "Error fetching data! " + error.message;
            console.error("Fetch error:", error);
        });
});
