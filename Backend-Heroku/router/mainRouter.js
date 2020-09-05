// /server/router/mainRouter.js
const express = require('express');

//import from files
const updateRouter = require('./updateRouter');
const deleteRouter = require('./deleteRouter');
const addRouter = require('./addRouter');
const getRouter = require('./getRouter');
const userAddedJob = require('./userAddedRouter');
const searchRouter = require('./searchRouter');
const typesOfJobs = require('./typesOfJobsDB');
const getForumQuestions = require('./forum/getForumRouter');
const addForumData = require('./forum/addForumRouter');
const sendMail = require('./sendMail');
const getNews = require('./news/getNews')

//initialize the router
const router = express.Router();

router.use('/',updateRouter);   //route for updating a job
router.use('/',deleteRouter);   //route for deleting a job
router.use('/',addRouter);      //route for adding a job
router.use('/',getRouter);      //route for getting all the jobs
router.use('/',userAddedJob);   //route for adding jobs
router.use('/',searchRouter);   //route for getting specific jobs
router.use('/',typesOfJobs);   //route for getting specific jobs
router.use('/',getForumQuestions);  //route for fetching all the questions in forum
router.use('/',addForumData);     //router for adding questions in the datase
router.use('/',sendMail);        //router for sending all the emails
router.use('/',getNews);        //router for fetching all the news in the database

module.exports = router;

