var socket = io();

//declaration of variables to communicate to the HTML
var sensorAppsOutput = document.getElementById('sensorAppsOutput'),
commandsContentOutput = document.getElementById('commandsContentOutput'),
start = document.getElementById('start'),
pause = document.getElementById('stop'),
list = document.getElementById('list'),
test = document.getElementById('test'),
scenario = document.getElementById('scenario')

;



  // Emit events
  start.addEventListener('click', function(){
    //socket.emit receices two parameters: name of the message and content.
    socket.emit('ClientStart', {
        message: 'START',
        handle: scenario.value
    });
    message.value = "START";
  });

  pause.addEventListener('click', function(){
    //socket.emit receices two parameters: name of the message and content.
    socket.emit('ClientStop', {
        message: 'STOP',
        handle: scenario.value
    });
    message.value = "STOP";
  });

  test.addEventListener('click', function(){
    //socket.emit receices two parameters: name of the message and content.
    socket.emit('ClientTest', {
        message: 'TEST',
        handle: scenario.value
    });
    message.value = "TEST";
  });

  list.addEventListener('click', function(){
    //socket.emit receices two parameters: name of the message and content.
    socket.emit('ClientList', {
        message: 'LIST',
        handle: scenario.value
    });
    message.value = "LIST";
  });


  // Listen for events
  socket.on('message', function(data){
    commandsContentOutput.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    //feedback.innerHTML ='';
});

socket.on('scenarioUsers', function(data){
    sensorAppsOutput.innerHTML ='';
    for(var i=0; i<data.sensorApps.length; i++)
    {
        sensorAppsOutput.innerHTML += '<p><strong>' + data.sensorApps[i].appName + '</p>';
    }
    
});
socket.on('UPDATE', function(data){
    var applicationValue = scenario.value + 'C';
    socket.emit('ClientUpdate', {
      application: applicationValue,
      scenario: scenario.value
    });
  });