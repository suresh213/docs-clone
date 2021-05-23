const ENDPOINT = require('./constants');

const io = require('socket.io')(3005, {
  cors: {
    origin: ENDPOINT,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('send-changes', (delta) => {
    console.log(delta);
    socket.broadcast.emit('recieve-changes', delta);
  });
});
