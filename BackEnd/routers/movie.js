import express from 'express';
import {
   getTopRate,
   getTrending,
   getDiscover,
   getVideo,
   search,
} from '../controllers/movie.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/trending', getTrending);
router.get('/top_rate', getTopRate);
router.get('/discover/', getDiscover);
router.post('/video/search', verifyToken, search);
router.post('/video/:id', verifyToken, getVideo);

export default router;
