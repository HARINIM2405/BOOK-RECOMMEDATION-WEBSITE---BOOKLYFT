const express = require('express');
const Book = require('../models/book');
const router = express.Router();

// Route to add book to wishlist
router.post('/add-to-wishlist', async (req, res) => {
  const { title, authors} = req.body;

  const newBook = new Book({
    title,
    authors,
    //description,
    //imageUrl,
  });

  try {
    await newBook.save();
    res.status(201).json({ message: 'Book added to wishlist', book: newBook });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book to wishlist', error });
  }
});

// Route to get all books in the wishlist
router.get('/wishlist', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist', error });
  }
});

module.exports = router;
