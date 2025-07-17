require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db');
const config = require('./config');

const app = express();

// Configuração do express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
// GET - Buscar todos os concorrentes
app.get(`${config.api.baseUrl}${config.api.endpoints.concorrentes}`, async (req, res) => {
    try {
        const concorrentes = await db.getAllConcorrentes();
        res.json(concorrentes);
    } catch (error) {
        console.error('Erro ao buscar concorrentes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// GET - Buscar concorrentes por segmento
app.get('/api/concorrentes/segmento/:segmento', async (req, res) => {
    try {
        const concorrentes = await db.getConcorrentesPorSegmento(req.params.segmento);
        res.json(concorrentes);
    } catch (error) {
        console.error('Erro ao buscar concorrentes por segmento:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// POST - Criar novo concorrente
app.post('/api/concorrentes', async (req, res) => {
    try {
        const novoConcorrente = await db.insertConcorrente(req.body);
        res.status(201).json(novoConcorrente);
    } catch (error) {
        console.error('Erro ao criar concorrente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// PUT - Atualizar concorrente existente
app.put('/api/concorrentes/:id', async (req, res) => {
    try {
        const concorrente = await db.updateConcorrente(req.params.id, req.body);
        if (concorrente) {
            res.json(concorrente);
        } else {
            res.status(404).json({ error: 'Concorrente não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar concorrente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// DELETE - Remover concorrente
app.delete('/api/concorrentes/:id', async (req, res) => {
    try {
        await db.deleteConcorrente(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar concorrente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// GET - Buscar estatísticas
app.get('/api/estatisticas', async (req, res) => {
    try {
        const estatisticas = await db.getEstatisticas();
        res.json(estatisticas);
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Iniciar o servidor
const PORT = config.api.port;
app.listen(PORT, () => {
    console.log(`🌟 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}${config.api.baseUrl}`);
});
