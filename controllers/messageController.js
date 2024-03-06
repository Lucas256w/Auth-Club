const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET request for /homepage , load all messages
exports.message_list = asyncHandler(async (req, res, nxet) => {
  const allMessages = Message.find().exec();

  // Check to see if there is a user field (logged in) and if so check the status
  if (req.isAuthenticated() && req.user.status === "admin") {
    res.send("index", {
      messages: allMessages,
      user: req.user,
      member: true,
      admin: true,
    });
  } else if (req.user.status === "member") {
    res.send("index", {
      messages: allMessages,
      user: req.user,
      member: true,
    });
  } else {
    //For users who aren't logged in
    res.send("index", { meesages: allMessages, user: req.user });
  }
});
