
import express, { Router } from 'express';

//import router from './router';
// import Data from '../data';
import userAddedJobs from '../userAddedSchema'

//initialize the router
const router = Router();

// this is our create method
// this method adds new data in our database
router.post('/userAddedJob', (req, res) => {

    console.log("in user added router");
    console.log(req.body);
    // let Job = new Jobs();
    // const { id, job } = req.body;
    // if ((!id && id !== 0) || !job) {
    //   return res.json({
    //     success: false,
    //     error: 'INVALID INPUTS',
    //   });
    // }
    // console.log(job)
    // Job.id = job.id;
    // Job.CompanyName = job.CompanyName;
    // Job.logo = job.logo;
    // //Job.address.street = job.address.street;
    // Job.address.city = job.address.city;
    // Job.address.cityArr = job.address.cityArr;
    // Job.address.country = job.address.country;
    // Job.address.countryArr = job.address.countryArr;
    // Job.link = job.link;
    // Job.jobs = job.jobs;
    // Job.jobsArr = job.jobsArr;
    // Job.about = job.about;

   
    // Job.save((err) => {
    //   if (err) return res.json({ success: false, error: err });
    //   return res.json({ success: true });
    // });
  });

  export default router;