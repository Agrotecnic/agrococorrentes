const { sql } = require('../db/index');

const csvData = [
    ['Vegetativo', 'Starter Mn Platinun', '', 11, 15.66, 1.7727272727272727, 25.76, 'Moderada', 'Baixo', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU3', 'Leste'],
    ['Vegetativo', 'Cerrado', '', 6, 13.25, 2.0, 27.75, 'Moderada', 'Baixo', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU3', 'Leste'],
    ['Vegetativo', 'Concorde', '', 6, 35.4, 1.25, 42.07, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU3', 'Leste'],
    ['Vegetativo', 'Speed (kg)', '', 5, 15.0, 1.5, 22.5, 'Moderada', 'Baixo', 'baixo', 'Sem recomendação', 'Apenas Nutricional', 'Intermediário', 'Baixo Potencial', 'BU3', 'Leste'],
    ['Vegetativo', 'Puma', '', 3, 39.0, 1.9166666666666667, 71.58, 'Moderada', 'Muito Alto', 'baixo', 'Sem recomendação', 'Apenas Nutricional', 'Intermediário', 'Potencial', 'BU1', 'PR/SC/PY-LATAM'],
    ['Vegetativo', 'SOJA PLUS', '', 3, 37.333333333333336, 1.1666666666666667, 40.33, 'Moderada', 'Alto', 'Médio', 'Sem recomendação', 'Parcialmente Balanceada', 'Consolidado', 'Alto Potencial', 'BU1', 'PR/SC/PY-LATAM'],
    ['Vegetativo', 'Active', '', 2, 52.0, 1.0, 52.0, 'Moderada', 'Muito Alto', 'baixo', 'Sem recomendação', 'Parcialmente Balanceada', 'Entrada', 'Baixo Potencial', 'BU1', 'PR/SC/PY-LATAM'],
    ['Vegetativo', 'DaCafe', '', 2, 17.5, 3.5, 61.5, 'Alta', 'Muito Alto', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Intermediário', 'Potencial', 'BU3', 'Leste'],
    ['Vegetativo', 'Fertileader', '', 2, 120.0, 1.0, 120.0, 'Moderada', 'Elevado', 'Alto', 'Sem recomendação', 'Parcialmente Balanceada', 'Consolidado', 'Preço Poribitivo', 'BU3', 'Leste'],
    ['Vegetativo', 'Glutamix', '', 2, 40.5, 1.25, 49.0, 'Moderada', 'Alto', 'Médio', 'Pouco recomendado', 'Parcialmente Balanceada', 'Consolidado', 'Potencial', 'BU3', 'Leste'],
    ['Florescimento', 'Hold', 'Stoller', 13, 69.5, 0.5, 34.25, 'Muito Baixa', 'Moderado', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Intermediário', 'Líder', 'BU3', 'Leste'],
    ['Florescimento', 'MS Florada', 'Ubyfol', 13, 26.62, 1, 26.62, 'Baixa', 'Moderado', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU3', 'Leste'],
    ['Florescimento', 'CAB', '-', 5, 27.4, 3, 82.2, 'Moderada', 'Alto', 'Alto', 'Pouco recomendado', 'Apenas Nutricional', 'Intermediário', 'Seguidor', 'BU1', 'PR/SC/PY-LATAM'],
    ['Florescimento', 'Florada', 'Quimifol', 5, 27, 1, 27, 'Baixa', 'Moderado', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU3', 'Leste'],
    ['Florescimento', 'Exion peg +', 'Kimberlit', 5, 45.8, 2.5, 22.9, 'Muito Baixa', 'Moderado', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU3', 'Leste'],
    ['Enchimento', 'Mover', 'Stoller', 23, 42.93, 1.8, 1693.77, 'Baixa', 'Baixo', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU3', 'Leste'],
    ['Enchimento', 'Peso+', 'Ubyfol', 12, 47.73, 1.21, 645.44, 'Moderada', 'Alto', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU3', 'Leste'],
    ['Indutores de Resistência', 'Re-Leaf', '', 21, 73.9, 0.95, 70.35, 'Moderada', 'Alto', 'Alto', 'Pouco Recomendado', 'Parcialmente Balanceada', 'Intermediário', 'Alto Potencial', 'BU3', 'Leste'],
    ['Indutores de Resistência', 'Hulk', '', 7, 167.29, 0.5, 76.56, 'Moderada', 'Alto', 'Médio', 'Pouco Recomendado', 'Parcialmente Balanceada', 'Intermediário', 'Alto Potencial', 'BU3', 'Leste'],
    ['Adjuvantes', 'Li 700', '', 17, 75.63, 0.14, 8.07, 'Moderado', 'Moderado', 'Baixa', 'Excelente', 'Completa', 'Consolidado', 'Líder', 'BU3', 'Leste'],
    ['Adjuvantes', 'Disperse', '', 12, 72.92, 0.13, 8.61, 'Moderado', 'Moderado', 'Baixa', 'Boa', 'Completa', 'Intermediário', 'Líder', 'BU3', 'Leste'],
    ['Estímulo Hormonal', 'Stimulate', '', 10, 182.28, 0.51, 93.16, 'Moderada', 'Muito Alto', 'Alto', 'Muito recomendado', 'Horm. Sintético', 'Consolidado', 'Líder', 'BU3', 'Leste'],
    ['Tratamento de Sementes', 'Stimulate', '', 19, 200.18, 0.25, 53.77, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Parc. e Balanceada', 'Consolidado', 'Líder', 'BU3', 'Leste']
];

async function importData() {
    try {
        console.log('🚀 Iniciando importação dos dados...');
        
        // Limpar dados existentes
        await sql`DELETE FROM concorrentes`;
        console.log('🗑️ Dados existentes removidos');
        
        // Inserir dados do CSV
        for (const row of csvData) {
            const [segmento, nome_produto, marca, mencoes, preco_l, dose_ha, custo_ha, 
                   classif_dose, classif_preco, reconhec_mercado, reconhec_consultor, 
                   composicao, estagio_de_uso, classificacao_final, bu, regional] = row;
            
            await sql`
                INSERT INTO concorrentes (
                    segmento, nome_produto, marca, mencoes, preco_l, dose_ha, custo_ha,
                    classif_dose, classif_preco, reconhec_mercado, reconhec_consultor,
                    composicao, estagio_de_uso, classificacao_final, bu, regional
                ) VALUES (
                    ${segmento}, ${nome_produto}, ${marca}, ${mencoes}, ${preco_l}, 
                    ${dose_ha}, ${custo_ha}, ${classif_dose}, ${classif_preco}, 
                    ${reconhec_mercado}, ${reconhec_consultor}, ${composicao}, 
                    ${estagio_de_uso}, ${classificacao_final}, ${bu}, ${regional}
                )
            `;
        }
        
        console.log(`✅ ${csvData.length} registros inseridos com sucesso!`);
        
        // Verificar dados inseridos
        const count = await sql`SELECT COUNT(*) as total FROM concorrentes`;
        console.log(`📊 Total de registros na tabela: ${count[0].total}`);
        
        // Mostrar exemplos por segmento
        const segmentos = await sql`
            SELECT segmento, COUNT(*) as quantidade 
            FROM concorrentes 
            GROUP BY segmento 
            ORDER BY quantidade DESC
        `;
        
        console.log('\n📈 Distribuição por segmento:');
        segmentos.forEach(seg => {
            console.log(`  ${seg.segmento}: ${seg.quantidade} produtos`);
        });
        
    } catch (error) {
        console.error('❌ Erro durante a importação:', error);
        throw error;
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    importData()
        .then(() => {
            console.log('🎉 Importação concluída!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Falha na importação:', error);
            process.exit(1);
        });
}

module.exports = { importData }; 