const express = require("express");
const fs = require("fs"); // Require to read file
const { toUSVString } = require("util");

const app = express();

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

const port = 2000;
app.listen(port, () => {
  console.log("Blackboard is runnnig on 2000");
});
