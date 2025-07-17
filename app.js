require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const produtosRoutes = require('./routes/produtos'); // Importa as rotas de produtos

const app = express();

// Configuração do express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
// Usa o roteador de produtos para o endpoint /api/concorrentes
app.use(`${config.api.baseUrl}${config.api.endpoints.concorrentes}`, produtosRoutes);

// Middleware de erro - deve ser o último middleware a ser adicionado
app.use(errorHandler);

// Iniciar o servidor
const PORT = config.api.port;
app.listen(PORT, () => {
    console.log(`🌟 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}${config.api.baseUrl}`);
});
