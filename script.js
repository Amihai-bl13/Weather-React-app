function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404)
        return true;
    else
        return false;
}

function isAuthorized(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 401)
        return true;
    else
        return false;
}

function isEmpty(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status == 400)
        return true;
    else
        return false;
}

let weather = {
    "apiKey": "b7009dd707ccd3607889bac244c06116",
    fetchWeather: function(city){
        url = "https://api.openweathermap.org/data/2.5/weather?q="+city
        + "&units=metric&appid=" + this.apiKey;
        if(isEmpty(url)){
            alert("Please enter a city name!");
            return;
        }

        UrlExists(url)
        ? isAuthorized(url)
          ? fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
              .then((response) => response.json())
              .then((data) => this.displayWeather(data))
              .catch((error) => console.error("Error fetching weather data:", error))
          : alert("Invalid API key has been provided!")
        : alert("No such city, please make sure that you've typed it in correctly!");
        },

    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        //console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon +".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },

    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Denver");