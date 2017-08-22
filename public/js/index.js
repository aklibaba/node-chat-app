const socket = io();
const locationBtn = $('.send-location');

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

function formatTime(timestamp) {
  return new moment(timestamp).format('h:mm a');
}

socket.on('newMessage', data => {
  $('.messages').append(`<li><span class="message-time">${formatTime(data.createdAt)}</span>${data.from}: ${data.text}</li>`);
});

socket.on('newLocationMsg', data => {
  const li = $('<li>');
  const a = $('<a target="_blank">My current location</a>');
  const span = $('<span class="message-time">');
  span.text(formatTime(data.createdAt));
  li.append(span);
  li.append(`${data.from}: `);
  a.attr('href', data.url);
  li.append(a);


  $('.messages').append(li);
  locationBtn.attr('disabled', false).text('Send location');
});


$('.message-form').on('submit', e => {
  e.preventDefault();
  const input = $(e.target).find('input[name="message"]');
  const text = input.val();
  socket.emit('createMessage', {
    from: 'User',
    text
  }, () => {
    input.val('');
  });
});

locationBtn.on('click', e => {
  if ( !navigator.geolocation ) {
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  function onSuccess(pos) {
    locationBtn.attr('disabled', true).text('Sending location...');
    socket.emit('createLocationMsg', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  }

  function onError(err) {
    console.log('Unable to fetch location', err);
  }

});
