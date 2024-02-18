import express from 'express';
import HotelsController from "../controller/HotelsController.js";
import {
    authController
} from '../controller/authController.js';
import {
    usersController
} from '../controller/usersController.js';

import {
    roomsController
} from '../controller/roomsController.js';

const router = express.Router();

// ROUTES | MIddlewares


// HOTELS
router.post('/hotels', HotelsController.createHotel);



router.get('/api/auth', authController);
router.get('/api/users', usersController);

router.get('/api/rooms', roomsController);

export default router;