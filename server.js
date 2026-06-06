/**
 * server.js
 * ----------------------------------------------------
 * Servidor principal Express.
 * - Serve arquivos estáticos da pasta /public
 * - Expõe rotas de API em /api
 * - Inicializa conexão com Firebase (config/firebase.js)
 * ----------------------------------------------------
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Inicializa Firebase (não quebra o servidor se não estiver configurado)
const firebase = require('./config/firebase');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Middlewares globais ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Arquivos estáticos (frontend) ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Rotas da API ---
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// --- Rota fallback: entrega o index.html ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// --- Sobe o servidor ---
app.listen(PORT, () => {
  console.log('====================================');
  console.log(`  🌐  Servidor rodando: http://localhost:${PORT}`);
  console.log(`  🔥  Firebase: ${firebase.isReady() ? 'conectado' : 'NÃO configurado (ok para começar)'}`);
  console.log('====================================');
});
