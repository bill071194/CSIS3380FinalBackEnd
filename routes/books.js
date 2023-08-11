const router = require('express').Router();
let Book = require('../models/booklist.model');

// Getting all books
router.route('/').get((req, res) => {
  Book.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err));
});


// Adding a new book
router.route('/').post(async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const description = req.body.description;
  // create a new Book object
  const newBook = await new Book({
    title, author, description
  });

  console.log(newBook);
  // save the new object (newBook)
  newBook
    .save()
    .then(() => res.json('Book added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Get a specific book by id
router.route('/:id').get((req, res) => {
  console.log('Book Id: ' + req.params.id);
  Book.findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Updating book by ID
router.route('/:id').post(async (req, res) => {
    console.log('Book Id: ' + req.params.id);
    await Book.findById(req.params.id)
      .then((bookforedit) => {
        bookforedit.title = req.body.title;
        bookforedit.author = req.body.author;
        bookforedit.description = req.body.description;
  
        bookforedit
          .save()
          .then(() => res.json('Book updated!'))
          .catch((err) => res.status(400).json('Error: ' + err));
      })
      .catch((err) => res.status(400).json('Error: ' + err));
  });


// Deleting book by ID
router.route('/:id').delete(async (req, res) => {
    console.log('Book Id: ' + req.params.id);
    await Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted.'))
        .catch((err) => res.status(400).json('Error: ' + err));
});


module.exports = router;
