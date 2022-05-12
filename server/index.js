const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

/*
* Live video chat
*/
const {AccessToken} = require('twilio').jwt;
const {VideoGrant} = AccessToken;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const compression = require('compression');

const app = express();
const server = http.createServer(app);

function generateToken(username, roomName) {
  const identity = username;
  const videoGrant = new VideoGrant({
    room: roomName,
  });
  const token = new AccessToken(
    accountSid,
    apiKey,
    apiSecret,
    {identity: identity}
  );
  token.addGrant(videoGrant);
  return token.toJwt()
}

app.post("/token", (req, res) => {
  const asynch = async () => {
  const username = req.body.username;
  const roomName = req.body.roomName;
  const token = await generateToken(username, roomName);

  console.log('token', token)
  console.log('typeof token', typeof token)

  res.json(token);
  }
  asynch()
})

/*
* Live chat
*/
const { Server } = require('socket.io');

// const morgan = require('morgan');
const PORT = process.env.PORT || 3030;
const router = require('./routes');

app.use(cors());
app.use(express.json());
app.use(compression());
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

server.listen(PORT, () => console.info(`Server listening on port ${PORT}\n`));
