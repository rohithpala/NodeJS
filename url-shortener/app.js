const express = require("express");
const mongoose = require("mongoose");
const ShortURL = require("./models/shortURL");

const app = express();

mongoose.connect("mongodb://localhost/urlShortener", { useUnifiedTopology: true, useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
   const shortURLs = await ShortURL.findOneAndReplace();
   res.render("index", { shortURLs });
});

app.post("/shortURLs", async (req, res) => {
   await ShortURL.create({ url: req.body.url });
   res.redirect("/");
});

app.listen(process.env.PORT || 5000);
