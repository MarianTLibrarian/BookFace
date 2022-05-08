const express = require('express');
const path = require('path');
require('dotenv').config();

// const morgan = require('morgan');

const router = require('./routes');

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../assets')));

app.use('/', router);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.info(`Server listening on port ${PORT}\n`));
