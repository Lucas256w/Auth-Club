const User = require("../models/user");
const Message = require("../models/message");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const user = require("../models/user");
require("dotenv").config();

// ------------------------------------ LOGIN FORM ---------------------------------------

// GET request for login form page
exports.login_form = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  res.render("login_form");
};

// POST request for login form page, loads error if fails, redirect to homepage if pass
exports.login_form_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login_form", { message: "Failed to log in" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

// ------------------------------------ SIGNUP FORM ---------------------------------------

// GET request for signup page, loads signup form
exports.signup_form = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  }
  res.render("signup_form");
};

// POST request for signup page, adds user to database
exports.signup_form_post = [
  //validation and sanitizatize
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long")
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .escape(),
  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm Password does not match password")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // hash password and set it to user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      status: "non-member",
    });

    // validator picked up errors return them
    if (!errors.isEmpty()) {
      res.render("signup_form", { errors: errors.array(), user: user });
    } else {
      // if username already exist return error
      const userExist = await User.findOne({
        username: req.body.username,
      }).exec();

      if (userExist) {
        res.render("signup_form", { message: "Username already exists" });
      }
      await user.save();

      res.redirect("/log-in");
    }
  }),
];

// ------------------------------------ MESSAGE FORM ---------------------------------------

// GET request for message form, display message form
exports.message_form = (req, res, next) => {
  res.render("message_form", {
    user: req.isAuthenticated(),
    status: req.user.status,
  });
};

// POST request for message form
exports.message_form_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Must have a title")
    .escape(),
  body("message")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Must have a message")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.user._id,
      date: Date.now(),
    });

    if (!errors.isEmpty()) {
      res.render("message_form", { user: req.user, errors: errors });
    } else {
      await message.save();

      res.redirect("/");
    }
  }),
];

// ------------------------------------ SECRET CODE FORM ---------------------------------------

// GET request for secret code form (MEMBER)
exports.secret_form_member = (req, res, next) => {
  if (req.user.status === "member" || req.user.status === "admin") {
    res.redirect("/");
  }
  res.render("secret_form", {
    user: req.isAuthenticated(),
    status: "non-member",
  });
};

// POST request for secret code form (MEMBER)
exports.secret_form_member_post = [
  body("code").trim().escape(),

  asyncHandler(async (req, res, next) => {
    if (req.body.code === process.env.MEMBER_CODE) {
      await User.updateOne(
        { _id: req.user._id },
        { $set: { status: "member" } }
      ).exec();
      res.redirect("/");
    } else {
      res.render("secret_form", {
        message: "Incorrect Code",
        status: "non-member",
      });
    }
  }),
];

// GET request for secret code form (ADMIN)
exports.secret_form_admin = (req, res, next) => {
  if (req.user.status === "admin") {
    res.redirect("/");
  }
  res.render("secret_form", {
    user: req.isAuthenticated(),
    status: "member",
  });
};

// POST request for secret code form (ADMIN)
exports.secret_form_admin_post = [
  body("code").trim().escape(),

  asyncHandler(async (req, res, next) => {
    if (req.body.code === process.env.ADMIN_CODE) {
      await User.updateOne(
        { _id: req.user._id },
        { $set: { status: "admin" } }
      ).exec();
      res.redirect("/");
    } else {
      res.render("secret_form", {
        message: "Incorrect Code",
        status: "member",
      });
    }
  }),
];
