const socket = require('socket.io');
const util = require('util');

const socketInt=socket;


var apps = [];

// Join sensorApp to scenarioChatRoom
function scenarioJoin( appName, scenario) {
  const app = {  appName, scenario };
//   console.log('apps before =' );
//   console.log(util.inspect(apps, {showHidden: false, depth: null}));
  apps.push(app);
//   console.log('apps after =' );
//   console.log(util.inspect(apps, {showHidden: false, depth: null}));
  return apps;
}

// Get subscribed apps
function getScenarioUsers(scenario) {
    return apps.filter(appName => appName.scenario === scenario);
  }

function getScenario(appName)
{
    for (i=0;i<apps.length;i++)
    {
        if(apps[i].appName == appName)
        {
            return apps[i].scenario;
            break;
        }
    }
    return null;
    
}
  // App disconnects 
function appDisconnects(id) {
    // var index=-1;
    // console.log('socket id: ' + id);
    // for(var i=0;i<apps.length;i++)
    // {
    //     if(id == apps[i].id)
    //     {
    //         index=i;
    //         break;
    //     }
    // }
    // console.log('index:' + index);
    
  
    // if (index > -1) 
    // {
    //    return apps.splice(index, 1);
    // }
    
  }


//socket setup
const ioInt = (sensor, scenario)=>
{
    console.log('entering to the websocket stuff ');
    const io = socket(global.server);
    io.on('connection',(socket)=>{
        console.log('made socket connection: '+ socket.id + ' sensor:'+ sensor);
        
        //join Scenario
        if(sensor != null)
        {
            const sensorApp = scenarioJoin( sensor, scenario); 

           // console.log(util.inspect(sensorApp, {showHidden: false, depth: null}));

            socket.join(scenario);  
            console.log('joined scenario');


            apps = [];
            // Send users and room info
            io.to(scenario).emit('UPDATE', 'hi');
            console.log('update send');
        }
        

        // //join Scenario
        // socket.on('joinRoom', ({ username, room }) => {
        //     const app = userJoin(socket.id, username, room);
        
        //     socket.join(app.room);
        
        //     // Welcome current user
        //    // socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
        
        //     // Broadcast when a user connects
        //     socket.broadcast
        //       .to(user.room)
        //       .emit(
        //         'message',
        //         formatMessage( `${user.username} has joined the chat`)
        //       );
        
        //     // Send users and room info
        //     io.to(user.room).emit('roomUsers', {
        //       room: user.room,
        //       users: getRoomUsers(user.room)
        //     });
        //   });

        //sending message
        socket.on('ClientMessage', (data)=>{
           // io.sockets.emit('message',data);
           console.log('the handle is ' + data.handle);
            const scenario = getScenario(data.handle);
            //const app = getScenarioUsers(scenario);
            console.log('Emit message to scenario ' + scenario);
            io.to(scenario).emit('message', data);
        });

        //sending message
        socket.on('ClientList', (data)=>{

            const scenario = data.handle;
            console.log('list of apps in scenario ' + scenario );
          //  console.log(util.inspect(socket, {showHidden: false, depth: null}));
            io.to(scenario).emit('scenarioUsers', {
                scenario: scenario,
                sensorApps: getScenarioUsers(scenario)
              });
        });
        

        //sending message
        socket.on('ClientUpdate', (data)=>{

            const application = data.application;
            const scenario = data.scenario;
            console.log('udpating list: ' + application);
            const sensorApp = scenarioJoin( application, scenario); 

        });

        //sending message
        socket.on('ClientStart', (data)=>{

            console.log('the handle is ' + data.handle);
            const scenario = data.handle;
            //const app = getScenarioUsers(scenario);
            console.log('Emit message to scenario ' + scenario);
            io.to(scenario).emit('message', data);
        }); 

        //sending message
        socket.on('ClientStop', (data)=>{

            console.log('the handle is ' + data.handle);
            const scenario = data.handle;
            //const app = getScenarioUsers(scenario);
            console.log('Emit message to scenario ' + scenario);
            io.to(scenario).emit('message', data);
        }); 

        //sending message
        socket.on('ClientTest', (data)=>{

            console.log('the handle is ' + data.handle);
            const scenario = data.handle;
            //const app = getScenarioUsers(scenario);
            console.log('Emit message to scenario ' + scenario);
            io.to(scenario).emit('message', data);
        }); 

         // Handle typing event
        socket.on('typing', (data)=>{
            socket.broadcast.emit('typing', data);
         });

         socket.on('disconnect', (data)=> {
            console.log('disconnect!', socket.id);

            // console.log('before removing');
            // console.log(util.inspect(apps, {showHidden: false, depth: null}));
            const diconnectedApp = appDisconnects(socket.id);
            // console.log('after removing');
            // console.log(util.inspect(apps, {showHidden: false, depth: null}));
            // console.log('removed element');
            // console.log(util.inspect(diconnectedApp, {showHidden: false, depth: null}));


            if (diconnectedApp) {
                io.to(diconnectedApp.scenario).emit('controllerDisconnect',
                  `${diconnectedApp.appName} has disconnected`
                );
                 
                

                // Send users and room info
                io.to(diconnectedApp.scenario).emit('scenarioUsers', {
                    scenario: diconnectedApp.scenario,
                    sensorApps: getScenarioUsers(diconnectedApp.scenario)
                });
              }

        });

    });
}



module.exports = {
    socketInt,
    ioInt
}