const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET request for /homepage , load all messages
exports.homepage_message_list = asyncHandler(async (req, res, nxet) => {
  const allMessages = Message.find().exec();

  // Check to see if there is a user field (logged in) and if so check the status
  if (req.isAuthenticated() && req.user.status === "admin") {
    res.render("index", {
      messages: allMessages,
      user: req.user,
      member: true,
      admin: true,
    });
  } else if (req.isAuthenticated() && req.user.status === "member") {
    res.render("index", {
      messages: allMessages,
      user: req.user,
      member: true,
    });
  } else if (req.isAuthenticated() && req.user.status === "non-member") {
    res.render("index", {
      messages: allMessages,
      user: req.user,
    });
  } else {
    //For users who aren't logged in
    res.render("index", { messages: allMessages });
  }
});
