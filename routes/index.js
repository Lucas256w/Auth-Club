const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const homepageController = require("../controllers/homepageController");

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

module.exports = router;
