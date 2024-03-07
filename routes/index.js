const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const homepageController = require("../controllers/homepageController");

// CHECK IF USER IS AUTHENTICATED MIDDLEWARE
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

// GET request for homepage, load all messages (with conditions according to user status, see message_list for details)
router.get("/", homepageController.homepage_message_list);

// GET request for login page, load login form
router.get("/log-in", formController.login_form);

// POST request for login page, log user in if correct credentials
router.post("/log-in", formController.login_form_post);

// GET request for signup page, load signup form
router.get("/sign-up", formController.signup_form);

// POST request for signup page, make new user if all conditions passed
router.post("/sign-up", formController.signup_form_post);

// GET request for message form page, displays message form (only available to authenticated users)
router.get("/message-form", isAuth, formController.message_form);

// POST request for message form page
router.post("/message-form", isAuth, formController.message_form_post);

module.exports = router;
