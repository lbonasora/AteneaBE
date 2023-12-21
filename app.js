const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const booksRoutes = require('./api/routes/books');
const loansRoutes = require('./api/routes/loans');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://lbonasora09:PVINrqvgnSk6MTBJ@node-library-db.yeb92t4.mongodb.net/')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method == 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH. DELETE')
        return res.status(200).json({});
    }

    next();
})

app.use('/loans', loansRoutes);
app.use('/books', booksRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;