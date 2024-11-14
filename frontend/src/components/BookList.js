import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons (optional, you can also use other icon libraries)

const BookList = ({ books, onDelete }) => {
  return (
    <div className="p-4  rounded-md ">
      {/* <h2 className="text-2xl font-bold mb-4">Books</h2> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-sky-950 shadow-lg shadow-gray-700 p-6 rounded-lg flex flex-col justify-between"
          >
            <div className="mb-4 hover:scale-105 transition duration-300">
              <h3 className="text-gray-100 text-xl font-semibold mb-2 hover:text-white ">{book.title}</h3>
              <p className="text-sm text-gray-200 mb-2 ">Author: {book.author}</p>
              <p className="text-sm text-gray-100 ">{book.description}</p>
            </div>
            <button
              onClick={() => onDelete(book._id)}
              className="self-end bg-red-600  hover:bg-red-700 hover:scale-110 transition duration-200 text-white p-2 rounded-full focus:outline-none"
              aria-label="Delete book"
            >
              <FaTrashAlt className='hover:scale-125 transition duration-200' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
