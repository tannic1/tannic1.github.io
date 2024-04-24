const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const content = document.querySelector(".content");
const cardImage = document.querySelector(".card-image img");

const updateUI = (data) => {
  const cityDets = data.cityDetails;
  const weather = data.cityWeather;

  //updating details
  content.innerHTML = `
    <h5 class="font-c">${cityDets.EnglishName}</h5>
    <span class="font-c">${weather.WeatherText}</span>
    <h3 class="font-c">${weather.Temperature.Metric.Value} &degC</h3>
  `;

  //updating image
  let imgSrc = null;
  if (weather.IsDayTime) {
    imgSrc = "assets/Day.png";
  } else {
    imgSrc = "assets/Night.png";
  }

  cardImage.setAttribute("src", imgSrc);

  //remove hide class
  if (card.classList.contains("hide")) {
    card.classList.remove("hide");
  }
};

const updateCity = async (city) => {
  const cityDetails = getCityInfoFromOpenAI(city);
  //const cityWeather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    //cityWeather: cityWeather,
  };
};

const form = document.querySelector('form');
const cityInput = document.querySelector('input[type="text"]');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally
  const city = cityInput.value; // Get the city name from the input field

  // Call updateCity and then updateUI
  updateCity(city)
  .then(data => {
    // Update the UI with the city details
    const cityInfoDiv = document.querySelector('#city-info');
    cityInfoDiv.textContent = data.cityDetails;
  })
    .catch(err => console.log(err));
});