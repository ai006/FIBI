import express, { Router } from 'express';


import updateRouter from './updateRouter';
import deleteRouter from './deleteRouter';
import addRouter from './addRouter';
import getRouter from './getRouter';
import userAddedJob from './userAddedRouter'

//initialize the router
const router = Router();

router.use('/',updateRouter);
router.use('/',deleteRouter);
router.use('/',addRouter);
router.use('/',getRouter);
router.use('/',userAddedJob);


export default router;
