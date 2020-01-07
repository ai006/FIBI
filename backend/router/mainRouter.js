// /server/router/mainRouter.js
const express = require('express');

//import from files
const updateRouter = require('./updateRouter');
const deleteRouter = require('./deleteRouter');
const addRouter = require('./addRouter');
const getRouter = require('./getRouter');
const userAddedJob = require('./userAddedRouter');


//initialize the router
const router = express.Router();

router.use('/',updateRouter);   //route for updating a job
router.use('/',deleteRouter);   //route for deleting a job
router.use('/',addRouter);      //route for adding a job
router.use('/',getRouter);      //route for getting all the jobs
router.use('/',userAddedJob);   //route for adding jobs

module.exports = router;

