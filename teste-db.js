require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

console.log('Tentando conectar ao banco de dados...');
console.log('URL:', process.env.DATABASE_URL);

const sql = neon(process.env.DATABASE_URL);

sql`SELECT 1`.then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida!');
    // Criar tabela se não existir
    return sql`
        CREATE TABLE IF NOT EXISTS concorrentes (
            id SERIAL PRIMARY KEY,
            nome_produto VARCHAR(255) NOT NULL,
            segmento VARCHAR(100) NOT NULL,
            preco DECIMAL(10,2) NOT NULL,
            embalagem VARCHAR(100),
            observacoes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
}).then(() => {
    console.log('✅ Tabela criada/verificada com sucesso!');
    process.exit(0);
}).catch(err => {
    console.error('❌ Erro:', err);
    process.exit(1);
});
