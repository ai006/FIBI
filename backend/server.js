import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';

import router from './router/mainRouter'; //taken form file router.js

const API_PORT = 3001; //port to listen on
const app = express();
app.use(cors());

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://ai006:Qwerty1234@wesponsorapp-8krvn.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

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