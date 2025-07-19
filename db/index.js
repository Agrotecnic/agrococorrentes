const { neon } = require('@neondatabase/serverless');
const config = require('../config');
require('dotenv').config();

// Conexão com o banco Neon
const sql = neon(config.database.url);

// Função para executar queries
async function query(text, params) {
    try {
        const result = await sql(text, params);
        return result;
    } catch (error) {
        console.error('Erro na query:', error);
        throw error;
    }
}

// Função para testar a conexão
async function testConnection() {
    try {
        const result = await sql`SELECT NOW()`;
        console.log('✅ Conexão com Neon estabelecida:', result[0].now);
        return true;
    } catch (error) {
        console.error('❌ Erro ao conectar com Neon:', error);
        return false;
    }
}

module.exports = {
    query,
    testConnection,
    sql
};
