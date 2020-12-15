const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const city = req.body.cityName;
    const apikey = "21090c93466bd99f864a5d781cd026f5"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units=" + unit;
    https.get(url, (response) => {
       console.log(response.statusCode); 
       response.on("data", (d) => {
           const weatherData = JSON.parse(d);
           const temp = weatherData.main.temp;
           const description = weatherData.weather[0].description;
           res.send("<h1>The temperature in " + city + " is " + temp + " degreeCel</h1>" + "<h2>Description:" + description + "</h2>");
           
       });
    });
});

app.listen(3000, ()=> {console.log("server is running on port 3000")});




