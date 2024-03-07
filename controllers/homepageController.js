const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// GET request for / , load all messages
exports.homepage_message_list = asyncHandler(async (req, res, nxet) => {
  const allMessages = await Message.find().exec();

  // Check to see if there is a user field (logged in) and if so check the status
  if (req.isAuthenticated()) {
    res.render("index", {
      messages: allMessages,
      user: true,
      status: req.user.status,
    });
  } else {
    //For users who aren't logged in
    res.render("index", { messages: allMessages });
  }
});
