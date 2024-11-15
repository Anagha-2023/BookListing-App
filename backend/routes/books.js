import express from 'express';
import booksController from '../controllers/booksController.js';  // Add the correct file extension

const router = express.Router();

router.get('/', booksController.getAllBooks);
router.put('/:id', booksController.updateBook);  // Add this line for updating a book
router.post('/',booksController.createBook);
router.delete('/:id', booksController.deleteBook);

export default router;  // Exporting the router as default
