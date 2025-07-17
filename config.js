// Configuração para conexão com o banco de dados Neon
const config = {
    // Configurações do banco de dados
    database: {
        url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname'
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
