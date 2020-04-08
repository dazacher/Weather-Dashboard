// $(document).ready(function () {
//     const apiKey = "166a433c57516f51dfab1f7edaed8413";
//     const units = "imperial";
//     // load history from local storage   
//     var weatherArr = JSON.parse(localStorage.getItem("weatherArr"));
//     if (!weatherArr) {
//         weatherArr = [];
//     }else{
//         localStorage.get("weatherArr");
//     }
//     console.log("weatherArr ", weatherArr);
//     $("#searchCityBtn").on("click", function (event) {
//         // Empty any previous made 5 day forecast cards
//         //$(".card-group").empty();

//         // This line grabs the input from the textbox
//         var city = $("#city-input").val().trim();

//         const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;

// // Use this API to get Latitude and Longitude
//         $.ajax({
//             url: weatherURL,
//             method: "GET"
//         }).then(function (response) {
//             console.log("weatherURL " , response);
//         });

//         let lat = response.city.coord.lat;
//         console.log("Response.ciy.coord.lon " + response.city.coord.lon);
//         // Get the longitude for the next API call
//         let lon = response.city.coord.lon;
//         console.log("Response.ciy.coord.lat " + response.city.coord.lat);
    

//         $(".savedCityBtn").on("click", function (event) {
//             console.log("Saved button clicked" , cityFromHistory)
//             console.log("$('.savedCityBtn').val().trim()  " , $(".savedCityBtn").val().trim())
//             var cityFromHistory = $(".savedCityBtn").val().trim();
//             // cityFromHistory =$(".search").val().trim();
//             $(".card-group").empty();
//             loadTemperatureData(cityFromHistory);
//         });

        

//         function loadTemperatureData(city) {
//             // references the history array 
//             // check to see if city is in array
//             //$(".card-group").empty();
//             console.log("$City " + $("#city-input").val().trim())
//             console.log(city);
//             const units = "imperial";
//             // const weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey;
//             console.log("Search button has been clicked");
//             console.log(city);
//             event.preventDefault();
//             // Create a new weather buttons
//             var weatherBtn = $("<input>");
//             var weatherPar = $("<p>");
//             // Providing the initial button text
//             var weatherCityInput = $("#city-input").val().trim()
//             if (!weatherCityInput) {
//                 return;
//             }
//             // push to array and then update local storage
//             if (weatherArr.indexOf(weatherCityInput) < 0) {
//                 console.log('New entry')
//                 console.log("weatherCityInput ", weatherCityInput);
        
//                 weatherBtn.val(weatherCityInput);
//                 $(".colButtonView").append(weatherBtn);
//                 weatherBtn.attr("class", "savedCityBtn");
//                 weatherArr.push(weatherCityInput);
                
//             }
//             // if nothing is in local storage yet, push to local storage
//             if (weatherArr.length === 0) {
//                 console.log("other if ");
//                 weatherBtn.val(weatherCityInput);
//                 $(".colButtonView").append(weatherBtn);
//                 weatherBtn.attr("class", "savedCityBtn");
//                 weatherArr.push(weatherCityInput);
//             }

//             localStorage.setItem("weatherArr", JSON.stringify(weatherArr));
//             // $(".colButtonView").append(weatherBtn);
//             // Adding the buttons to the city-view div;
//             // weatherBtn.val(weatherCityInput);
//             $(".colButtonView").append(weatherPar);
//             $("#fiveDayForecast").css("visibility", "visible");
//             testURL= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&units=" + units + "&appid=" + apiKey;
//             $.ajax({
//                 url: testURL,
//                 method: "GET"
//             }).then(function (responseTest) {
//                 console.log(responseTest);
//                 console.log(responseTest.city.name);
//                 // Get the latitude for the next API call
               

//                 // Loop 5 times for the 5 day forecast
//                 for (i = 0; i < 6; i++) {
//                     console.log("In for loop");
//                     // console.log("response.list[0]" + response.list[0]);
//                     if (i < 1) {
//                         console.log("Weather " + responseTest.daily[i].weather[0].main);
//                         if (responseTest.daily[i].weather[0].main === "Clear") {
//                             // Add Weather icon between date and temperature for clear days
//                             var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);

//                         } else if (responseTest.daily[i].weather[0].main === "Rain") {
//                             // Add Weather icon between date and temperature for rainy days
//                             var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else if (responseTest.daily[i].weather[0].main === "Clouds") {
//                             // Add Weather icon between date and temperature for cloudy days
//                             var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else if (responseTest.daily[i].weather[0].main === "Snow") {
//                             // Add Weather icon between date and temperature for snowy days
//                             var imageUrl = "./Assets/images/iconfinder_snow_3233849.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else {
//                             // Add Weather icon between date and temperature for partly cloudy days
//                             var imageUrl = "./Assets/images/iconfinder_sunny_3233850.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             // $("#images").append(weatherIcon);
//                         };
//                         console.log("Response[i] " + moment(response.list[i].dt_txt).format('l'));
//                         // response.list[0].dt_text;
//                         var cityName = response.city.name;
//                         console.log(responseTest.daily[i].main.temp);
//                         var temperature = responseTest.daily[i].main.temp;
//                         console.log(responseTest.daily[i].main.humidity);
//                         var humidity = responseTest.daily[i].main.humidity;
//                         console.log(responseTest.daily[i].wind.speed);
//                         var windSpeed = responseTest.daily[i].wind.speed;
//                         console.log("Date of weather " + moment(responseTest.daily[i].dt_txt).format('l'));
//                         // Code for initial card
//                         var dateOfWeather = moment(response.list[i].dt_txt).format('l');
//                         console.log("Date of weather " + dateOfWeather);
//                         $(".card-title").text(cityName + "   " + dateOfWeather);
//                         $(".card-title").append(weatherIcon);
//                         // $(".card-title").text(cityName + "   " + dateOfWeather + "  " + $("#images").append(weatherIcon));
//                         $("#tempElement1").text("Temperature: " + temperature + " °F");
//                         $("#tempElement2").text("Humidity: " + humidity + "%");
//                         $("#tempElement3").text("Wind Speed: " + windSpeed + " MPH");
//                     }
//                     else {
//                         console.log("In else part of loop");
//                         // Get weather icon
//                         console.log("Weather " + responseTest.daily[i].weather[0].main);
//                         if (responseTest.daily[i].weather[0].main === "Clear") {
//                             // Add Weather icon between date and temperature for clear days
//                             var imageUrl = "./Assets/images/iconfinder_Sunny_47314.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);

//                         } else if (responseTest.daily[i].weather[0].main === "Rain") {
//                             // Add Weather icon between date and temperature for rainy days
//                             var imageUrl = "./Assets/images/iconfinder_Sleet_47312.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else if (responseTest.daily[i].weather[0].main === "Clouds") {
//                             // Add Weather icon between date and temperature for cloudy days
//                             var imageUrl = "./Assets/images/iconfinder_Overcast_47309.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else if (responseTest.daily[i].weather[0].main === "Snow") {
//                             // Add Weather icon between date and temperature for snowy days
//                             var imageUrl = "./Assets/images/iconfinder_snow_3233849.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         } else {
//                             // Add Weather icon between date and temperature for partly cloudy days
//                             var imageUrl = "./Assets/images/iconfinder_sunny_3233850.png";
//                             var weatherIcon = $("<img>");
//                             weatherIcon.attr("src", imageUrl);
//                             weatherIcon.attr("alt", "weather image");
//                             $("#images").append(weatherIcon);
//                         };

//                         // Make a new card                    
//                         // Code for 5 Day forecast iterations 2 - 6
//                         //   Storing the Date, temperature, humidity
//                         var weatherDate = moment(responseTest.list[i].dt_txt).format('l');
//                         var tempStorage = responseTest.daily[i].temp;
//                         var humidityStorage = responseTest.daily[i].humidity;

//                         var weatherDiv = $("<div class='card'>");
//                         var weatherDateH5 = $("<h5>");
//                         var temperaturePar = $("<p>");
//                         var humidityPar = $("<p>");

//                         // Put the data into the text element
//                         weatherDateH5.text(weatherDate);
//                         temperaturePar.text("Temp: " + tempStorage + " °F");
//                         humidityPar.text("Humidity: " + humidityStorage + "%");
//                         // Displaying the date, temperature, humidity
//                         $(".card-group").append(weatherDiv);
//                         weatherDiv.append(weatherDateH5);

//                         weatherDiv.append(weatherIcon);


//                         weatherDiv.append(temperaturePar);
//                         weatherDiv.append(humidityPar);
//                         weatherDiv.attr("class", "futureForecast");
//                         temperaturePar.attr("class", "card-text");
//                         humidityPar.attr("class", "card-text");
//                     };
//                 };

//                 // Get UV Index
//                 // "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=" + units+appid=" + apiKey + "&lat=" + lat + "&lon=" + lon + "&cnt=1"
//                 // "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + apiKey";
//                 const uvIndexDaysURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey+ "&cnt=6";

//                 $.ajax({
//                     url: uvIndexDaysURL,
//                     method: "GET"
//                 }).then(function (responseUV) {
//                     // console.log("responseUV " + responseUV);
//                     $("#uvIndex").removeAttr("class");
//                     console.log("responseUV " , JSON.stringify(responseUV));
//                     console.log("ResponseUV[i].value " + responseUV[0].value)
//                     // $("#uvIndex").addClass("normal");

//                     if (responseUV[0].value > 7) {
//                         // $(".uvIndex").attr("danger");
//                         $("#uvIndex").addClass("danger");
//                     } else if (responseUV[0].value < 7 && responseUV[0].value > 4) {
//                         // $(".uvIndex").attr("caution");
//                         $("#uvIndex").addClass("caution");
//                     } else {
//                         // $(".uvIndex").attr("normal");
//                         $("#uvIndex").addClass("normal");
//                     }

//                     console.log("UV Index: " + responseUV[0].value);
//                     $("#tempElement4").text("UV Index: ");
//                     $("#uvIndex").text(responseUV[0].value);
//                 });
//             });
//         };

//         loadTemperatureData(city);
//     });
// });    