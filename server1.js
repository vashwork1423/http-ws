const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const message = req.body.message || 'Hello from HTTP client';

  const ws = new WebSocket('ws://localhost:8765');

  ws.on('open', () => {
    ws.send(message);
  });

  ws.on('message', (response) => {
		const jsonObject = JSON.parse(response.toString())
    res.send(`Received from Server 2: ${response}`);
    ws.close();
  });

  ws.on('error', (error) => {
    res.status(500).send(`WebSocket error: ${error.message}`);
  });
});

app.listen(8060, () => {
  console.log('HTTP server running on port 8060');
});
