const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

// Allow requests from 'localhost:3000' (your React app) or any other origin
const allowedOrigins = ["http://localhost:3000", "https://sceneme.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies or authentication headers
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", require("./routes/user"));
app.use("/lists", require("./routes/list"));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 10000;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
