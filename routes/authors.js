//Note: in react/node land, MVC (Model, Views, Controller) 
//is known as MVR (Model, Views, Routes)

const express = require('express');
const Author = require('../models/author');
const router = express.Router();

//All authors route
router.get('/', async (req, res) => {
    let searchOptions = {}
    //Since it's a get request, we don't need req.BODY.query. Only POST requests need that
    if(req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors, 
            searchOptions: req.query 
        })
    } catch {
        res.redirect('/');
    }
})

//New Authors route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
})

//Create author route 
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`authors`);
    } catch {
        res.render('authors/new', {
            author: author, 
            errorMessage: 'Error creating Author'
        })
    }
})

module.exports = router;