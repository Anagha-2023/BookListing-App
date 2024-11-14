import express from 'express';
import booksController from '../controllers/booksController.js';  // Add the correct file extension

const router = express.Router();

router.get('/', booksController.getAllBooks);
router.post('/',booksController.createBook);
router.delete('/:id', booksController.deleteBook);

export default router;  // Exporting the router as default
