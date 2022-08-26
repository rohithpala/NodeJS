const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
     res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
     var n1 = Number(req.body.num1);
     var n2 = Number(req.body.num2);
     res.send("BMI Result: " + (n1/(n2*n2)));
});

app.listen(3000, function(){
     console.log("Server Started at Port 3000");
});
