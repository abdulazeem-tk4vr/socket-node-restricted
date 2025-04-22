const { io: ioClient } = require("socket.io-client");
const clientToA = ioClient("http://localhost:3000");
const readline = require("readline");

console.log("The Process for Client 1 has started");

let timeToTalk = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\n💬 Enter message: ",
});

// client-side
clientToA.on("connect", () => {
  console.log("The connection socket to A has connected", clientToA.id); // x8WIv7-mJelg7on_ALbx
  rl.prompt();
});

clientToA.on("disconnect", () => {
  console.log("A socket has disconnected", clientToA.id); // undefined
});

clientToA.on("restricted-msg", (msg) => {
  console.log("The incoming message from Node A and client 2 is", msg);
  timeToTalk = true;
  rl.prompt();
});

// Loop-like behavior via readline prompt

rl.on("line", (line) => {
  const message = line.trim();

  if (message === "exit") {
    rl.close();
    return;
  }

  if (!timeToTalk) {
    console.log("⛔ Wait! It's not your turn to send a message. \n");
    return;
  }
  timeToTalk = false;
  // Send message to server (or log it)
  clientToA.emit("client-msg", message);
});

rl.on("close", () => {
  console.log("👋 Exiting");
  process.exit(0);
});
