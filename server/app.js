const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const app = express()
const Student = require('./db/Student')

// static middleware
app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api', require('./api'))

// app.get("*", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "public", "index.html"));
//   });

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message });
});
module.exports = app;

