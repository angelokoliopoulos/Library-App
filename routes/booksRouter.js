const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");

// get all books for a user
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("books");
    res.status(200).json({ success: true, data: user.books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
});

// post a book for a user
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    const user = await User.findById(req.user._id);
    user.books.push(book._id);
    await user.save();
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

// delete a book for a user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.books.pull(req.params.id);
    await user.save();
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, msg: `No book with id : ${req.params.id}` });
    }
    res.status(200).json({ msg: `${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

// get a book for a user by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, msg: `No book with id : ${req.params.id}` });
    }
    if (!book.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        msg: "You are not authorized to access this resource",
      });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
