import express from 'express';
import { getEpisodes } from '../controllers/episodes';

const router = express.Router();

router.get('/episode', getEpisodes);

export default router;
