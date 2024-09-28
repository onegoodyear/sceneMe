const { default: mongoose } = require("mongoose");
const List = require("../models/List");

exports.getLists = async (req, res) => {
  try {
    const userId = req.user._id;
    const lists = await List.find({ user_id: userId });
    res.status(200).json(lists);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.createList = async (req, res) => {
  try {
    const { name, items } = req.body;
    const userId = req.user._id;

    if (!name || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const newList = new List({
      user_id: userId,
      name,
      items,
    });
    await newList.save();
    res.status(201).json(newList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;

    if (!name && !items) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const list = await List.findOne({ _id: id, user_id: req.user._id });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (name) {
      list.name = name;
    }
    if (items) {
      list.items = items;
    }

    await list.save();
    res.status(200).json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const list = await List.findOneAndDelete({ _id: id, user_id: userId });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).send({ message: "List deleted successfully", list });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getListsById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const lists = await List.find({ user_id: userId });
    if (!lists.length) {
      return res.status(404).json({ message: "User has no lists" });
    }
    res.status(200).json(lists);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
