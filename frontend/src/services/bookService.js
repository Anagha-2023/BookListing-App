import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

export const getAllBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  console.log("Response",response.data)
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};