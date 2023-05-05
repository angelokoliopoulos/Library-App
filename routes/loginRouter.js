const express = require("express");
const passport = require("passport");

const router = express.Router();

// define login route
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
