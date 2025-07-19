// Configuração para conexão com o banco de dados Neon
const config = {
    // Configurações do banco de dados
    database: {
        url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_DdihJ7vlV1sR@ep-raspy-cell-addnlpem-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'
    },
    
    // Endpoints da API
    api: {
        port: process.env.PORT || 3001, // Mudando para porta 3001 para evitar conflitos
        baseUrl: '/api',
        endpoints: {
            concorrentes: '/concorrentes',
            estatisticas: '/estatisticas'
        }
    }
};

module.exports = config;
