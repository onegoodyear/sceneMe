const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  sendUser
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/update", authenticate, updateUser);

router.post("/delete", authenticate, deleteUser);

router.post("/me", authenticate, sendUser);

router.post("/logout", authenticate, (req, res) => {
  res.status(200).send({ message: "Logout successful" });
});

module.exports = router;
