// REQUIRES
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./controllers/errorController");
const express = require("express");
const app = express();

// BUILT IN ROUTE
app.use(express.json());

// ROUTES
app.use("/tours", tourRouter);
app.use("/users", userRouter);

// UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  const err = new Error(`can't find ${req.originalUrl} on this server`);
  err.statusCode = 404;
  err.status = "fail";
  return next(err);
});

// MIDDLEWARE FOR ERROR HANDILING
app.use(globalErrorHandler);
module.exports = app;
