// routes/produtos.js
const express = require('express');
const db = require('../db');
const { produtoSchema } = require('../validators');

const router = express.Router();

// GET - Buscar todos os produtos
router.get('/', async (req, res, next) => {
    try {
        const produtos = await db.getAllConcorrentes(); // Assumindo que o nome da função no db/index.js ainda é esse
        res.json(produtos);
    } catch (error) {
        next(error);
    }
});

// GET - Buscar produtos por segmento
router.get('/segmento/:segmento', async (req, res, next) => {
    try {
        const produtos = await db.getConcorrentesPorSegmento(req.params.segmento); // Assumindo que o nome da função no db/index.js ainda é esse
        res.json(produtos);
    } catch (error) {
        next(error);
    }
});

// POST - Criar novo produto
router.post('/', async (req, res, next) => {
    try {
        const { error, value } = produtoSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const novoProduto = await db.insertConcorrente(value); // Assumindo que o nome da função no db/index.js ainda é esse
        res.status(201).json(novoProduto);
    } catch (error) {
        next(error);
    }
});

// PUT - Atualizar produto existente
router.put('/:id', async (req, res, next) => {
    try {
        const { error, value } = produtoSchema.min(1).validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });
        }
        const produto = await db.updateConcorrente(req.params.id, value); // Assumindo que o nome da função no db/index.js ainda é esse
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        next(error);
    }
});

// Adicionar rota DELETE aqui se necessário

module.exports = router;
