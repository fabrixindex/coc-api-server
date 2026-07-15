# coc-api-server

Backend en Express que hace de proxy entre tu frontend (Vite, en Vercel) y la API oficial de Clash of Clans. Existe porque la API de Supercell requiere whitelistear una IP fija, y Vercel usa IPs dinámicas. Este servidor está pensado para correr en una VM con IP externa estática (ej. Google Compute Engine).

## Instalación local

```bash
npm install
cp .env.example .env
# completá TOKEN, CLAN, LEAGUEID, SEASONID en el .env
npm run dev
```

El server levanta en `http://localhost:3000` (o el puerto que pongas en `PORT`).

## Variables de entorno

Ver `.env.example`. El `TOKEN` se genera en https://developer.clashofclans.com y queda atado a la IP que hayas whitelisteado ahí — si corrés esto en tu compu vas a tener que regenerar el token con tu propia IP, y con la IP fija de la VM en producción.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Chequeo de que el server está vivo |
| GET | `/api/clan` | Datos generales del clan |
| GET | `/api/clan/members` | Lista de miembros |
| GET | `/api/clan/capital-raids` | Última temporada de saqueos de capital |
| GET | `/api/clan/war-league-group` | Grupo de la liga de guerra de clanes actual |
| GET | `/api/clan/current-war` | Guerra normal en curso |
| GET | `/api/league/season` | Temporada de liga (usa `LEAGUEID`/`SEASONID` del .env) |
| GET | `/api/rankings/clans/ar` | Ranking de clanes en Argentina |
| GET | `/api/rankings/players/ar` | Ranking de jugadores en Argentina |
| GET | `/api/rankings/players/mx` | Ranking de jugadores en México |
| GET | `/api/players/:tag` | Datos de un jugador (tag sin "#" en la URL, ej. `/api/players/ABC123`) |

## Deploy en la VM (Compute Engine)

```bash
git clone <url-de-este-repo>
cd coc-api-server
npm install
cp .env.example .env
nano .env   # completar valores reales
sudo npm install -g pm2
pm2 start index.js --name coc-proxy
pm2 startup
pm2 save
```

Después, en tu frontend de Vite (en Vercel), reemplazá las URLs relativas `/api/v1/...` por `http://TU_IP_ESTATICA:PORT/api/...` (o mejor, poné esa URL base en una variable de entorno de Vite, ej. `VITE_API_URL`).
