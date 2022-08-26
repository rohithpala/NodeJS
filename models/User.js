const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
   },
   password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
   }
});

// fire this function before a document is saved to db
// to hash the password and then save it
userSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

// static method to login the user
userSchema.statics.login = async function (email, password) {
   const user = await this.findOne({ email });
   if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth)
         return user;
      throw Error("Incorrect Password");
   }
   throw Error("Incorrect Email");
};

const User = mongoose.model('user', userSchema);

module.exports = User;
