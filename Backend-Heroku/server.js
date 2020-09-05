const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');


//taken form file router.js
const router = require('./router/mainRouter');  


let API_PORT = process.env.PORT;      //get the port environment variable
if(API_PORT == null || API_PORT == ""){ 
      API_PORT = 3001;              //port to listen to if evironment is not set
}

//const API_PORT = 3001; //port to listen on
const app = express();
app.use(cors());

/*
**************************************************************************************************************************
**************************************************************************************************************************
**************************************************************************************************************************
              GET IN TOUCH WITH ME TO GET ACCESS TO OUR DATABASE 
              see read me in master branch for more info
**************************************************************************************************************************
**************************************************************************************************************************
***************************************************************************************************************************
*/
const dbRoute =
  ' GET IN TOUCH WITH ME TO GET AN ACCESS KEY TO OUR DATABASE ';

// connects our back end code with the database
//mongoose.connect(dbRoute, { useNewUrlParser: true },{useUnifiedTopology: true});
mongoose.connect(dbRoute, {useUnifiedTopology: true,useNewUrlParser: true,})
  .then(() => console.log('DB Connected!'))
  .catch(err => {
          console.log(`DB Connection Error: ${err.message}`);
  });


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.once('open', () => console.log('connection to the database fully secured'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
const server = app.listen(API_PORT, () => {
    const { address, port } = server.address();
    console.log(`Listening at http://${address}:${port}`);
  });