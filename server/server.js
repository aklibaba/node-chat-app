const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'new user joined chat',
    createdAt: new Date().getTime()
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.emit('newMail', {
    from: 'alex@mail.com',
    text: 'some bla bla bla'
  });

  socket.on('createMessage', data => {
    io.emit('newMessage', {
      from: data.from,
      text: data.text,
      createdAt: new Date().getTime()
    })
  })
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


