import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import Edit and Delete icons

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div className="p-4 rounded-md">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-sky-950 shadow-lg hover:shadow-xl hover:shadow-gray-950 shadow-gray-950 p-6 rounded-lg flex flex-col justify-between"
          >
            <div className="mb-4 hover:scale-105 transition duration-300">
              <h3 className="text-gray-100 text-xl font-semibold mb-2 hover:text-white">{book.title}</h3>
              <p className="font-md text-base text-gray-100 mb-2 italic font-serif">Author : {book.author}</p>
              <p className="text-sm text-white">{book.description}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => onDelete(book._id)}
                className=" mr-3 bg-red-600 hover:shadow-lg shadow-md shadow-gray-900 hover:shadow-gray-950 hover:bg-red-700 hover:scale-110 transition duration-200 text-white p-2 rounded-full focus:outline-none"
                aria-label="Delete book"
              >
                <FaTrashAlt className="hover:scale-125 transition duration-200" />
              </button>
              <button
                onClick={() => onEdit(book)}
                className="bg-yellow-500 hover:shadow-lg shadow-md shadow-gray-900 hover:shadow-gray-950 hover:bg-yellow-600 hover:scale-110 transition duration-200 text-white p-2 rounded-full focus:outline-none"
                aria-label="Edit book"
              >
                <FaEdit className="hover:scale-125 transition duration-200" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
