const weather_form = document.querySelector('form');
const weather_input = document.querySelector(".weather-input");
const weather_info_desc = document.querySelector(".weather_info-desc");
const error_msg = document.querySelector(".error-msg");
const weather_location = document.querySelector(".weather_info-location");
const weather_temp = document.querySelector(".weather_info-temp");
const weather_desc = document.querySelector(".desc");
const weather_loading = document.querySelector(".loading");

let error = '';

const loadweatherData = (location) => {

    let weatherData = ''
    weather_info_desc.style.display = "none";
    weather_loading.style.display = "block";
    error_msg.style.display = "none";

    fetch(`/weather?address=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                error = data.error;
                weather_input.value = "";
                return;
            }
            console.log(data);
            weatherData = data;
            weather_input.value = "";
        })
        .catch((err) => {
            weather_input.value = "";
            error = data.error
            console.log(err)
        }).finally(() => {
            weather_loading.style.display = "none";

            if (error) {

                weather_info_desc.style.display = "none";
                error_msg.textContent = error;
                error_msg.style.display = "block";
                error = "";
            } else {

                weather_info_desc.style.display = "flex";
                error_msg.style.display = "none";
                weather_temp.innerHTML = weatherData.temperature + "&#8451;"
                weather_location.textContent = weatherData.location
                weather_desc.innerHTML = `<p>${weatherData.weather_descriptions} <br/> <small>${weatherData.observation_time}</small> </p>`
                error = "";
            }
        })
}
weather_form.onsubmit = (e) => {
    e.preventDefault();
    const location = weather_input.value;
    if (!location) {
        weather_input.focuse = true;
        return alert("plz enter location");
    }
    loadweatherData(location)
}

window.onload = () => {

}

