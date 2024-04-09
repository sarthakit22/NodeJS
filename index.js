const express = require('express');
const database = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const studentRouter = require("./Controller/Student");
const teacherRouter = require("./Controller/Teacher");
const app = express();

//set view engine
app.set('view engine','ejs');
app.use('/views/images', express.static('./views/images'));
app.set('view options', {
    layout: false
});

//cookie parser
app.use(cookieParser());

// main page
app.get('/', function (req, res) {
    res.render('main');
});

//connected mongoDb to the application.
database.connect("mongodb+srv://sarthakaryait22:w4YlpaU8AnTuTjGv@result-application.p426il3.mongodb.net/?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Route for student and teacher
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.get('*', (req, res) => {
    res.render('pageNotFound');
    // res.status(404).send('Page not found!');
});

require("dotenv").config();
app.listen('8000', () => {
    console.log("Server is Started");
});

// Nodemon monitors the index file for any changes and automatically restarts it when modifications occur.
