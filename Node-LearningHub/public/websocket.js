var socket = io();

//declaration of variables to communicate to the HTML
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback'),
      scenario = document.getElementById('scenario'),
      application = document.getElementById('application')
      ;

      // Emit events
btn.addEventListener('click', function(){
    //socket.emit receices two parameters: name of the message and content.
    socket.emit('ClientMessage', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
  });

  message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

  // Listen for events
socket.on('message', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML ='';
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
socket.on('UPDATE', function(data){
  socket.emit('ClientUpdate', {
    application: application.value,
    scenario: scenario.value
  });
});