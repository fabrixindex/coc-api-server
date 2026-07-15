import { Router } from 'express';
import { cocFetch } from '../cocClient.js';

const router = Router();

// GET /api/players/:tag -> datos de un jugador
// El tag se pasa SIN el "#" en la URL (ej: /api/players/ABC123),
// porque "#" rompe las rutas de Express. Acá se lo volvemos a agregar.
router.get('/:tag', async (req, res, next) => {
  try {
    const rawTag = req.params.tag;
    const tag = rawTag.startsWith('#') ? rawTag : `#${rawTag}`;
    const data = await cocFetch(`/players/${encodeURIComponent(tag)}`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
