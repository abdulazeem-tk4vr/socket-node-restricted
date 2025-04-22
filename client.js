const { io } = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("The connection has started for the socket", socket.id);
  console.log("\n");
  rl.prompt();
});

socket.on("chat-message", (msg) => {
  console.log("The incoming message is", msg);
});

socket.on("disconnect", () => {
  console.log("This dude disconnected", socket.id); // undefined
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\n💬 Enter message: ",
});

// Loop-like behavior via readline prompt

rl.on("line", (line) => {
  const message = line.trim();

  if (message === "exit") {
    rl.close();
    return;
  }

  // Send message to server (or log it)
  socket.emit("chat-message", message);
  // remember to have a new line before the prompt command is called everytime to avoid removing the previous line of stdout
  console.log("/n");
  rl.prompt();
});

rl.on("close", () => {
  console.log("👋 Exiting");
  process.exit(0);
});
