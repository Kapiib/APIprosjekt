const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.bilde-top');
const icon = document.querySelector('.icon img')

const updateUI = (data) => {

    console.log(data)

    const { cityDets, weather } = data;

    details.innerHTML = `
    <h5>${cityDets.LocalizedName}</h5>
    <div>${weather.WeatherText}</div>
    <div>
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    const iconSrc = `SVG/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'Bilde her';
    } else {
        timeSrc = 'Bilde her'
    }
    time.setAttribute('src', timeSrc);

    if(card.classList.contains('bilde')){
        card.classList.remove('bilde')
    }

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    console.log(cityDets)

let weather ;
    if(cityDets !== undefined) {
         weather = await getWeather(cityDets.Key);
        document.getElementById("errorMsg").innerHTML= ""
    } else {
        document.getElementById("errorMsg").innerHTML = "Stedet finnes ikke i vår database"
    }

    return { cityDets, weather };

}

cityForm-addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
})