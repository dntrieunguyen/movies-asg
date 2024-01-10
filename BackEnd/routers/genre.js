import express from 'express';
import { getGenre } from '../controllers/genre.js';

const router = express.Router();

router.get('/', getGenre);

export default router;
