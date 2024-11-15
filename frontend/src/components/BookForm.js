import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaPlus } from 'react-icons/fa';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  description: yup.string().required('Description is required'),
});

const BookForm = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialData || {}, // Populate the form with initialData for editing
  });

  const handleFormSubmit = async (data) => {
    onSubmit(data, setError);
    reset();  // Reset form fields after submission
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData ? 'Edit Book' : 'Add New Book'}
      </h2>

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
        >
          {initialData ? 'Update Book' : 'Add Book'}
          <FaPlus className="inline-block ml-2 text-white text-lg" />
        </button>
      </form>
    </div>
  );
};

export default BookForm;
