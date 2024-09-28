const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/update", authenticate, updateUser);

router.post("/delete", authenticate, deleteUser);

module.exports = router;
