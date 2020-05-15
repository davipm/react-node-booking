const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require('socket.io');
const http = require('http');

const routes = require("./routers");

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(
  "mongodb://davipereira:607616davi@ds139632.mlab.com:39632/backend",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const connectedUser = [];

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;
  connectedUser[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUser = connectedUser;
  return next();
});

// GET, POST, PUT, DELETE
app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
