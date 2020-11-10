const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const bdd = require('./models/db'); 

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');

// var helmet = require('helmet');
// app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static('./images/'));

app.use(bodyParser.json())

app.use('/user/', userRoutes);
app.use('/posts/', postsRoutes);
app.use('/profile/', userRoutes);
// app.use('/dashBoard/', adminboardRoutes);

module.exports = app;
