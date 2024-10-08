const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Allow requests from 'localhost:3000' (your React app) or any other origin
const allowedOrigins = ["http://localhost:3000", "https://sceneme.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or authentication headers
};

app.use(cors(corsOptions));

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
