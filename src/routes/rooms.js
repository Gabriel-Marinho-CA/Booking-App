import express from 'express';
import {roomsController} from "../controller/roomsController";
const router = express.Router();


router.get('/api/rooms', roomsController);