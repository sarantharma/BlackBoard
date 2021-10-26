const express = require("express");
const fs = require("fs"); // Require to read file
const morgon = require("morgan");

const app = express();

//1) Middlewares

app.use(morgon("dev"));

// Middleware used to convert data to JSON format (Basically used in POST request)
app.use(express.json());

// Read the file and Reformate it
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/courses-simple.json`)
);

// 2) Route Handlers
// Courses
const getAllCourses = (req, res) => {
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
};

const getCourse = (req, res) => {
  const id = req.params.id * 1; // String to a number by multiplying
  const course = courses.find((el) => el.id === id);

  //   if (id >= courses.length) {
  if (!course) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

const updateCourse = (req, res) => {
  if (req.params.id * 1 >= courses.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    tour: "<Updated courses is here>",
  });
};

const createCourse = (req, res) => {
  const newId = courses[courses.length - 1].id + 1;
  // Object.assign create a new object by merging two existing objects together
  console.log(req.body);
  const newCourse = Object.assign({ id: newId }, req.body);

  courses.push(newCourse);
  fs.writeFile(
    `${__dirname}/dev-data/courses-simple.json`,
    JSON.stringify(courses),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          course: newCourse,
        },
      });
    }
  );
};

const deleteCourse = (req, res) => {
  if (req.params.id * 1 >= courses.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
};

// Users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

// app.get("/api/v1/courses", getAllCourses);
// app.post("/api/v1/courses", createCourse);
// app.get("/api/v1/courses/:id", getCourse);
// app.patch("/api/v1/courses/:id", updateCourse);
// app.delete("/api/v1/courses/:id", deleteCourse);

// 3) Routes

const courseRouter = express.Router();
const userRouter = express.Router();

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/courses", userRouter);

courseRouter.route("/").get(getAllCourses).post(createCourse);

courseRouter
  .route("/:id")
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 2000;
app.listen(port, () => {
  console.log("Blackboard is runnnig on 2000");
});
