const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMsg} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const users = new Users();

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    const userThatLeft = users.removeUser(socket.id);
    if ( userThatLeft ) {
      io.to(userThatLeft.room).emit('updateUserList', users.getUserList(userThatLeft.room));
      io.to(userThatLeft.room).emit('newMessage', generateMessage('Admin', `${userThatLeft.name} has left the room`));
    }
  });

  socket.emit('newMail', {
    from: 'alex@mail.com',
    text: 'some bla bla bla'
  });

  socket.on('join', (params, callback) => {
    const name = params.name;
    const room = params.room;
    if ( !isRealString(name) || !isRealString(room) ) {
      return callback('Name and room name are required')
    }

    //subscribe the current user to the room he typed in the login page
    socket.join(room);

    //make sure there is no other user with the same id
    users.removeUser(socket.id);

    //add current user the the user list
    users.addUser(socket.id, name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));
    //notify the current user he has joined the chat
    socket.emit('newMessage', generateMessage('Admin', `Hi ${name}, Welcome to the chat app`));

    //notify only user in same room that a new user has joined
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined chat`));

  });

  socket.on('createMessage', (data, callback) => {
    const user = users.getUser(socket.id);
    if ( user ) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, data.text));
      callback();
    }
  });

  socket.on('createLocationMsg', data => {
    const user = users.getUser(socket.id);
    if ( user ) {
      io.to(user.room).emit('newLocationMsg', generateLocationMsg(
        user.name,
        data.latitude,
        data.longitude)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


