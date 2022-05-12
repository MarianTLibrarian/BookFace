const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const path = require('path');


const { Server } = require('socket.io');

require('dotenv').config();

// const morgan = require('morgan');
const PORT = process.env.PORT || 3030;
const router = require('./routes');

app.use(cors());
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../client/pages')));
app.use('/', router);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`connected user: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log('disconnected user', socket.id);
  });
});


server.listen(PORT, () => console.info(`Server listening on port ${PORT}\n`));
