import { Router } from 'express';
import { cocFetch } from '../cocClient.js';
import { LEAGUEID, SEASONID } from '../config.js';

const router = Router();

// GET /api/league/season -> datos de la temporada de liga configurada en .env
router.get('/season', async (req, res, next) => {
  try {
    const data = await cocFetch(
      `/leagues/${encodeURIComponent(LEAGUEID)}/seasons/${encodeURIComponent(SEASONID)}?limit=20`
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
