const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dontenv = require("dotenv");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routers");

const app = express();
const server = http.Server(app);
const io = socketio(server);

dontenv.config({ path: "./src/config/config.env" });

mongoose.connect(`${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = [];

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
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

app.listen(3333);
