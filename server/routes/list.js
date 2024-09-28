const express = require("express");
const router = express.Router();
const List = require("../models/List");
const { authenticate } = require("../middlewares/auth");
const {
  getLists,
  createList,
  updateList,
  deleteList,
  getListsById,
} = require("../controllers/listController");

router.get("/", authenticate, getLists);

router.post("/", authenticate, createList);

router.put("/:id", authenticate, updateList);

router.delete("/:id", authenticate, deleteList);

router.get("/:id", getListsById);

module.exports = router;
