const User = require("../models/user");
const Message = require("../models/message");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.login_form = asyncHandler(async (req, res, next) => {
  res.render("login_form");
});

exports.login_form_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login_form", { error: "Failed to log in" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};
