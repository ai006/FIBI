// /backend/router/deleteRouter.js
const express = require('express');



//import Jobs from Schema.js
const Jobs = require('../Schema');

//initialize the router
const router = express.Router();

// this is our delete method
// this method removes existing job from the database
//based on the id entered from AdminClient
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;

    //console.log("id to delete "+  id);
     Jobs.findByIdAndDelete(id, (err) => {
       if (err) return res.send(err);
      return res.json({ success: true });
    });
  });

  
  module.exports = router;