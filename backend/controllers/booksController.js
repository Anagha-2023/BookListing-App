import Book from '../models/Book.js';

const booksController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createBook: async (req, res) => {
    const { title, author, description } = req.body;
    const book = new Book({ title, author, description });

    try {
      const newBook = await book.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteBook: async (req, res) => {
    const { id } = req.params;

    try {
      await Book.findByIdAndDelete(id);
      res.status(200).json({ message: 'Book deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // New updateBook method
  updateBook: async (req, res) => {
    const { id } = req.params;
    const { title, author, description, imageUrl } = req.body;

    try {
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { title, author, description, imageUrl },
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default booksController;
