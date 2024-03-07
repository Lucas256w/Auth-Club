const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");
const messageController = require("../controllers/messageController");

// GET request for homepage, load all messages (with conditions according to user status, see message_list for details)
router.get("/", messageController.message_list);

// GET request for login page, load login form
router.get("/login", formController.login_form);

// POST request for login page, log user in if correct credentials
router.post("/login", formController.login_form_post);

module.exports = router;
