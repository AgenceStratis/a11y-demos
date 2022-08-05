class weatherOWM {
    constructor(wrapper, {
        appId = false,
        cityName = 'paris',
    }) {
        this.wrapper = wrapper;
        this.appId = appId;
        this.cityName = cityName;

        if (this.appId && this.cityName) {
            this.baseApiUrl = `//api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${this.appId}&lang=fr&units=metric`;
        }

        fetch(this.baseApiUrl)
            .then((resp) => resp.json()) // Transform the data into json
            .then((data) => {
                this.weatherToday(data);
            })
            .catch(function(error) {
                console.log('The JSON file could not be found. ');
                console.log(error);
            });
    }

    dirToStr = (d) => {
        const directions = ['Nord', 'Nord Est', 'Est', 'Sud Est', 'Sud', 'Sud Ouest', 'Ouest', 'Nord Ouest'];
        const directionsIcon = ['direction-up', 'direction-up-right', 'direction-right', 'direction-down-right', 'direction-down', 'direction-down-left', 'direction-left', 'direction-up-left'];
        d = d < 0 ?
            d = 360 - Math.abs(d) % 360
            : d % 360;
        return [`${directions[d / 45 | 0]}`,`${directionsIcon[d / 45 | 0]}`];
    }

    weatherToday = (data) => {
        this.wrapper.innerHTML = `
            Météo sur ${data.name} :
            ${data.weather[0].description}, ${Math.floor(data.main.temp)}°c,
            direction du vent :
            <i class="wi wi-${this.dirToStr(data.wind.deg)[1]}" aria-hidden="true"></i>
            <span class="sr-only">${this.dirToStr(data.wind.deg)[0]}</span>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function ()  {
    const wrapperWeather = document.getElementById('weather');
    if (wrapperWeather) {
        const weather = new weatherOWM(wrapperWeather, {
            appId: "6c6a157ce2b7fc2f9a3707399c3b970a",
            cityName: "Paris",
        });
        console.log(weather);
    }
});
