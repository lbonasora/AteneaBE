const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Book = require('../models/book');

//POST


router.post('/', (req, res, next) => {
    const booksData = req.body.books; 

    // Create an array to store the created books
    const createdBooks = [];

    if (!Array.isArray(booksData)) {
        return res.status(400).json({ error: 'Invalid data format or missing "books" key' });
    }

    if (booksData.length === 0) {
        return res.status(400).json({ error: 'No books provided in the request' });
    }

    // Loop through the books data and create Book instances
    booksData.forEach(bookData => {
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            title: bookData.title,
            author: bookData.author,
            publicationYear: bookData.publicationYear,
            genre: bookData.genre,
            publisher: bookData.publisher,
            ISBN: bookData.ISBN,
            url: bookData.url
        });

        // Save each book to the database
        book.save()
            .then(result => {
                console.log(result);
                createdBooks.push(result);
                if (createdBooks.length === booksData.length) {
                    // If all books have been created, send the response
                    res.status(201).json({
                        message: 'Handling POST Request to /books',
                        createdBooks: createdBooks
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
});

//GET

router.get('/:bookId', (req, res, next) => {
    const id = req.params.bookId;

    if(id == "special"){
        res.status(200).json({
            message: 'Youve discovered the special id'
        })
    } else {
        res.status(200).json({
            message: 'You passed an id, good for you'
        })
    }
});

router.get('/', (req, res, next) => {
    Book.find()

    .exec()
    .then(docs => {

        const response = {
            count: docs.length,
            books: docs.map(doc => {
                return {
                    id: doc.id,
                    title: doc.title,
                    author: doc.author,
                    ISBN: doc.ISBN,
                    publicationYear: doc.publicationYear,
                    genre: doc.genre,
                    publisher: doc.publisher,
                    url: doc.url
                }
            })
        }

        console.log("From databe", docs);
        res.status(200).json(response);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

//PATCH

router.patch('/:bookId', (req, res, next) => {
    const id = req.params.bookId;

   res.status(200).json({
    message: 'deleted product!'
   })
});

module.exports = router;