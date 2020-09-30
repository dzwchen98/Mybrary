//Note: in react/node land, MVC (Model, Views, Controller) 
//is known as MVR (Model, Views, Routes)

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

module.exports = router;