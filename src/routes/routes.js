import express from 'express';

import hotelRouter from './hotels.js';
import userRouter from "./users.js";


const router = express.Router();

router.use("/hotels", hotelRouter);
router.use("/users",userRouter);

export default router;