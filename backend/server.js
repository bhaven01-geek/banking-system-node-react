const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const connection = require('./config')

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes')
const bankerRoutes = require('./routes/bankerRoutes')

app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/banker', bankerRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
