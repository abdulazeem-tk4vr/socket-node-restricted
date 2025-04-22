const { Server } = require("socket.io");
const { io: ioClient } = require("socket.io-client");

// SERVER A

// server hosting at port 3000
const io = new Server(3000, {
  /* options */
});

console.log("The Process for Node A has started");

// node A acting as a client connecting to server for node A
const AsocketToB = ioClient("http://localhost:4000");
AsocketToB.emit("server-msg", "hello");

io.on("connection", (clientSocket) => {
  console.log("Server A : new socket connected", clientSocket.id);

  // Incoming message from webClient 1
  clientSocket.on("client-msg", (msg) => {
    console.log("The incoming message from client 1 is", msg);
    // as soon as I received a msg from the client, send it to node B
    AsocketToB.emit("server-msg", msg);
  });

  // Incoming message from Node B
  clientSocket.on("server-msg", (msg) => {
    console.log("The incoming message from node B is", msg);
    // send the incming msg from the server to the client
    io.emit("restricted-msg", msg);
  });
});
