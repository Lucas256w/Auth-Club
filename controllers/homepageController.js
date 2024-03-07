const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET request for / , load all messages
exports.homepage_message_list = asyncHandler(async (req, res, nxet) => {
  const allMessages = await Message.find().exec();

  // Check to see if there is a user field (logged in) and if so check the status
  if (req.isAuthenticated() && req.user.status === "admin") {
    res.render("index", {
      messages: allMessages,
      member: true,
      user: req.isAuthenticated(),
      admin: true,
    });
  } else if (req.isAuthenticated() && req.user.status === "member") {
    res.render("index", {
      messages: allMessages,
      user: req.isAuthenticated(),
      member: true,
    });
  } else if (req.isAuthenticated() && req.user.status === "non-member") {
    res.render("index", {
      messages: allMessages,
      user: req.isAuthenticated(),
    });
  } else {
    //For users who aren't logged in
    res.render("index", { messages: allMessages });
  }
});
