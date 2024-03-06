import express from 'express';
import {
    verifyAdmin
} from '../utils/verifyToken.js';

import RoomsController from '../controller/roomsController.js';

const roomRouter = express.Router();

// HOTELS
roomRouter.get("/:id", RoomsController.getRooms);
roomRouter.get("/", RoomsController.getAllRooms);
roomRouter.post('/:id', verifyAdmin, RoomsController.createRooms);
roomRouter.put("/:id", verifyAdmin, RoomsController.updateRooms);
roomRouter.delete("/:id/:hotelId", verifyAdmin, RoomsController.deleteRooms);

export default roomRouter;