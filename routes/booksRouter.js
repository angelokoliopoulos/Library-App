const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error });
  }
});

//post a book
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

//delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id });
    if (book.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, msg: `No book with id : ${req.params.id}` });
    }
    res.status(200).json({ msg: `${req.params.id} deleted` });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

//get book by id
router.get("/:id", async (req, res) => {
  const bookID = req.params.id;
  try {
    const book = await Book.findOne({ _id: bookID });
    if (!book) {
      return res
        .status(404)
        .json({ success: false, msg: `No book with id : ${bookID}` });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
