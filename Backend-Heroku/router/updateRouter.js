const express = require('express');


//import Jobs from '../Schema';
const Jobs = require('../Schema');

//initialize the router
const router = express.Router();

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Jobs.findByIdAndUpdate(id, update, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

 
module.exports = router;  //export default router;
