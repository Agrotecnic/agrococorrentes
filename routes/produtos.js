// routes/produtos.js
const express = require('express');
const router = express.Router();
const { sql } = require('../db/index');

// GET /api/concorrentes - Listar todos os concorrentes
router.get('/', async (req, res) => {
    try {
        const { segmento, bu, classificacao } = req.query;
        
        let result;
        
        if (segmento) {
            result = await sql`
                SELECT * FROM concorrentes 
                WHERE segmento ILIKE ${`%${segmento}%`}
                ORDER BY segmento, mencoes DESC, nome_produto
            `;
        } else if (bu) {
            result = await sql`
                SELECT * FROM concorrentes 
                WHERE bu ILIKE ${`%${bu}%`}
                ORDER BY segmento, mencoes DESC, nome_produto
            `;
        } else if (classificacao) {
            result = await sql`
                SELECT * FROM concorrentes 
                WHERE classificacao_final ILIKE ${`%${classificacao}%`}
                ORDER BY segmento, mencoes DESC, nome_produto
            `;
        } else {
            result = await sql`
                SELECT * FROM concorrentes 
                ORDER BY segmento, mencoes DESC, nome_produto
            `;
        }
        
        res.json(result);
    } catch (error) {
        console.error('Erro ao buscar concorrentes:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// GET /api/concorrentes/segmentos - Listar segmentos únicos
router.get('/segmentos', async (req, res) => {
    try {
        const result = await sql`
            SELECT DISTINCT segmento, COUNT(*) as quantidade
            FROM concorrentes 
            GROUP BY segmento 
            ORDER BY segmento
        `;
        res.json(result);
    } catch (error) {
        console.error('Erro ao buscar segmentos:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// GET /api/concorrentes/estatisticas - Estatísticas gerais
router.get('/estatisticas', async (req, res) => {
    try {
        const totalProdutos = await sql`SELECT COUNT(*) as total FROM concorrentes`;
        
        const porSegmento = await sql`
            SELECT segmento, COUNT(*) as quantidade, 
                   AVG(preco_l) as preco_medio,
                   AVG(custo_ha) as custo_medio
            FROM concorrentes 
            GROUP BY segmento 
            ORDER BY quantidade DESC
        `;
        
        const porClassificacao = await sql`
            SELECT classificacao_final, COUNT(*) as quantidade
            FROM concorrentes 
            GROUP BY classificacao_final 
            ORDER BY quantidade DESC
        `;
        
        const topMencoes = await sql`
            SELECT nome_produto, marca, segmento, mencoes
            FROM concorrentes 
            WHERE mencoes > 0
            ORDER BY mencoes DESC 
            LIMIT 10
        `;
        
        res.json({
            total: totalProdutos[0].total,
            porSegmento,
            porClassificacao,
            topMencoes
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// GET /api/concorrentes/lideres - Produtos líderes por segmento
router.get('/lideres', async (req, res) => {
    try {
        const result = await sql`
            SELECT segmento, nome_produto, marca, mencoes, 
                   preco_l, custo_ha, classificacao_final,
                   reconhec_mercado, reconhec_consultor
            FROM concorrentes 
            WHERE classificacao_final = 'Líder'
            ORDER BY segmento, mencoes DESC
        `;
        res.json(result);
    } catch (error) {
        console.error('Erro ao buscar líderes:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

// GET /api/concorrentes/:id - Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql`SELECT * FROM concorrentes WHERE id = ${id}`;
        
        if (result.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        
        res.json(result[0]);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

module.exports = router;
