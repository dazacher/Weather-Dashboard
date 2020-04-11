$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    const units = "imperial";
    // load history from local storage   
    var weatherArr = JSON.parse(localStorage.getItem("weatherArr"));
    // If no array exist, start one
    if (!weatherArr) {
        weatherArr = [];
    }
    else {
        // If an array exists, load it from local storage
        var lastIndex = weatherArr.length - 1
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherArr[lastIndex] + "&units=" + units + "&appid=" + apiKey;
        // Call function to load data weather data
        loadTemperatureData(weatherArr[lastIndex], weatherArr);
        // Call function to reload buttons and data for last city entered
        reloadButtons(weatherArr[lastIndex], weatherArr);

    }
    console.log("weatherArr ", weatherArr);

    // Search city button click event
    $("#searchCityBtn").on("click", function (event) {

        event.preventDefault();

        // Empy the 5 day forecast cards
        $(".card-group").empty();
        console.log("SearchCityBtn has been clicked");
        console.log(" $(#city-input).val().trim() ", $("#city-input").val().trim());

        // Grab City from City Input box
        var cityToSearch = $("#city-input").val().trim();

        // Empty input box
        $("#city-input").val("");
        console.log("city-input city1 ", cityToSearch)

        // If no city was entered into input box, do nothing
        if (!cityToSearch) {
            return;
        }
        console.log("city-input city2 ", cityToSearch)

        // Call load temp data function to begin populating page
        loadTemperatureData(cityToSearch, weatherArr);
    });

    // Saved City button from localstorage onclick event
    $(document).on("click", ".savedCityBtn", function (event) {
        // $(".savedCityBtn").on("click", function (event) {
        // Empty Main card and 5 day forecast cards
        $(".card-group").empty();

        cityName = "";
        temperature = ""
        humidity = "";
        windSpeed = "";

        $("#tempElement1").text("");
        $("#tempElement2").text("");
        $("#tempElement3").text("");
        $("#uvIndex").text("");

        console.log("Saved button clicked   ", searchCityBtn);

        // Let the click event know which button has been pushed
        cityBtn = $(this).val();
        console.log("$('.savedCityBtn').val().trim()  ", cityBtn);
        console.log(".savedCityBtn.val().trim()   ", $(".savedCityBtn").val().trim())

        // Call load temp data to populate page
        loadTemperatureData(cityBtn, weatherArr);
    });

    // Reload buttons from local storage
    function reloadButtons(cityLastIndex, weatherArr) {
        loadTemperatureData(cityLastIndex, weatherArr);
        for (let m = 0; m < weatherArr.length; m++) {
            // Build the buttons using a for loop to loop through the array in local storage
            var weatherBtn = $("<input>");
            var reloadPar = $("<p>");

            weatherBtn.val(weatherArr[m]);
            console.log("weatherArr[m] ", weatherArr[m])

            $(".colButtonView").append(weatherBtn);
            $(".colButtonView").append(reloadPar);

            weatherBtn.attr('click', function (event) { });
            weatherBtn.attr("class", "savedCityBtn");
            weatherBtn.attr("data-input", weatherArr[m]);
        };
    }

    // Load the temp data onto the page using 2 API calls
    function loadTemperatureData(city, passedWeatherArr) {
        console.log("Beginning of loadTemperatureData function ", city);

        // This API call gets the City. We need the city to get the latitude and longitude for the next API call that will collect the rest of the temp data to populate the page.
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;

        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log("weatherURL ", response);

            // Get the latitude for the next API call
            let lat = response.city.coord.lat;
            console.log("Response.ciy.coord.lon " + response.city.coord.lon);
            // Get the longitude for the next API call
            let lon = response.city.coord.lon;
            console.log("Response.ciy.coord.lat " + response.city.coord.lat);
            console.log("loadTemperatureData function ran");

            // This API call gets the rest of the data we need to populate the data onto the page using the latitude and longitude of the name of the city we got in the previous API call.
            weatherDataURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey;

            $.ajax({
                url: weatherDataURL,
                method: "GET"
            }).then(function (responseData) {
                console.log("response.Data ", responseData);
                // console.log("city ", city);
                console.log("Inside Function City ", response.city.name);
                // references the history array 

                $(".card-group").empty();

                var city = response.city.name;


                // Create a new weather buttons
                var weatherBtn = $("<input>");
                var weatherPar = $("<p>");

                console.log("Providing initial botton text ", city);
                // If the city does not exist do nothing
                if (!city) {
                    return;
                }

                // push to array and then update local storage
                if (weatherArr.indexOf(city) < 0) {
                    console.log('New entry')
                    console.log("New entry city", city);
                    // var city = $("#city-input").val().trim()
                    weatherBtn.val(city);
                    $(".colButtonView").append(weatherBtn);
                    weatherBtn.attr("class", "savedCityBtn");
                    weatherBtn.attr("data-input", city);

                    weatherBtn.attr('onclick', function (event) { });
                    weatherArr.push(city);
                    weatherBtn.val("");
                }

                // if nothing is in local storage yet, push to local storage
                if (weatherArr.length === 0) {
                    console.log("other if ");
                    weatherBtn.val(city);
                    $(".colButtonView").append(weatherBtn);
                    weatherBtn.attr("class", "savedCityBtn");
                    weatherBtn.attr('onclick', function (event) { });
                    weatherArr.push(city);
                }

                localStorage.setItem("weatherArr", JSON.stringify(weatherArr));

                // Adding the buttons to the city-view div;
                weatherBtn.val(city);
                $(".colButtonView").append(weatherPar);
                $("#fiveDayForecast").css("visibility", "visible");

                // Loop 5 times for the 5 day forecast
                for (i = 0; i < 6; i++) {
                    console.log("i = ", i);
                    console.log("In for loop");
                    // console.log("response.list[0]" + response.list[0]);
                    if (i < 1) {
                        console.log("Weather " + responseData.daily[i].weather[0].main);
                        if (responseData.daily[i].weather[0].main === "Clear") {
                            // Add Weather icon between date and temperature for clear days
                            var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);

                        } else if (responseData.daily[i].weather[0].main === "Rain") {
                            // Add Weather icon between date and temperature for rainy days
                            var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);
                        } else if (responseData.daily[i].weather[0].main === "Clouds") {
                            // Add Weather icon between date and temperature for cloudy days
                            var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);
                        } else if (responseData.daily[i].weather[0].main === "Snow") {
                            // Add Weather icon between date and temperature for snowy days
                            var imageUrl = "./Assets/images/iconfinder_snow_3233849.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);
                        } else {
                            // Add Weather icon between date and temperature for partly cloudy days
                            var imageUrl = "./Assets/images/iconfinder_sunny_3233850.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            // $("#images").append(weatherIcon);
                        };
                        console.log("Response[i] " + moment(response.list[i].dt_txt).format('l'));
                        // Get the data needed ffrom the response API call
                        var cityName = response.city.name;
                        console.log(response.list[i].main.temp);
                        var temperature = response.list[i].main.temp;
                        console.log(response.list[i].main.humidity);
                        var humidity = response.list[i].main.humidity;
                        console.log(response.list[i].wind.speed);
                        var windSpeed = response.list[i].wind.speed;

                        // Code for initial card
                        var dateOfWeather = moment.unix(responseData.daily[i].dt).format("M/D/YYYY");
                        console.log("Date of weather " + dateOfWeather);
                        $(".card-title").text(cityName + "   " + dateOfWeather);
                        $(".card-title").append(weatherIcon);
                        $("#tempElement1").text("Temperature: " + temperature + " °F");
                        $("#tempElement2").text("Humidity: " + humidity + "%");
                        $("#tempElement3").text("Wind Speed: " + windSpeed + " MPH");
                    }
                    else {
                        console.log("In else part of loop");
                        console.log("else loop i", i);
                        // Get weather icon
                        console.log("Weather " + responseData.daily[i].weather[0].main);
                        if (responseData.daily[i].weather[0].main === "Clear") {
                            // Add Weather icon between date and temperature for clear days
                            var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);

                        } else if (responseData.daily[i].weather[0].main === "Rain") {
                            // Add Weather icon between date and temperature for rainy days
                            var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);

                        } else if (responseData.daily[i].weather[0].main === "Clouds") {
                            // Add Weather icon between date and temperature for cloudy days
                            var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);

                        } else if (responseData.daily[i].weather[0].main === "Snow") {
                            // Add Weather icon between date and temperature for snowy days
                            var imageUrl = "./Assets/images/iconfinder_snow_3233849.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);

                        } else {
                            // Add Weather icon between date and temperature for partly cloudy days
                            var imageUrl = "./Assets/images/iconfinder_sunny_3233850.png";
                            var weatherIcon = $("<img>");
                            weatherIcon.attr("src", imageUrl);
                            weatherIcon.attr("alt", "weather image");
                            $("#images").append(weatherIcon);
                        };

                        // Make a new card                    
                        // Code for 5 Day forecast iterations 2 - 6
                        //   Storing the Date, temperature, humidity

                        var weatherDate = moment.unix(responseData.daily[i].dt).format("M/D/YYYY");
                        var tempStorage = responseData.daily[i].temp.day;
                        var humidityStorage = responseData.daily[i].humidity;

                        var weatherDiv = $("<div class='card'>");
                        var weatherDateH5 = $("<h5>");
                        var temperaturePar = $("<p>");
                        var humidityPar = $("<p>");

                        // Put the data into the text element
                        weatherDateH5.text(weatherDate);
                        temperaturePar.text("Temp: " + tempStorage + " °F");
                        humidityPar.text("Humidity: " + humidityStorage + "%");
                        // Displaying the date, temperature, humidity
                        $(".card-group").append(weatherDiv);
                        weatherDiv.append(weatherDateH5);
                        weatherDiv.append(weatherIcon);
                        weatherDiv.append(temperaturePar);
                        weatherDiv.append(humidityPar);
                        weatherDiv.attr("class", "futureForecast");
                        temperaturePar.attr("class", "card-text");
                        humidityPar.attr("class", "card-text");
                    };
                };

                // Remove uvIndex class between lookups so as not to confuse the system
                $("#uvIndex").removeAttr("class");
                console.log("responseData.daily[i].weather.uvi " + responseData.daily[i].uvi);
                // Set color level of uvIndex
                if (responseData.daily[i].uvi > 7) {
                    // Red
                    $("#uvIndex").addClass("danger");

                } else if (responseData.daily[i].uvi < 7 && responseData.daily[i].uvi > 4) {
                    // Yellow
                    $("#uvIndex").addClass("caution");

                } else {
                    // Green
                    $("#uvIndex").addClass("normal");

                }
                // Write uvIndex to form
                console.log("UV Index: " + responseData.daily[i].uvi);
                $("#tempElement4").text("UV Index: ");
                $("#uvIndex").text(responseData.daily[i].uvi);

            });
        })
    };
});
