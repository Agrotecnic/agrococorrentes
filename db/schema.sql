-- Tabela principal para armazenar os dados dos produtos
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    segmento VARCHAR(100),
    bu VARCHAR(50),
    produto VARCHAR(100),
    marca VARCHAR(100),
    preco_litro DECIMAL(10,2),
    dose_ha DECIMAL(10,2),
    custo_ha DECIMAL(10,2),
    classif_dose VARCHAR(50),
    classif_preco VARCHAR(50),
    reconhec_mercado VARCHAR(50),
    reconhec_consultor VARCHAR(100),
    composicao VARCHAR(100),
    estagio_uso VARCHAR(50),
    classificacao_final VARCHAR(50),
    qualidade_tecnica VARCHAR(50),
    resultados_campo TEXT,
    foco_empresa BOOLEAN,
    mencoes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar o timestamp automaticamente
CREATE TRIGGER update_produtos_updated_at
    BEFORE UPDATE ON produtos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Índices para melhorar a performance das consultas mais comuns
CREATE INDEX IF NOT EXISTS idx_produtos_segmento ON produtos(segmento);
CREATE INDEX IF NOT EXISTS idx_produtos_bu ON produtos(bu);
CREATE INDEX IF NOT EXISTS idx_produtos_classificacao_final ON produtos(classificacao_final);
