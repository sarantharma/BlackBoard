const fs = require("fs"); // Require to read file

// Read the file and Reformate it
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/courses-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`This is ${val}`);
  if (req.params.id * 1 >= courses.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.code || !req.body.description) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or code or description",
    });
  }
};

exports.getAllCourses = (req, res) => {
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
};

exports.getCourse = (req, res) => {
  const id = req.params.id * 1; // String to a number by multiplying
  const course = courses.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

exports.updateCourse = (req, res) => {
  res.status(200).json({
    status: "success",
    tour: "<Updated courses is here>",
  });
};

exports.createCourse = (req, res) => {
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

exports.deleteCourse = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
