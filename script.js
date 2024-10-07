document.addEventListener("DOMContentLoaded", () => {
    let API_KEY = "5e3559acd128d7c61a2d0792c7bbbb9b";
  
    let cityName = document.getElementById("cityName");
    let country = document.getElementById("country");
    let temp = document.getElementById("temp");
  
    let input = document.getElementById("input");
    let button = document.getElementById("button");
  
    let weatherForm = document.getElementById("weatherForm");
  

    weatherForm.addEventListener("submit", (e) => {

        e.preventDefault()
      let city = input.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

console.log(city)

      if(city == ""){
        alert("Pls write a city name")
      }

      fetch(url)
      .then(response => response.json())
      .then(data=>{

        let iconCode = data.weather[0].icon;
      
        let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

         document.getElementById("wicon").src = iconUrl;
      
        console.log( data, ">>>>>")
        cityName.textContent = data.name
        country.textContent = data.sys.country

        let tt = Number(data.main.temp)


        temp.textContent = (tt - 273.15).toFixed(2) +" C"
      })








    });
  
    console.log("hello");
  });
  