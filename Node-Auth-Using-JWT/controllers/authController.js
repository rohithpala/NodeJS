const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
   let errors = { email: '', password: '' };

   // login errors
   // incorrect email
   if (err.message === "Incorrect Email") {
      errors.email = "Incorrect Email";
   }

   // incorrect password
   if (err.message === "Incorrect Password") {
      errors.password = "Incorrect Password";
   }

   // duplicate email error
   if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
   }

   // validation errors
   if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
         errors[properties.path] = properties.message;
      });
   }

   return errors;
}

// creating jwt token
const MAX_AGE = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
   return jwt.sign({ id }, 'rohith-node-auth-secret',
      { expiresIn: MAX_AGE });
};

// controller actions
module.exports.signup_get = (req, res) => {
   res.render('signup');
}

module.exports.login_get = (req, res) => {
   res.render('login');
}

module.exports.signup_post = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.create({ email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });

      // if user id is sent, then the auth is successful
      res.status(201).json({ user: user._id });
   }
   catch (err) {
      const errors = handleErrors(err);

      // if errors are sent, then the auth is unsuccessful
      res.status(400).json({ errors });
   }

}

module.exports.login_post = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });

      // if user id is sent, then the auth is successful
      res.status(201).json({ user: user._id });
   } catch (err) {
      const errors = handleErrors(err);

      // if errors are sent, then the auth is unsuccessful
      res.status(400).json({ errors });
   }
}

module.exports.logout_get = async (req, res) => {
   res.cookie("jwt", "", { maxAge: 1 });
   res.redirect("/");
};
