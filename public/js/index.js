const socket = io();

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});


socket.on('newMessage', data => {
  console.log(data);
});

socket.emit('createMessage', {
  from: 'alvaro.negredo@gmai.com',
  text: 'Hey I just scored'
});


