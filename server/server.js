const ENDPOINT = require('./constants');

const io = require('socket.io')(3005, {
  cors: {
    origin: ENDPOINT,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('get-document', (documentId) => {
    const documentData = 'hello';
    socket.join(documentId);
    socket.emit('load-document', documentData);

    socket.on('change-name', (name) => {
      console.log(name);
      socket.broadcast.to(documentId).emit('recieve-name-change', name);
    });
    socket.on('send-changes', (delta) => {
      //   console.log(delta);
      socket.broadcast.to(documentId).emit('recieve-changes', delta);
    });
  });
});
