const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Blackboard from server side");
});

const port = 2000;
app.listen(port, () => {
  console.log("Blackboard is runnnig on 2000");
});
