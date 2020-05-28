const express = require('express');


//import Jobs from the database
const Jobs = require('../Schema');

//initialize the router
const router = express.Router();



// this is our get method
// this method fetches all available jobs from the database
router.post('/search', (req, res) => {
    
    Jobs.find({CompanyName: req.body.job}, function(err, data) {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    })
  });

module.exports = router;  //same as export default router;
