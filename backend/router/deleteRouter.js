import express, { Router } from 'express';

//import router from './router';
import Data from '../data';
import { type } from 'os';

//initialize the router
const router = Router();

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
   
    console.log("id is type "+ typeof id);
    Data.findByIdAndDelete(id, (err) => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  });

  export default router;