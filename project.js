let latitide = document.getElementById("lat");
let longitude = document.getElementById("long");
let my_location = document.getElementById("location");
let wind_speed = document.getElementById("wind-speed");
let humidity = document.getElementById("humidity");
let time_zone = document.getElementById("time-zone");
let pressure = document.getElementById("pressure");
let wind_direction = document.getElementById("wind-direction");
let uv_index = document.getElementById("uv-index");
let feels_like = document.getElementById("feels-like");
let mapLocation = document.getElementById("map");

let apiKey = "d1e9d795e9d745e587283128230309";
// url = http://api.weatherapi.com/v1/current.json?key=d1e9d795e9d745e587283128230309&q=26.7271012,88.3952861

function findMyLocation() {
  function success(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    latitide.textContent = `Latitude : ${lat} °`;
    longitude.textContent = `Longitude : ${long} °`;
    findWeatherData(lat, long).catch(() => {
      console.log("Error in accessing data!");
    });

    // console.log(lat,long);
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

async function findWeatherData(lat, long) {
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${long}`;
  let getWeather = await fetch(url);
  let weatherdata = await getWeather.json();
  let mapHtml = `<iframe
  src="https://maps.google.com/maps?q=${lat},${long}&output=embed"
  frameborder="0"
  style="border:"0"
  ></iframe>`;
  mapLocation.insertAdjacentHTML("beforeend",mapHtml);

  my_location.innerText = `Location: ${
    weatherdata.location.name
      ? weatherdata.location.name
      : weatherdata.location.region
  }`;
  wind_speed.innerText = `Wind Speed:  ${weatherdata.current.wind_kph} kmph`;
  humidity.innerText = `Humidity : ${weatherdata.current.humidity}`;
  time_zone.innerText = `Time Zone : ${weatherdata.location.tz_id}`;
  wind_direction.innerText = `Wind Direction : ${detectWindDirection(
    weatherdata.current.wind_dir
  )}`;
  pressure.innerText = `Pressure: ${(
    weatherdata.current.pressure_mb / 1013.25
  ).toFixed(2)} atm`;
  uv_index.innerText = `UV Index : ${weatherdata.current.uv}`;
  feels_like.innerText = `Feels like: ${weatherdata.current.feelslike_c}°`;
  // console.log(weatherdata);
}
const detectWindDirection = (data) => {
  const wind_directions = {
    N: "North",
    NNE: "North-Northeast",
    NE: "Northeast",
    ENE: "East-Northeast",
    E: "East",
    ESE: "East-Southeast",
    SE: "Southeast",
    SSE: "South-Southeast",
    S: "South",
    SSW: "South-Southwest",
    SW: "Southwest",
    WSW: "West-Southwest",
    W: "West",
    WNW: "West-Northwest",
    NW: "Northwest",
    NNW: "North-Northwest",
  };
  return wind_directions[data];
};

findMyLocation();
