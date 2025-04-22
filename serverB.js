const { Server } = require("socket.io");
const { io: ioClient } = require("socket.io-client");

// SERVER B

// server hosting at port 4000
const io = new Server(4000, {
  /* options */
});

console.log("The Process for Node B has started");

// node B acting as a client connecting to server for node A
const BsocketToA = ioClient("http://localhost:3000");

io.on("connection", (socket) => {
  console.log("Server B : new socket connected", socket.id);

  // Incoming message from Client 2 and then send it to node A
  socket.on("client-msg", (msg) => {
    console.log("The incoming message from client 2 is", msg);
    BsocketToA.emit("server-msg", msg);
  });

  // Incoming message from Node A and then send it to client
  socket.on("server-msg", (msg) => {
    console.log("The incoming message from node A is", msg);
    io.emit("restricted-msg", msg);
  });
});
