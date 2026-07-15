import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const TOKEN = process.env.TOKEN;
export const CLAN = process.env.CLAN;
export const LEAGUEID = process.env.LEAGUEID;
export const SEASONID = process.env.SEASONID;
export const FRONTEND_URL = process.env.FRONTEND_URL || '*';

// IDs de ubicación de Clash of Clans (fijos, no dependen del clan)
export const ARGENTINA_LOCATION_ID = '32000017';
export const MEXICO_LOCATION_ID = '32000153';

// Chequeo temprano: si falta algo crítico, mejor fallar rápido y avisar
if (!TOKEN) {
  console.warn('[WARN] Falta la variable TOKEN en el .env. Las llamadas a la API van a fallar.');
}
if (!CLAN) {
  console.warn('[WARN] Falta la variable CLAN en el .env. Las rutas de clan van a fallar.');
}
