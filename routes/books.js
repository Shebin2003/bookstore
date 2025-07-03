const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const { readData, writeData } = require('../utils/fileHelper');
const BOOKS_FILE = './data/books.json';

router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    let books = await readData(BOOKS_FILE);
    if (req.query.genre) {
      books = books.filter(b => b.genre === req.query.genre);
    }
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || books.length;
    const start = (page - 1) * limit;
    res.json(books.slice(start, start + limit));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const books = await readData(BOOKS_FILE);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    const newBook = { 
      id: uuidv4(), 
      title, 
      author, 
      genre, 
      publishedYear, 
      userId: req.user.id 
    };
    const books = await readData(BOOKS_FILE);
    books.push(newBook);
    await writeData(BOOKS_FILE, books);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const books = await readData(BOOKS_FILE);
    const index = books.findIndex(b => b.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: "Book not found" });
    if (books[index].userId !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    books[index] = { ...books[index], ...req.body };
    await writeData(BOOKS_FILE, books);
    res.json(books[index]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let books = await readData(BOOKS_FILE);
    const book = books.find(b => b.id === req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.userId !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    books = books.filter(b => b.id !== req.params.id);
    await writeData(BOOKS_FILE, books);
    res.json({ message: "Book deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
