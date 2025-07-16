const express = require('express');
const path = require('path');
const app = express();

// Configurando pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌟 Servidor rodando em http://localhost:${PORT}`);
});
