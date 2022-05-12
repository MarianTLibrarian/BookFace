const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const path = require('path');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

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


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


function tokenGenerator(userName, room) {
  const twilioAccountSid = "ACdae279537bb04063d528bc06648dbb30";
  const twilioApiKey = "SKbb5b2c7f61ae912b2858a3d616794847";
  const twilioApiSecret = "4Us5B8UGqzgAw5GQrODU8urFtKtrtN5M";

  const identity = userName;

  const videoGrant = new VideoGrant({
    room: room,
  });
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );
  token.addGrant(videoGrant);
  return token.toJwt()
}

app.post("/token", (req, res) => {
  const asynch = async () => {
    const userName = req.body.userName;
    const room = req.body.room;
    const token = await tokenGenerator(userName, room);
    res.json(token);
  }
  asynch()
})

server.listen(PORT, () => console.info(`Server listening on port ${PORT}\n`));
