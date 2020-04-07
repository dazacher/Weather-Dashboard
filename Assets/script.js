$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    // This line grabs the input from the textbox



    $("#searchCityBtn").on("click", function (event) {
        $(".card-group").empty();

        var city = $("#city-input").val().trim();
        console.log("$City " + $("#city-input").val().trim())
        console.log(city);
        const units = "imperial";
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;
        console.log("Search button has been clicked");
        console.log(city);
        event.preventDefault();
        // Create a new weather buttons
        var weatherBtn = $("<input>");
        var weatherPar = $("<p>");
        var weatherCityInput = $("#city-input").val().trim()
        // Providing the initial button text
        // weatherBtn.text($("#city-input").val().trim());
        weatherBtn.val(weatherCityInput);
        // Adding the buttons to the city-view div;
        $(".colButtonView").append(weatherBtn);
        $(".colButtonView").append(weatherPar);
        $("#fiveDayForecast").css("visibility", "visible");
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(response.city.name);
            // Get the latitude for the next API call
            let lat = response.city.coord.lat;
            console.log("Response.ciy.coord.lon " + response.city.coord.lon);
            // Get the longitude for the next API call
            let lon = response.city.coord.lon;
            console.log("Response.ciy.coord.lat " + response.city.coord.lat);

            // Loop 5 times for the 5 day forecast
            for (i = 0; i < 6; i++) {
                console.log("In for loop");
                // console.log("response.list[0]" + response.list[0]);
                if (i < 1) {
                    console.log("Weather " + response.list[i].weather[0].main);
                    if (response.list[i].weather[0].main === "Clear") {
                        // Add Weather icon between date and temperature for clear days
                        var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);

                    } else if (response.list[i].weather[0].main === "Rain") {
                        // Add Weather icon between date and temperature for rainy days
                        var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);
                    } else if (response.list[i].weather[0].main === "Clouds") {
                        // Add Weather icon between date and temperature for cloudy days
                        var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);
                    } else if (response.list[i].weather[0].main === "Snow") {
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
                    console.log("Response[i] " + moment(response.list[i].dt_txt).format('l'));
                    // response.list[0].dt_text;
                    var cityName = response.city.name;
                    console.log(response.list[i].main.temp);
                    var temperature = response.list[i].main.temp;
                    console.log(response.list[i].main.humidity);
                    var humidity = response.list[i].main.humidity;
                    console.log(response.list[i].wind.speed);
                    var windSpeed = response.list[i].wind.speed;
                    console.log("Date of weather " + moment(response.list[i].dt_txt).format('l'));
                    // Code for initial card
                    var dateOfWeather = moment(response.list[i].dt_txt).format('l');
                    console.log("Date of weather " + dateOfWeather);

                    $(".card-title").text(cityName + "   " + dateOfWeather + "  " + $("#images").append(weatherIcon));
                    $("#tempElement1").text("Temperature: " + temperature + " °F");
                    $("#tempElement2").text("Humidity: " + humidity + "%");
                    $("#tempElement3").text("Wind Speed: " + windSpeed + " MPH");
                }
                else {
                    console.log("In else part of loop");
                    // Get weather icon
                    console.log("Weather " + response.list[i].weather[0].main);
                    if (response.list[i].weather[0].main === "Clear") {
                        // Add Weather icon between date and temperature for clear days
                        var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);

                    } else if (response.list[i].weather[0].main === "Rain") {
                        // Add Weather icon between date and temperature for rainy days
                        var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);
                    } else if (response.list[i].weather[0].main === "Clouds") {
                        // Add Weather icon between date and temperature for cloudy days
                        var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
                        var weatherIcon = $("<img>");
                        weatherIcon.attr("src", imageUrl);
                        weatherIcon.attr("alt", "weather image");
                        $("#images").append(weatherIcon);
                    } else if (response.list[i].weather[0].main === "Snow") {
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
                    var weatherDate = moment(response.list[i].dt_txt).format('l');
                    var tempStorage = response.list[i].main.temp;
                    var humidityStorage = response.list[i].main.humidity;
            
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

            // Get UV Index

            const uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=1"

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function (responseUV) {
                // console.log("responseUV " + responseUV);
                console.log("responseUV " + JSON.stringify(responseUV));
                console.log("ResponseUV[i].value " + responseUV[0].value)
                $(".uvIndex").addClass("normal");

                if (responseUV[0].value > 7) {
                    $(".uvIndex").attr("danger");
                    // $(".uvIndex").addClass("danger");
                } else if (responseUV[0].value < 7 && responseUV[0].value > 4) {
                    $(".uvIndex").attr("caution");
                    // $(".uvIndex").addClass("caution");
                } else {
                    // $(".uvIndex").attr("normal");
                    // $(".uvIndex").addClass("normal");
                }

                console.log("UV Index: " + responseUV[0].value);
                $("#tempElement4").text("UV Index: ");
                $(".uvIndex").text(responseUV[0].value);
            });

        });

    });
});    