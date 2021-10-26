const express = require("express");
const morgon = require("morgan");

const courseRouter = require("./routes/courseRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

//1) Middlewares

app.use(morgon("dev"));

// Middleware used to convert data to JSON format (Basically used in POST request)
app.use(express.json());

// 3) Routes

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
