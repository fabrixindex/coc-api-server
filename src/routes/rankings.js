import { Router } from 'express';
import { cocFetch } from '../cocClient.js';
import { ARGENTINA_LOCATION_ID, MEXICO_LOCATION_ID } from '../config.js';

const router = Router();

// GET /api/rankings/clans/ar -> ranking de clanes en Argentina
router.get('/clans/ar', async (req, res, next) => {
  try {
    const data = await cocFetch(`/locations/${ARGENTINA_LOCATION_ID}/rankings/clans?limit=15`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/rankings/players/ar -> ranking de jugadores en Argentina
router.get('/players/ar', async (req, res, next) => {
  try {
    const data = await cocFetch(`/locations/${ARGENTINA_LOCATION_ID}/rankings/players?limit=20`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/rankings/players/mx -> ranking de jugadores en México
router.get('/players/mx', async (req, res, next) => {
  try {
    const data = await cocFetch(`/locations/${MEXICO_LOCATION_ID}/rankings/players?limit=20`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
