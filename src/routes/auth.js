import express from 'express';
import { authController } from '../controller/authController';
const router = express.Router();


router.get('/api/auth', authController);