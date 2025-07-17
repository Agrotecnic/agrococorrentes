-- Inserção dos dados de exemplo por segmento
INSERT INTO concorrentes (
    segmento, nome_produto, marca, mencoes, preco_por_litro, dose_por_hectare, 
    custo_por_hectare, classif_dose, classif_preco, reconhec_mercado, 
    reconhec_consultor, composicao, estagio_uso, classificacao_final, bu, regional
) VALUES
-- Vegetativo
('Vegetativo', 'Starter Mn Platinun', 'Stoller', 11, 15.66, 1.773, 25.76, 'Moderada', 'Baixo', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Vegetativo', 'Cerrado', 'Quimifol', 6, 13.25, 2.0, 27.75, 'Moderada', 'Baixo', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU3', 'Leste'),
('Vegetativo', 'Concorde', 'ICL', 6, 35.4, 1.25, 42.07, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Vegetativo', 'Speed (kg)', 'Nitro', 5, 15.0, 1.5, 22.5, 'Moderada', 'Baixo', 'Baixo', 'Sem recomendação', 'Apenas Nutricional', 'Intermediário', 'Baixo Potencial', 'BU2', 'MT'),
('Vegetativo', 'Puma', 'Tradecorp', 3, 39.0, 1.917, 71.58, 'Moderada', 'Muito Alto', 'Baixo', 'Sem recomendação', 'Apenas Nutricional', 'Intermediário', 'Potencial', 'BU1', 'SP'),

-- Florescimento
('Florescimento', 'Hold', 'Stoller', 13, 69.5, 0.5, 34.25, 'Muito Baixa', 'Moderado', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Intermediário', 'Líder', 'BU3', 'Leste'),
('Florescimento', 'MS Florada', 'Ubyfol', 13, 26.62, 1.0, 26.62, 'Baixa', 'Moderado', 'Alto', 'Muito recomendado', 'Apenas Nutricional', 'Consolidado', 'Líder', 'BU2', 'MT'),
('Florescimento', 'CAB', '-', 5, 27.4, 3.0, 82.2, 'Moderada', 'Alto', 'Alto', 'Pouco recomendado', 'Apenas Nutricional', 'Intermediário', 'Seguidor', 'BU1', 'SP'),
('Florescimento', 'Florada', 'Quimifol', 5, 27.0, 1.0, 27.0, 'Baixa', 'Moderado', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU2', 'MT'),
('Florescimento', 'Speed', 'Nitro', 3, 21.0, 1.5, 31.5, 'Baixa', 'Alto', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Potencial', 'BU1', 'SP'),

-- Enchimento
('Enchimento', 'Mover', 'Stoller', 23, 42.93, 1.8, 1693.77, 'Baixa', 'Baixo', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU3', 'Leste'),
('Enchimento', 'Peso+', 'Ubyfol', 12, 47.73, 1.21, 645.44, 'Moderada', 'Alto', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU2', 'MT'),
('Enchimento', 'K-fol(kg)', 'UPL', 9, 44.0, 1.07, 426.6, 'Moderada', 'Moderado', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU1', 'SP'),
('Enchimento', 'Translok(kg)', '-', 7, 23.8, 1.79, 294.9, 'Baixa', 'Moderado', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU3', 'Leste'),
('Enchimento', 'Grão Max', 'Microxisto', 4, 30.0, 1.13, 135.0, 'Muito Baixa', 'Muito Baixo', 'Médio', 'Pouco recomendado', 'Apenas Nutricional', 'Entrada', 'Baixo Potencial', 'BU2', 'MT'),

-- Indutores de Resistência
('Indutores de Resistência', 'Re-Leaf', '-', 21, 73.9, 0.95, 70.35, 'Moderada', 'Alto', 'Alto', 'Pouco recomendado', 'Parc. Balanceada', 'Intermediário', 'Alto Potencial', 'BU3', 'Leste'),
('Indutores de Resistência', 'Hulk', '-', 7, 167.29, 0.5, 76.56, 'Moderada', 'Alto', 'Médio', 'Pouco recomendado', 'Parc. Balanceada', 'Intermediário', 'Alto Potencial', 'BU2', 'MT'),
('Indutores de Resistência', 'Cobre EDTA (kg)', '-', 5, 80.6, 0.05, 4.03, 'Muito Baixa', 'Muito Baixo', 'Baixo', 'Sem recomendação', 'Apenas Bioestimulante', 'Entrada', 'Baixo Resultado', 'BU1', 'SP'),
('Indutores de Resistência', 'Curative', '-', 4, 47.75, 0.88, 36.13, 'Alta', 'Moderado', 'Médio', 'Pouco recomendado', 'Parc. Balanceada', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Indutores de Resistência', 'Yantra', '-', 4, 52.67, 0.5, 19.75, 'Moderada', 'Baixo', 'Médio', 'Sem recomendação', 'Parc. Balanceada', 'Intermediário', 'Alto Potencial', 'BU2', 'MT'),

-- Adjuvantes
('Adjuvantes', 'Li 700', 'Helm', 17, 75.63, 0.14, 8.07, 'Moderada', 'Moderado', 'Baixo', 'Excelente', 'Completa', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Adjuvantes', 'Disperse', '-', 12, 72.92, 0.13, 8.61, 'Moderada', 'Moderado', 'Baixo', 'Boa', 'Completa', 'Intermediário', 'Líder', 'BU2', 'MT'),
('Adjuvantes', 'TA-35', '-', 11, 80.9, 0.13, 8.6, 'Alta', 'Moderado', 'Alto', 'Excelente', 'Completa', 'Consolidado', 'Líder', 'BU1', 'SP'),
('Adjuvantes', 'Atumus Gold Star', '-', 9, 76.93, 0.05, 3.67, 'Baixa', 'Baixo', 'Muito Baixa', 'Boa', 'Média', 'Entrada', 'Potencial', 'BU3', 'Leste'),
('Adjuvantes', 'Helper', '-', 8, 59.88, 0.17, 11.28, 'Alta', 'Moderado', 'Alto', 'Excelente', 'Completa', 'Intermediário', 'Líder', 'BU2', 'MT'),

-- Estímulo Hormonal
('Estímulo Hormonal', 'Stimulate', 'Stoller', 1, 182.28, 0.51, 93.16, 'Moderada', 'Muito Alto', 'Alto', 'Muito recomendado', 'Horm. Sintético', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Estímulo Hormonal', 'Stopping Go', 'Valence', 1, 168.0, 0.38, 63.84, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Nutr. Amino e Hormônio', 'Intermediário', 'Potencial', 'BU2', 'MT'),
('Estímulo Hormonal', 'Biozyme', 'UPL', 1, 152.5, 0.29, 44.23, 'Moderada', 'Moderado', 'Médio', 'Muito recomendado', 'Nutrientes e Algas', 'Intermediário', 'Potencial', 'BU1', 'SP'),
('Estímulo Hormonal', 'Booster', 'Agrichem', 1, 174.67, 0.75, 131.0, 'Alta', 'Alto', 'Médio', 'Pouco recomendado', 'Nutrientes e Algas', 'Intermediário', 'Potencial', 'BU3', 'Leste'),
('Estímulo Hormonal', 'Amino Alga CoMo', 'Rovensa', 1, 252.32, 0.14, 35.33, 'Baixa', 'Muito Alto', 'Médio', 'Pouco recomendado', 'Aminoácidos', 'Intermediário', 'Baixo Desempenho', 'BU2', 'MT'),

-- Tratamento de Sementes
('Tratamento de Sementes', 'Stimulate', 'Stoller', 19, 200.18, 0.25, 53.77, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Parc. Balanceada', 'Consolidado', 'Líder', 'BU3', 'Leste'),
('Tratamento de Sementes', 'Up seeds', 'ICL', 9, 208.67, 0.14, 29.46, 'Moderada', 'Alto', 'Alto', 'Muito recomendado', 'Balanceada', 'Consolidado', 'Seguidor Veloz', 'BU2', 'MT'),
('Tratamento de Sementes', 'Fertiactyl', 'Timac Agro', 9, 241.03, 0.5, 120.52, 'Alta', 'Elevado', 'Alto', 'Muito recomendado', 'Parc. Balanceada', 'Consolidado', 'Potencial', 'BU1', 'SP'),
('Tratamento de Sementes', 'Biozyme', 'UPL', 7, 138.57, 0.15, 19.28, 'Moderada', 'Alto', 'Médio', 'Pouco recomendado', 'Parc. Balanceada', 'Intermediário', 'Seguidor', 'BU3', 'Leste'),
('Tratamento de Sementes', 'Racimax', 'Dessangose', 6, 138.33, 0.13, 17.55, 'Moderada', 'Alto', 'Médio', 'Sem recomendação', 'Parc. Balanceada', 'Intermediário', 'Seguidor', 'BU2', 'MT'),

-- Condicionadores de Solo
('Condicionadores de Solo', 'Byofol', '-', 17, 23.3, 5.06, 120.04, 'Alta', 'Moderado', 'Alto', 'Razoável', 'Parc. Balanceada', 'Intermediário', 'Alto Potencial', 'BU3', 'Leste'),
('Condicionadores de Solo', 'Viva BR', '-', 8, 27.0, 8.5, 229.5, 'Muito Alta', 'Alto', 'Alto', 'Excelente', 'Balanceada', 'Consolidado', 'Alto Potencial', 'BU2', 'MT'),
('Condicionadores de Solo', 'Root Top', '-', 6, 17.0, 5.0, 85.0, 'Alta', 'Baixo', 'Médio', 'Excelente', 'Parc. Balanceada', 'Intermediário', 'Razoável Potencial', 'BU1', 'SP'),
('Condicionadores de Solo', 'Terram', '-', 5, 38.0, 2.5, 95.0, 'Moderada', 'Moderado', 'Médio', 'Razoável', 'Parc. Balanceada', 'Intermediário', 'Razoável Potencial', 'BU3', 'Leste'),
('Condicionadores de Solo', 'Bioma phos', '-', 5, 800.0, 0.1, 80.0, 'Muito Baixa', 'Elevado', 'Baixo', 'Razoável', 'Apenas Biológico', 'Entrada', 'Razoável Potencial', 'BU2', 'MT');
