import { TOKEN } from './config.js';

// Esta es la URL real de la API de Supercell.
// En tu Vite original usabas "/api/v1/..." porque el dev server de Vite
// tenía un proxy que reescribía "/api" -> esta URL. Acá pegamos directo.
const BASE_URL = 'https://api.clashofclans.com/v1';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${TOKEN}`,
};

/**
 * Hace un GET a la API de Clash of Clans y devuelve el JSON parseado.
 * Si la respuesta no es exitosa (ej. 403 por IP no whitelisteada, 404, etc.)
 * tira un error con el status y el body, para que la ruta que lo llama
 * pueda devolverle al front un mensaje útil en vez de fallar en silencio.
 */
export async function cocFetch(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || `Error ${response.status} al llamar a la API de Clash of Clans`
    );
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}
