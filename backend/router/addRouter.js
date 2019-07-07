
import express, { Router } from 'express';

//import router from './router';
import Data from '../data';

//initialize the router
const router = Router();

// this is our create method
// this method adds new data in our database
router.post('/putData', (req, res) => {
    let data = new Data();
  
    const { id, message } = req.body;
  
    if ((!id && id !== 0) || !message) {
      return res.json({
        success: false,
        error: 'INVALID INPUTS',
      });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });


  export default router;