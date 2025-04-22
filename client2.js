const { io: ioClient } = require("socket.io-client");
const clientToB = ioClient("http://localhost:4000");
const readline = require("readline");

console.log("The Process for Client 2 has started");

let timeToTalk = true;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\n💬 Enter message: ",
});

// client-side
clientToB.on("connect", () => {
  console.log("The connection socket to B has connected", clientToB.id);
  if (timeToTalk) rl.prompt();
});

clientToB.on("disconnect", () => {
  console.log("A socket has disconnected", clientToB.id);
});

// When a message is received from Node B, it's the client's turn to talk
clientToB.on("restricted-msg", (msg) => {
  console.log("\n📥 The incoming message from node B and client 1 is:", msg);
  console.log("\n");
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

  // Once message sent, wait for response
  timeToTalk = false;
  clientToB.emit("client-msg", message);
});

rl.on("close", () => {
  console.log("👋 Exiting");
  process.exit(0);
});
