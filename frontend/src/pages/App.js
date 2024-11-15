import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { getAllBooks, createBook, deleteBook } from '../services/bookService';
import { XIcon } from '@heroicons/react/solid'; // Import close icon
import { FaPlus } from 'react-icons/fa'; // Import plus icon
import CursorFollow from '../components/CursorFollow';

const App = () => {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks((prevBooks) => {
        // Filter out duplicates (assuming `_id` is unique for each book)
        const uniqueBooks = [...new Map(data.map((book) => [book._id, book])).values()];
        return uniqueBooks;
      });
    };
    fetchBooks();
  }, []);
  

  const handleAddBook = async (bookData) => {
    const { title, author, description, imageUrl } = bookData;
    
    // Check if the book already exists
    const bookExists = books.some(book => book.title === title && book.author === author);
    if (bookExists) {
      console.log('Book already exists!');
      return; // Prevent adding duplicate books
    }
  
    const newBook = await createBook({ title, author, description, imageUrl });
    
    // Update local state directly after adding a new book
    setBooks((prevBooks) => [...prevBooks, newBook]);
  
    setIsModalOpen(false); // Close modal after adding
  };
  

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    setBooks(books.filter((book) => book._id !== id));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 relative">
        <h1 className="text-4xl font-bold mb-8 text-center text-sky-950">BookHive</h1>

        {/* Add Book Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-8 right-8 bg-sky-900 text-white py-2 px-4 rounded-md hover:bg-blue-950 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
        >
          Add Book
          <FaPlus className="ml-2 text-white" /> {/* Plus icon */}
        </button>

        {/* Book List */}
        <BookList books={books} onDelete={handleDeleteBook} />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <XIcon className="h-6 w-6" aria-hidden="true" /> {/* Close icon */}
              </button>
              <BookForm onSubmit={handleAddBook} setShowModal={setIsModalOpen} /> {/* Pass setShowModal */}
            </div>
          </div>
        )}
        
        {/* Cursor Follower */}
        <CursorFollow />
      </div>
    </Layout>
  );
};

export default App;
