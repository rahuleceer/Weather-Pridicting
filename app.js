const express= require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.post("/",function(req,res){
  const query="India";//res.body.city;
  const keyId="c35efdaf16f9149df1821b550f4b5ee2";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+keyId+"&units="+unit;
  https.get(url,function(response){
    //console.log(response.statusCode);
    response.on("data",function(data){
      const WeatherData=JSON.parse(data);//JSON.stringify(data);
      const temp=WeatherData.main.temp;
      const Description=WeatherData.weather[0].description;
      const icon=WeatherData.weather[0].icon;

      res.write("<h1>The temperature of "+query+" is "+ temp + " degree Celcius</h1>");
      res.write("<p>The Description of weather is "+ Description + "</p>");
      res.write("<img src=http://openweathermap.org/img/wn/"+icon+"@2x.png>");
      res.send();
    })
  })
})

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.listen(3000,function(){
  console.log("Server is started on port 3000.");
})
