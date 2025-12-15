# aorta

MERN implementation of Aorta (client + server).

This README explains how to set up the project locally, install dependencies, and configure environment variables for development.

**Prerequisites**

- Node.js and bun
- npm,
- MongoDB (local)

**Repository layout**

- `client/` — Vite + React frontend
- `server/` — Node/Express backend

**Install dependencies**
Run installs separately for the client and server.

Client:

```bash
cd client
bun install
```

Server:

```bash
cd server
npm install
```

**Environment variables**

- Server expects a `.env` file in the `server/` folder with at least the following variable:

```
PORT = 5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/aorta
```

- The server's Mongo DB connection is read from `MONGO_URI` (see `server/src/config/connectDB.js`). If you use MongoDB Atlas, set `MONGO_URI` to your Atlas connection string.

- Frontend: this project currently does not require client-side env vars by default. If you add an API base URL, create a `.env` in the `client/` folder and use Vite variables (for example `VITE_API_URL=https://...`) and read it via `import.meta.env.VITE_API_URL`.

**Running (development)**
Open two terminals (one for client, one for server):

Server (from repository root):

```bash
cd server
npm run dev
```

Client (from repository root):

```bash
cd client
bun dev
```

The client Vite dev server typically runs on `http://localhost:5173` and the server on `http://localhost:5000` (or the `PORT` you set).

**Build & Production**

- Build the client:

```bash
cd client
bun build
```

- For production deploy, ensure your server is configured to serve the built client or deploy the client separately depending on your hosting choice.

**Useful files**

- `server/src/config/connectDB.js` — MongoDB connection (reads `MONGO_URI`)
- `client/` — Vite React app

**Troubleshooting**

- If Mongo fails to connect, verify `MONGO_URI`, that MongoDB is running, and network access to Atlas (IP whitelist).
- If ports conflict, change `PORT` in the server `.env` or the client dev server port in `client/vite.config.ts`.

If you want, I can also add a sample `.env.example` files for both `client/` and `server/`, or add convenience scripts to the root to run both dev servers concurrently. Which would you prefer?
