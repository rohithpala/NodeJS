const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
     res.sendFile(__dirname + "/index.html");
});

app.post("/calculator", function(req, res){
     var n1 = Number(req.body.num1);
     var n2 = Number(req.body.num2);
     res.send(n1 + " + " + n2 + ": " + (n1+n2) + "<br>" +
              n1 + " - " + n2 + ": " + (n1-n2) + "<br>" +
              n1 + " * " + n2 + ": " + (n1*n2) + "<br>" +
              n1 + " / " + n2 + ": " + (n1/n2) + "<br>" +
              n1 + " % " + n2 + ": " + (n1%n2));
});

app.listen(3000, function(){
     console.log("Server Started at Port 3000");
});
