import express from 'express';
import cors from 'cors';
import { PORT, ALLOWED_ORIGINS } from './src/config.js';

import clanRoutes from './src/routes/clan.js';
import leagueRoutes from './src/routes/league.js';
import rankingsRoutes from './src/routes/rankings.js';
import playerRoutes from './src/routes/player.js';

const app = express();

// Solo dejamos que los orígenes de ALLOWED_ORIGINS (configurados en .env
// vía FRONTEND_URL, separados por coma) le peguen a este server.
// Ej: FRONTEND_URL=http://localhost:5173,https://tu-app.vercel.app
app.use(
  cors({
    origin(origin, callback) {
      // Sin "origin" (ej. Postman, curl) o "*" configurado: dejamos pasar
      if (!origin || ALLOWED_ORIGINS.includes('*')) {
        return callback(null, true);
      }
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origen no permitido por CORS: ${origin}`));
    },
  })
);

// Chequeo rápido para saber si el server está vivo (útil para probar
// que la VM responde antes de meterte con la lógica de Clash of Clans)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clan', clanRoutes);
app.use('/api/league', leagueRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use('/api/players', playerRoutes);

// 404 para cualquier ruta no definida
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores centralizado: acá caen todos los "next(err)"
// de las rutas. Si el error viene de la API de Clash of Clans (403 por
// IP no whitelisteada, 404 de clan/jugador inexistente, etc.) usamos
// ese status; si no, devolvemos 500.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
