const { neon } = require('@neondatabase/serverless');
const config = require('../config');
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const db = {
    async getAllConcorrentes() {
        try {
            console.log('Conectando ao banco Neon...');
            const result = await sql`SELECT * FROM concorrentes ORDER BY segmento, nome_produto`;
            console.log('Resultado da consulta:', result);
            return result;
        } catch (error) {
            console.error('Erro ao buscar concorrentes:', error);
            throw error;
        }
    },
    async getConcorrentesPorSegmento(segmento) {
        try {
            return await sql`SELECT * FROM concorrentes WHERE segmento = ${segmento} ORDER BY nome_produto`;
        } catch (error) {
            console.error('Erro ao buscar concorrentes por segmento:', error);
            throw error;
        }
    }
    // ...adicione outras funções conforme necessário...
};

module.exports = db;
