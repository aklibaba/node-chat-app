const socket = io();
const locationBtn = $('.send-location');

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});


socket.on('newMessage', data => {
  const template = $('#message-template').html();
  const html = Mustache.render(template, {
    text: data.text,
    from: data.from,
    createdAt: formatTime(data.createdAt)
  });
  $('.messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMsg', data => {
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from: data.from,
    createdAt: formatTime(data.createdAt),
    url: data.url
  });
  $('.messages').append(html);
  locationBtn.attr('disabled', false).text('Send location');
  scrollToBottom();
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
