import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  description: yup.string().required('Description is required'),
});

const BookForm = ({ onSubmit, setShowModal }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
    if (isSubmitting) return; // Prevent submitting again while already submitting
    setIsSubmitting(true);
  
    try {
      const createBookResponse = await axios.post('http://localhost:5000/api/books', data);
      console.log("Book created successfully:", createBookResponse.data);
      onSubmit(createBookResponse.data);
      setSuccessMessage('Book added successfully!');
      reset();
      setTimeout(() => setShowModal(false), 2000);
    } catch (error) {
      console.error('Error creating book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Book</h2>

      {successMessage && (
        <div className="p-4 mb-4 bg-green-100 text-green-800 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className={`w-full px-4 py-2 rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            id="author"
            type="text"
            {...register('author')}
            className={`w-full px-4 py-2 rounded-md border ${errors.author ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows="4"
            className={`w-full px-4 py-2 rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <button
  type="submit"
  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
  disabled={isSubmitting}
>
  {isSubmitting ? 'Adding...' : 'Add Book'}  {/* Text appears first */}
  <FaPlus className="inline-block ml-2 text-white text-lg" /> {/* Icon appears after the text */}
</button>


      </form>
    </div>
  );
};

export default BookForm;
