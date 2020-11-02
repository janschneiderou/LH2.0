const http = require('http');
const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const webSocketStuff = require('./WebSocketController/webSocketHandler');
const scenarioRoutes = require('./routes/scenarioRoutes');
const sensorAppsRoutes = require('./routes/sensorAppsRoutes');

const PORT = process.env.PORT || 5000;

// App setup
const app = express();
global.server = http.createServer(app);
const io = socket(global.server);

//database connection to Mongodb
const dbURI = 'mongodb+srv://nodeTutorial:1234@mongoblogtest.pqutw.mongodb.net/LearningHub-Test?retryWrites=true&w=majority';

mongoose.connect(dbURI, {userNewUrlParser: true, seUnifiedTopology: true})
    .then((result)=> {
        console.log('connected to db'); 
    });
        
        


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});



//routes 
app.get('/', (req,res)=>{
    res.redirect('/scenario');
});

//scenario routes
app.use('/scenario',scenarioRoutes);

//sensorApps routes
app.use('/sensor',sensorAppsRoutes);

//chat page
app.get('/chat', (req,res)=>{
    res.render('chat', { title: 'websockets' });
    console.log('hi');
    console.log('the server is' + server);
    webSocketStuff.ioInt(server, null, null);
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });



 

  //listen for requests


global.server.listen(PORT, ()=>{
    console.log('listening for requests on port: '+ PORT);
});


