// booksController.js
import Book from '../models/Book.js';

const booksController = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Create a new book (without file upload)
  createBook: async (req, res) => {
    const { title, author, description } = req.body;

    // Create a new book object without the imageUrl field
    const book = new Book({ title, author, description });

    try {
      const newBook = await book.save();
      console.log("Book Details:", newBook);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a book by id
  deleteBook: async (req, res) => {
    const { id } = req.params;

    try {
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default booksController;
