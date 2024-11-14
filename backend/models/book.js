const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: {type:String,require:true},
 // description: String,
  //imageUrl: String,  // Image URL of the book
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
