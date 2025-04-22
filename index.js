const { Server } = require("socket.io");
const io = new Server(4000, {});

console.log("The process has started");

io.on("connection", (socket) => {
  console.log(
    "I have received an incoming connection from the server at A",
    socket.id,
  );
});
