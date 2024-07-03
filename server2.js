const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8765 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(JSON.stringify({type: 1, message: 'Hello from Server 2'}));
  });
});

console.log('WebSocket server running on port 8765');
