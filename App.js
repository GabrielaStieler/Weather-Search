const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {


    const APIKey = 'ec826d918c06bb049a556dcf5dab3525';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`).then(Response => Response.json()).then(json => {

        if (json.cod === '404') {
            container.style.height = '58%';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity .humidity-number');
        const wind = document.querySelector('.weather-details .wind .wind-number');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'https://cdn-icons-png.flaticon.com/512/5903/5903519.png'
                break;

            case 'Rain':
                image.src = 'https://cdn-icons-png.flaticon.com/512/704/704832.png'
                break;

            case 'Snow':
                image.src = 'https://cdn-icons-png.flaticon.com/512/2315/2315309.png'
                break;

            case 'Clouds':
                image.src = 'https://cdn-icons-png.flaticon.com/512/414/414927.png'
                break;

            case 'Haze':
                image.src = 'https://cdn-icons-png.flaticon.com/512/5243/5243833.png'
                break;

            default:
                image.src = 'https://i.pinimg.com/originals/82/67/fd/8267fd1f2f023f6e682bb919c5a0d1d8.gif';

        }

        const tempCelsius = Math.round(parseFloat(json.main.temp) - 273.15);

        temperature.innerHTML = `${tempCelsius}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `<i class="fa-solid fa-water"/> ${json.main.humidity}%`;
        wind.innerHTML = `<i class="fa-solid fa-wind"/> ${parseFloat(json.wind.speed)} KM/H`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');

        container.style.height = '55%';

    });

});