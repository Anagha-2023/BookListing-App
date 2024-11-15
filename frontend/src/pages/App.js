import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { getAllBooks, createBook, deleteBook, updateBook } from '../services/bookService';
import { XIcon } from '@heroicons/react/solid';
import { FaPlus } from 'react-icons/fa';
import CursorFollow from '../components/CursorFollow';

const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track whether we are editing or adding
  const [currentBook, setCurrentBook] = useState(null); // Track the current book being edited
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks((prevBooks) => {
        const uniqueBooks = [...new Map(data.map((book) => [book._id, book])).values()];
        return uniqueBooks;
      });
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (bookData) => {
    const { title, author, description, imageUrl } = bookData;
    const bookExists = books.some((book) => book.title === title && book.author === author);

    if (bookExists) {
      setErrorMessage('This book already exists!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    } else {
      setErrorMessage('');
      const newBook = await createBook({ title, author, description, imageUrl });
      setBooks((prevBooks) => [...prevBooks, newBook]);
      setIsModalOpen(false);
      setSuccessMessage('Book added successfully!');
    }
  };

  const handleEditBook = async (bookData) => {
    const updatedBook = await updateBook(bookData);
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
    );
    setIsModalOpen(false);
    setSuccessMessage('Book updated successfully!');
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book._id !== id));
  };

  const handleEditClick = (book) => {
    setIsEditMode(true);
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        {successMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-8/12 bg-opacity-90 sm:w-2/5 md:w-1/4 bg-green-500 text-white py-2 px-4 rounded-md text-center shadow-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-8/12 bg-opacity-90 sm:w-2/5 md:w-1/4 bg-red-500 text-white py-2 px-4 rounded-md text-center shadow-lg">
            {errorMessage}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-8 text-center text-sky-950">BookHive</h1>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setCurrentBook(null);
          }}
          className="absolute top-8 shadow-md hover:scale-105 right-8 bg-sky-900 text-white py-2 px-4 rounded-md flex items-center"
        >
          Add Book
          <FaPlus className="ml-2 text-white" />
        </button>


        <BookList books={books} onDelete={handleDeleteBook} onEdit={handleEditClick} />

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <XIcon className="h-6 w-6" />
              </button>
              <BookForm
                onSubmit={isEditMode ? handleEditBook : handleAddBook}
                initialData={currentBook} // Pass current book data for editing
                errorMessage={errorMessage}
                successMessage={successMessage}
              />
            </div>
          </div>
        )}
      </div>
      <CursorFollow />
    </Layout>
  );
};

export default App;
