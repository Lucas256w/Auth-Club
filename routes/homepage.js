const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// GET request for homepage, load all messages (with conditions according to user status, see message_list for details)
router.get("/", messageController.message_list);

module.exports = router;
