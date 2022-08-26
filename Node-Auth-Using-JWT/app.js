const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('static'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://node_developer:Node123@jwt-auth.vmnthoi.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser); // apply to every route, as we used next inside that function, it goes to next handler after execution
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// Knowing the implementation of Cookies
// app.get("/set-cookie", (req, res) => {
//   res.cookie("FirstCookie", false);
//   res.cookie("SecondCookie", true, { maxAge: 1000, secure: true, httpOnly: true });
//   res.send("Cookies Set");
// });

// app.get("/read-cookie", (req, res) => {
//   const cookie = req.cookies;
//   console.log(cookie);
//   res.json(cookie);
// });