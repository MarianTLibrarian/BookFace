const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const compression = require('compression');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const router = require('./routes');

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/pages')));
app.use('/', router);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3030;
server.listen(PORT, () => console.info(`Server listening on port ${PORT}\n`));
