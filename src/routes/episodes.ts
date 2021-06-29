import express from 'express';
import { getEpisodes } from '../controllers/episodes';

const router = express.Router();

router.get('/episodes', getEpisodes);

export default router;
