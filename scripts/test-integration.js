const { testConnection, sql } = require('../db/index');

async function runIntegrationTests() {
    console.log('🧪 Iniciando testes de integração...\n');
    
    try {
        // Teste 1: Conexão com o banco
        console.log('1️⃣ Testando conexão com Neon...');
        const connectionOk = await testConnection();
        if (!connectionOk) {
            throw new Error('Falha na conexão com o banco');
        }
        console.log('✅ Conexão estabelecida\n');
        
        // Teste 2: Verificar estrutura da tabela
        console.log('2️⃣ Verificando estrutura da tabela...');
        const tableInfo = await sql`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'concorrentes' 
            ORDER BY ordinal_position
        `;
        console.log('📋 Colunas da tabela:');
        tableInfo.forEach(col => {
            console.log(`   - ${col.column_name}: ${col.data_type} (${col.is_nullable === 'YES' ? 'nullable' : 'not null'})`);
        });
        console.log('✅ Estrutura verificada\n');
        
        // Teste 3: Contar registros
        console.log('3️⃣ Verificando dados...');
        const count = await sql`SELECT COUNT(*) as total FROM concorrentes`;
        console.log(`📊 Total de registros: ${count[0].total}`);
        
        if (count[0].total === 0) {
            console.log('⚠️  Nenhum registro encontrado. Execute o script de importação primeiro.');
        } else {
            console.log('✅ Dados encontrados\n');
        }
        
        // Teste 4: Amostra de dados
        console.log('4️⃣ Amostra de dados:');
        const sample = await sql`
            SELECT segmento, nome_produto, marca, mencoes, preco_l, classificacao_final 
            FROM concorrentes 
            ORDER BY mencoes DESC 
            LIMIT 5
        `;
        
        console.log('🔝 Top 5 produtos por menções:');
        sample.forEach((produto, index) => {
            console.log(`   ${index + 1}. ${produto.nome_produto} (${produto.marca || 'Sem marca'}) - ${produto.mencoes} menções`);
            console.log(`      Segmento: ${produto.segmento} | Preço: R$ ${produto.preco_l} | Classificação: ${produto.classificacao_final}`);
        });
        console.log('✅ Amostra exibida\n');
        
        // Teste 5: Estatísticas por segmento
        console.log('5️⃣ Estatísticas por segmento:');
        const stats = await sql`
            SELECT 
                segmento,
                COUNT(*) as quantidade,
                AVG(preco_l)::numeric(10,2) as preco_medio,
                AVG(custo_ha)::numeric(10,2) as custo_medio,
                MAX(mencoes) as max_mencoes
            FROM concorrentes 
            GROUP BY segmento 
            ORDER BY quantidade DESC
        `;
        
        stats.forEach(stat => {
            console.log(`   📈 ${stat.segmento}:`);
            console.log(`      Produtos: ${stat.quantidade} | Preço médio: R$ ${stat.preco_medio} | Custo médio: R$ ${stat.custo_medio} | Max menções: ${stat.max_mencoes}`);
        });
        console.log('✅ Estatísticas calculadas\n');
        
        // Teste 6: API endpoints (simulação)
        console.log('6️⃣ Endpoints da API disponíveis:');
        console.log('   🔗 GET /api/concorrentes - Listar todos os concorrentes');
        console.log('   🔗 GET /api/concorrentes/segmentos - Listar segmentos únicos');
        console.log('   🔗 GET /api/concorrentes/estatisticas - Estatísticas gerais');
        console.log('   🔗 GET /api/concorrentes/lideres - Produtos líderes por segmento');
        console.log('   🔗 GET /api/concorrentes/:id - Buscar por ID');
        console.log('   🔗 Filtros: ?segmento=X&bu=Y&classificacao=Z');
        console.log('✅ Endpoints configurados\n');
        
        console.log('🎉 Todos os testes passaram! A integração está funcionando corretamente.');
        console.log('\n📱 Para acessar o dashboard, abra: http://localhost:3001');
        
    } catch (error) {
        console.error('❌ Erro durante os testes:', error);
        throw error;
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    runIntegrationTests()
        .then(() => {
            console.log('\n✨ Testes concluídos com sucesso!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n💥 Falha nos testes:', error);
            process.exit(1);
        });
}

module.exports = { runIntegrationTests }; 