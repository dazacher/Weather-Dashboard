$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    // This line grabs the input from the textbox
    // var city = $("#city-input").val().trim();
    var city = "phoenix";
    console.log(city);
    const units = "imperial";
    const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;


    $("#searchCityBtn").on("click", function (event) {
        console.log("Search button has been clicked");
        console.log(city);
        event.preventDefault();
        // Create a new weather button
        var weatherBtn = $("<button>");
        // Providing the initial button text
        weatherBtn.text("#city-input");
        // Adding the button to the city-view div
        $("#city-view").append(weatherBtn);
        
        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            console.log(response.city.name);

            // for (i = 0; i < 6; i++) {

                console.log("In for loop");
                // console.log("response.list[0]" + response.list[0]);
                console.log("Response[i] " + response.list[0].dt_txt);
                // response.list[0].dt_text;
                var cityName = response.city.name;
                console.log(response.list[0].main.temp);
                var temperature = response.list[0].main.temp;
                console.log(response.list[0].main.humidity);
                var humidity = response.list[0].main.humidity;
                console.log(response.list[0].wind.speed);
                var windSpeed = response.list[0].wind.speed;
                console.log("Date of weather " + response.list[0].dt_txt);
                
                var dateOfWeather = response.list[0].dt_txt;
                console.log("Date of weather " + dateOfWeather);
                // $(".card-title").text(response.city.name + "   " + response.list[0].dt_txt);
                // $("#tempElement1").text("Temperature: " + response.list[0].main.temp + " °F");
                // $("#tempElement2").text("Humidity: " + response.list[0].main.humidity + "%");
                // $("#tempElement3").text("Wind Speed: " + response.list[0].wind.speed + " MPH");
                $(".card-title").text(cityName + "   " + dateOfWeather);
                $("#tempElement1").text("Temperature: " + temperature + " °F");
                $("#tempElement2").text("Humidity: " + humidity + "%");
                $("#tempElement3").text("Wind Speed: " + windSpeed + " MPH");


                
            // };

            // Get UV Index
            let lat = response.city.coord.lat;
            console.log("Response.ciy.coord.lon " + response.city.coord.lon);
            let lon = response.city.coord.lon;
            console.log("Response.ciy.coord.lat " + response.city.coord.lat);
            const uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=5"

            // for (i = 0; i < 6; i++) {
                $.ajax({
                    url: uvIndexURL,
                    method: "GET"
                }).then(function (responseUV) {
                    console.log("responseUV " + responseUV);
                    console.log("responseUV " + JSON.stringify(responseUV));
                    console.log("ResponseUV[i].value " + responseUV.value)
                    if (responseUV.value > 7) {
                        $(".uvIndex").addClass("danger");
                    } else if (responseUV.value < 7 && responseUV.value > 4) {
                        $(".uvIndex").addClass("medium");
                    } else {
                        $(".uvIndex").addClass("normal");
                    }

                    console.log("UV Index: " + responseUV.value);
                    $("#tempElement4").text("UV Index: ");
                    $(".uvIndex").text(responseUV.value);

                    console.log("date " + responseUV.date_iso);
                    $(".city").text(response.city.name + "Date:  " + responseUV.date_iso);
                    var weatherDiv = $("<div class='card'>");

                    // <div class="card futureForecast"></div>
                    weatherDiv.attr("class", "futureForecast");
                    // <div class="card-body">
                    var weatherCard = $("<div class='card-body'>");
                    ;
                    //   Storing the Date, temperature
                    // var weatherDate = responseUV[0].date_iso
                    var weatherDate = response.list[0].dt_txt;
                    var tempStorage = response.list[0].main.temp;
                    var humidityStorage = response.list[0].main.humidity;
                    //   Creating an element to hold the date, temperature
                    weatherDiv.append(weatherCard);
                    var cardH5 = $("<h5>").text(weatherDate);
                    var temperaturePar = $("<p>").text("Temp: " + tempStorage);
                    var humidityPar = $("<p>").text("Humidity: " + humidityStorage);
                    // Displaying the date, temperature
                    // weatherDiv.append(cardH5);
                    weatherDiv.append(cardH5);
                    weatherDiv.append(temperaturePar);
                    weatherDiv.append(humidityPar);
                    temperaturePar.attr("class", "card-text");
                    humidityPar.attr("class", "card-text");


                });
            // };
        });

    });
});    