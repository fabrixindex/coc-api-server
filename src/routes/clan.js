import { Router } from 'express';
import { cocFetch } from '../cocClient.js';
import { CLAN } from '../config.js';

const router = Router();
const clanTag = () => encodeURIComponent(CLAN.startsWith('#') ? CLAN : `#${CLAN}`);

// GET /api/clan -> datos generales del clan
router.get('/', async (req, res, next) => {
  try {
    const data = await cocFetch(`/clans/${clanTag()}`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/clan/members -> lista de miembros
router.get('/members', async (req, res, next) => {
  try {
    const data = await cocFetch(`/clans/${clanTag()}/members`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/clan/capital-raids -> temporada de saqueos de capital más reciente
router.get('/capital-raids', async (req, res, next) => {
  try {
    const data = await cocFetch(`/clans/${clanTag()}/capitalraidseasons`);
    res.json(data.items?.[0] ?? null);
  } catch (err) {
    next(err);
  }
});

// GET /api/clan/war-league-group -> grupo de la liga de guerra de clanes actual
router.get('/war-league-group', async (req, res, next) => {
  try {
    const data = await cocFetch(`/clans/${clanTag()}/currentwar/leaguegroup`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/clan/current-war -> guerra normal (no de liga) en curso
router.get('/current-war', async (req, res, next) => {
  try {
    const data = await cocFetch(`/clans/${clanTag()}/currentwar`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
