const express = require('express');


//import forum qiestions from the database
const Jobs = require('../../forumSchema');

//initialize the router
const router = express.Router();



// this is our get method
// this method fetches all available questions from the database
router.get('/getQuestions', (req, res) => {
    Jobs.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

module.exports = router;  //same as export default router;
