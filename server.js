var express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    db = require('./models/datamodels/db'),
    http = require('http').Server(app);
    io = require('socket.io')(http);

var app = express();
app.options('*', cors()); // include before other routes
app.use(cors());
//var db = mongoose.connect('mongodb://localhost:27017/aruntest');

//DATA MODELS
var RegisteredUser = require('./models/datamodels/registeredUsersModel');
var RegisteredStaff = require('./models/datamodels/registeredStaffsModels');
var Subscription = require('./models/datamodels/subscriptionsModels');
var AccidentHelp = require('./models/datamodels/accidentHelpModels');
var PoliceHelp = require('./models/datamodels/policeHelpModels');



var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CONTROLLER MODELS
registeredUserRouter = require('./controllers/datacontrollers/routesRegisteredUsers')(RegisteredUser);
registeredStaffRouter = require('./controllers/datacontrollers/routesRegisteredUsers')(RegisteredStaff);
subscriptionRouter = require('./controllers/datacontrollers/routesSubscription')(Subscription);
accidenthelpRouter = require('./controllers/datacontrollers/routesAccidentHelp')(AccidentHelp);
policehelpRouter = require('./controllers/datacontrollers/routesPoliceHelp')(PoliceHelp);

app.use('/api/registeredusers', registeredUserRouter); 
app.use('/api/registeredstaffs', registeredStaffRouter); 
app.use('/api/subscription', subscriptionRouter); 
app.use('/api/accidenthelp', accidenthelpRouter); 
app.use('/api/policehelp', policehelpRouter); 

app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Nodmon is running my app on  PORT: ' + port);
});