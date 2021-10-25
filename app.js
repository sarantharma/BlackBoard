const express = require("express");
const fs = require("fs"); // Require to read file
const { toUSVString } = require("util");

const app = express();

// Middleware used to convert data to JSON format (Basically used in POST request)
app.use(express.json());

// Read the file and Reformate it
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/courses-simple.json`)
);

app.get("/api/v1/courses", (req, res) => {
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
});

app.post("/api/v1/courses", (req, res) => {
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
});

const port = 2000;
app.listen(port, () => {
  console.log("Blackboard is runnnig on 2000");
});
