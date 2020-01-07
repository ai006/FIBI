// /backend/router/router.js

const express = require('express');

//import jobs from Schema.js
const Jobs = require('../Schema')

//initialize the router
const router = express.Router();


// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {

    let Job = new Jobs();
    const { id, job } = req.body;         //get ID and job details from post request from the AdminClient
    if ((!id && id !== 0) || !job) {      //check to make sure the new ID is not found in the database
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }
    console.log(job)                      //assigning the details of the job sent from the POST request to the schema
    Job.id = job.id;
    Job.CompanyName = job.CompanyName;
    Job.logo = job.logo;
    Job.educationLevel = job.educationLevel;
    Job.address.city = job.address.city;
    Job.address.cityArr = job.address.cityArr;
    Job.address.country = job.address.country;
    Job.address.countryArr = job.address.countryArr;
    Job.link = job.link;
    Job.jobs = job.jobs;
    Job.jobsArr = job.jobsArr;
    Job.about = job.about;

   
    Job.save((err) => {                     //saving the new the job into the database
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  //export default router;
  module.exports = router;