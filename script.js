document.addEventListener("DOMContentLoaded", () => {
  let API_KEY = "5e3559acd128d7c61a2d0792c7bbbb9b";

  let cityName = document.getElementById("cityName");
  let country = document.getElementById("country");
  let temp = document.getElementById("temp");
  let input = document.getElementById("input");
  let weatherForm = document.getElementById("weatherForm");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longtitud = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longtitud}`);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitud}&appid=${API_KEY}`;
        fetch(url)
          .then((resp) => resp.json())
          .then((data) => {
            const { main, weather, sys, name } = data;

            cityName.textContent = name;
            country.textContent = sys.country;
            let tt = Number(main.temp);
            temp.textContent = (tt - 273.15).toFixed(2) + " C";
            let iconCode = weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("wicon").src = iconUrl;
          })
          .catch((error) => console.error(error));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let city = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    console.log(city);

    if (city == "") {
      alert("Pls write a city name");
    }
    input.value = "";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert("write valid city name");
        }

        return response.json();
      })
      .then((data) => {
        let iconCode = data.weather[0].icon;

        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("wicon").src = iconUrl;

        cityName.textContent = data.name;
        country.textContent = data.sys.country;

        let tt = Number(data.main.temp);

        temp.textContent = (tt - 273.15).toFixed(2) + " C";
      });
  });
});
