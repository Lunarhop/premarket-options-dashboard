const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

function randomActivity() {
  return {
    symbol: 'AAPL',
    type: Math.random() > 0.5 ? 'Call' : 'Put',
    strike: (190 + Math.floor(Math.random() * 20)) * 1,
    expiry: '2025-07-18',
    volume: Math.floor(Math.random() * 20000 + 1000),
    oi_change: Math.floor(Math.random() * 5000)
  };
}

function buildMessage() {
  return {
    module: 'options_heatmap',
    data: {
      put_call_ratio: (0.5 + Math.random()).toFixed(2),
      dark_pool_activity: Math.random() > 0.5 ? 'Above Average' : 'Below Average',
      unusual_activity: [randomActivity()]
    }
  };
}

wss.on('connection', ws => {
  console.log('WebSocket client connected');
  const sendUpdate = () => {
    const msg = buildMessage();
    ws.send(JSON.stringify(msg));
  };
  const interval = setInterval(sendUpdate, 5000);
  sendUpdate();

  ws.on('close', () => {
    clearInterval(interval);
  });
});

console.log('Real-time server running on ws://localhost:8081');
