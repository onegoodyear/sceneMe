const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ message: "Authentication required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user; // Attach user to the request object
    next();
  } catch (e) {
    res.status(401).send({ message: "Invalid token" });
  }
};
