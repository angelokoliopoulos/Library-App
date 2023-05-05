const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
