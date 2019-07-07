import express, { Router } from 'express';

//import router from './router';
import Data from '../data';

//initialize the router
const router = Router();



// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    Data.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  });

export default router;