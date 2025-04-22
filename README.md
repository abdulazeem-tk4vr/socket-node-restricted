# Socket.io Restricted Relay Chat

A simple distributed chat system where two clients communicate through separate Node.js servers that relay messages between them.

## Overview

This project demonstrates a relay-based socket architecture where:

- Client 1 connects only to Node A
- Client 2 connects only to Node B
- Node A and Node B connect to each other
- Messages follow a specific path: Client → Node → Other Node → Other Client

The system ensures strict isolation between clients while still enabling communication through a controlled relay mechanism.

## Technical Implementation

- **Socket.io**: Used for real-time bidirectional communication
- **Turn-based protocol**: Ensures orderly communication between clients
- **Terminal interface**: Simple readline-based UI for client interaction

## How It Works

```
Client 1 ⟷ Node A ⟷ Node B ⟷ Client 2
```

The system enforces a turn-based messaging protocol where clients take turns sending messages.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the servers and clients in separate terminals:
   ```bash
   # Terminal 1
   node serverA.js

   # Terminal 2
   node serverB.js

   # Terminal 3
   node client1.js

   # Terminal 4
   node client2.js
   ```

## Usage

1. Client 1 starts the conversation
2. After sending a message, a client must wait for a response
3. Type `exit` in any client terminal to close the connection

## Message Flow Example

1. Client 1 types a message → Node A receives it (`client-msg` event)
2. Node A forwards to Node B (`server-msg` event)
3. Node B delivers to Client 2 (`restricted-msg` event)
4. Client 2 can now respond, following the same path in reverse

## Project Structure

- `serverA.js` & `serverB.js`: The two Node.js servers
- `client1.js` & `client2.js`: Terminal-based client applications
- `index.html`: Web client interface (alternative to terminal clients)

## Requirements Satisfied

- Client 1 cannot directly communicate with Client 2 or Node B
- Client 2 cannot directly communicate with Client 1 or Node A
- Messages flow through both nodes before reaching the destination client
- Communication works in both directions

## Why This Architecture?

This design has several practical applications:

- **Security**: Enforcing strict communication paths
- **Controlled Communication**: Managing the flow of information
- **Message Processing**: Allowing each node to process/transform messages
- **Network Segmentation**: Isolating clients while enabling communication

## Future Improvements

- Add user authentication
- Implement message history
- Create a web-based UI
- Add support for multiple clients per node