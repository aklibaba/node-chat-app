const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'new user joined chat'));

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.emit('newMail', {
    from: 'alex@mail.com',
    text: 'some bla bla bla'
  });

  socket.on('createMessage', data => {
    io.emit('newMessage', generateMessage(data.from, data.text));
  })
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


