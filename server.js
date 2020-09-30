if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs'); //View engine here is us specifying the file type we want express to use
app.set('views', __dirname + '/views'); //MVC 
app.set('layout', 'layouts/layout') //Holds all the beginning and ending of HTML pages (header & footer)
app.use(expressLayouts);
app.use(express.static('public')); //Where our public files will be (stylesheets,)

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', error => console.log('Connected to Mongoose'));


app.use('/', indexRouter); // Telling server to use indexRouter route


app.listen(process.env.PORT || 3000);

