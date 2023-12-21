const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Loan = require('../models/loans');

router.get('/:loansId', (req, res, next) => {

    const id = req.params.loansId;
    Loan.findById(id)
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                message: 'No Valid entry found for provided id'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.get('/', (req, res, next) => {
    Loan.find()

    .exec()
    .then(docs => {

        const response = {
            count: docs.length,
            loans: docs.map(doc => {
                return {
                    date: doc.date,
                    expirationDate: doc.expirationDate,
                    bookId: doc.bookId
                }
            })
        }

        console.log("From databe", docs);
        res.status(200).json(docs);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', (req, res, next) => {
    const loan = new Loan({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        expirationDate: req.body.expirationDate,
        bookId:req.body.bookId
    });

    loan.save()
    .then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST Request to /loans',
            createdLoan: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    
});

router.delete('/:loanId', (req, res, next) => {
    const id = req.params.loanId;

    Loan.deleteOne({ _id: id})
    .exec()
    .then(res => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;