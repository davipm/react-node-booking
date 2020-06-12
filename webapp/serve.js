const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dontenv = require("dotenv");
const morgan = require('morgan');

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routers");

const app = express();
const server = http.Server(app);
const io = socketio(server);

dontenv.config();

mongoose.connect(`${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "uploads")));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.use(routes);

app.listen(3333);
