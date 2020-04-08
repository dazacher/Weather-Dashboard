$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    const units = "imperial";
    // load history from local storage   
    var weatherArr = JSON.parse(localStorage.getItem("weatherArr"));
    if (!weatherArr) {
        weatherArr = [];
    }
    else {
        // weatherArr = localStorage.getItem("weatherArr", weatherArr);
        // for (let i = 0; i <= weatherArr.length; i++) {
        var lastIndex = weatherArr.length - 1
        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + weatherArr[lastIndex] + "&units=" + units + "&appid=" + apiKey;

        // $.ajax({
        //     url: weatherURL,
        //     method: "GET"
        // }).then(function (responseFromStorage) {
        //     console.log("ResponseFromStorage ", responseFromStorage)

        //     let lat = responseFromStorage.city.coord.lat;
        //     console.log("Response.ciy.coord.lon " + responseFromStorage.city.coord.lon);
        //     // // Get the longitude for the next API call
        //     let lon = responseFromStorage.city.coord.lon;
        //     console.log("Response.ciy.coord.lat " + responseFromStorage.city.coord.lat);
            loadTemperatureData(weatherArr[lastIndex])
        // });
        // weatherArr = localStorage.getItem("weatherArr" + i);
        // };
        // localStorage.getItem("weatherArr", weatherArr);
        // loadTemperatureData("weatherArr")
    }
    console.log("weatherArr ", weatherArr);



    $("#searchCityBtn").on("click", function (event) {
        // Empty any previous made 5 day forecast cards
        $(".card-group").empty();
        console.log("SearchCityBtn has been clicked");

        event.preventDefault();
        var city = $("#city-input").val().trim();
        if (!city) {
            return;
        }
        loadTemperatureData(city);
    });


    $(".savedCityBtn").on("click", function (event) {
        console.log("Saved button clicked", searchCityBtn);
        console.log("$('.savedCityBtn').val().trim()  ", $(".savedCityBtn").val().trim())
        var cityFromHistory = $(".savedCityBtn").val().trim();
        $(".card-group").empty();
        cityName = "";
        temperature = ""
        humidity = "";
        windSpeed = "";
        $("#tempElement1").text("");
        $("#tempElement2").text("");
        $("#tempElement3").text("");
        $("#uvIndex").text("");

        loadTemperatureData(cityFromHistory);
    });


    function loadTemperatureData(city) {

        const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log("weatherURL ", response);
            let lat = response.city.coord.lat;
            console.log("Response.ciy.coord.lon " + response.city.coord.lon);
            // // Get the longitude for the next API call
            let lon = response.city.coord.lon;
            console.log("Response.ciy.coord.lat " + response.city.coord.lat);
            // Get the latitude for the next API call



            console.log("loadTemperatureData function ran");
            weatherDataURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey;
            $.ajax({
                url: weatherDataURL,
                method: "GET"
            }).then(function (responseData) {
                console.log("response.Data ", responseData);
                // console.log("Inside Function City ", response.city.name);
                // references the history array 
                // check to see if city is in array
                $(".card-group").empty();
                console.log("$City " + $("#city-input").val().trim())
                console.log(city);

                // Create a new weather buttons
                var weatherBtn = $("<input>");
                var weatherPar = $("<p>");
                // Providing the initial button text
                // var weatherCityInput = $("#city-input").val().trim()
                if (!city) {
                    return;
                }
                // push to array and then update local storage
                if (weatherArr.indexOf(city) < 0) {
                    console.log('New entry')
                    console.log("city", city);

                    weatherBtn.val(city);
                    $(".colButtonView").append(weatherBtn);
                    weatherBtn.attr("class", "savedCityBtn");
                    weatherArr.push(city);

                }
                // if nothing is in local storage yet, push to local storage
                if (weatherArr.length === 0) {
                    console.log("other if ");
                    weatherBtn.val(city);
                    $(".colButtonView").append(weatherBtn);
                    weatherBtn.attr("class", "savedCityBtn");
                    weatherArr.push(city);
                }

                localStorage.setItem("weatherArr", JSON.stringify(weatherArr));
                // $(".colButtonView").append(weatherBtn);
                // Adding the buttons to the city-view div;
                // weatherBtn.val(weatherCityInput);
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

                        var cityName = response.city.name;
                        console.log(response.list[i].main.temp);
                        var temperature = response.list[i].main.temp;
                        console.log(response.list[i].main.humidity);
                        var humidity = response.list[i].main.humidity;
                        console.log(response.list[i].wind.speed);
                        var windSpeed = response.list[i].wind.speed;

                        console.log("Date of weather " + moment(response.list[i].dt_txt).format("MM/DD/YYYY"));
                        // Code for initial card
                        var dateOfWeather = moment(response.list[i].dt_txt).format('l');
                        console.log("Date of weather " + dateOfWeather);
                        $(".card-title").text(cityName + "   " + dateOfWeather);
                        $(".card-title").append(weatherIcon);
                        // $(".card-title").text(cityName + "   " + dateOfWeather + "  " + $("#images").append(weatherIcon));
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
                        // moment.unix(1318781876).utc();

                        var weatherDate = moment.unix(responseData.daily[i].dt).format("M/D/YYYY");
                        // var weatherDate = moment(responseData.daily[i].dt).format('l');
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

                // const uvIndexDaysURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey + "&cnt=6";

                // $.ajax({
                //     url: uvIndexDaysURL,
                //     method: "GET"
                // }).then(function (responseUV) {
                // console.log("responseUV " , responseUV);
                $("#uvIndex").removeAttr("class");
                // console.log("responseUV ", JSON.stringify(responseUV));
                console.log("responseData.daily[i].weather.uvi " + responseData.daily[i].uvi)
                // $("#uvIndex").addClass("normal");

                if (responseData.daily[i].uvi > 7) {
                    // $(".uvIndex").attr("danger");
                    $("#uvIndex").addClass("danger");
                } else if (responseData.daily[i].uvi < 7 && responseData.daily[i].uvi > 4) {
                    // $(".uvIndex").attr("caution");
                    $("#uvIndex").addClass("caution");
                } else {
                    // $(".uvIndex").attr("normal");
                    $("#uvIndex").addClass("normal");
                }

                console.log("UV Index: " + responseData.daily[i].uvi);
                $("#tempElement4").text("UV Index: ");
                $("#uvIndex").text(responseData.daily[i].uvi);

            });

        })

    };


});
