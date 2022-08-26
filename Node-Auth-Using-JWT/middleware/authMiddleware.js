const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt;

   // check if json web token exists & is verified
   if (token) {
      jwt.verify(token, 'rohith-node-auth-secret', (err, decodedToken) => {
         if (err) {
            res.redirect("/login");
         } else {
            next();
         }
      });
   } else {
      res.redirect("/login");
   }
};

// check current user
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt;

   if (token) {
      jwt.verify(token, 'rohith-node-auth-secret', async (err, decodedToken) => {
         if (err) {
            res.locals.user = null;
            next();
         } else {
            // decoded token has the user id
            let user = await User.findById(decodedToken.id);
            // making the user details accessible to views using "locals"
            res.locals.user = user;
            next();
         }
      });
   } else {
      res.locals.user = null;
      next();
   }
}

module.exports = { requireAuth, checkUser };