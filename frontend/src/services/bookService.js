import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


export const getAllBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// New updateBook function
export const updateBook = async (bookData) => {
  const response = await axios.put(`${API_URL}/${bookData._id}`, bookData);
  return response.data;
};
