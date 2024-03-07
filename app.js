var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");

// ---------------- GENERAL SETUP ------------------

require("dotenv").config();

var app = express();

app.use(express.urlencoded({ extended: false }));

// ---------------- DATABASE CONNECTION ------------------

// Connect to MongoDB
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(compression());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

// ---------------- SESSION SETUP ------------------

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING,
    }),
  })
);

// ---------------- PASSPORT AUTHENTICATION ------------------

require("./config/passport");

app.use(passport.session());

// ---------------- ROUTES ------------------

var indexRouter = require("./routes/index");
app.use(indexRouter);

// ---------------- ERROR HANDLERS ------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { user: req.isAuthenticated() });
});

module.exports = app;
