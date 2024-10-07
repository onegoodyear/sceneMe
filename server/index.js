const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/users", require("./routes/user"));
app.use("/lists", require("./routes/list"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose
  .connect(process.env.mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

app.listen(process.env.port, () => {
  console.log("Server is running on port", process.env.port);
});
