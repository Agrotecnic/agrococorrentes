# 🌾 Dashboard de Concorrentes Agrícolas

Dashboard interativo para análise de concorrentes no setor agrícola, integrado com banco de dados Neon PostgreSQL.

## ✨ Características

- **Banco de Dados**: Neon PostgreSQL (serverless)
- **Backend**: Node.js + Express + @neondatabase/serverless
- **Frontend**: HTML5 + Bootstrap 5 + D3.js + DC.js + Crossfilter
- **Dados**: 23+ produtos agrícolas com análises detalhadas

## 🗄️ Estrutura do Banco de Dados

### Projeto Neon: "Agroconcorrentes 2"
- **ID do Projeto**: `dark-meadow-05653794`
- **Branch Principal**: `main` (`br-frosty-firefly-adfuj3q8`)
- **Banco**: `neondb`

### Tabela: `concorrentes`
```sql
CREATE TABLE concorrentes (
    id SERIAL PRIMARY KEY,
    segmento VARCHAR(100),
    nome_produto VARCHAR(150),
    marca VARCHAR(100),
    mencoes INTEGER,
    preco_l DECIMAL(10,2),
    dose_ha DECIMAL(15,10),
    custo_ha DECIMAL(10,2),
    classif_dose VARCHAR(50),
    classif_preco VARCHAR(50),
    reconhec_mercado VARCHAR(50),
    reconhec_consultor VARCHAR(100),
    composicao VARCHAR(100),
    estagio_de_uso VARCHAR(50),
    classificacao_final VARCHAR(50),
    bu VARCHAR(50),
    regional VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Instalação e Configuração

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
O banco Neon já está configurado. Se precisar recriar:

```bash
# Importar dados do CSV
node scripts/import-csv-data.js

# Testar integração
node scripts/test-integration.js
```

### 3. Iniciar Aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

A aplicação estará disponível em: **http://localhost:3001**

## 📊 Dados Disponíveis

### Segmentos Analisados
- **Vegetativo**: 10 produtos
- **Florescimento**: 5 produtos  
- **Indutores de Resistência**: 2 produtos
- **Adjuvantes**: 2 produtos
- **Enchimento**: 2 produtos
- **Estímulo Hormonal**: 1 produto
- **Tratamento de Sementes**: 1 produto

### Campos por Produto
- Nome do produto e marca
- Segmento e BU (Business Unit)
- Preço por litro e dose por hectare
- Custo por hectare calculado
- Classificações (dose, preço, final)
- Reconhecimento (mercado, consultor)
- Composição e estágio de uso
- Número de menções
- Regional

## 🔗 API Endpoints

### Base URL: `/api/concorrentes`

- `GET /` - Listar todos os concorrentes
  - Filtros: `?segmento=X&bu=Y&classificacao=Z`
- `GET /segmentos` - Listar segmentos únicos
- `GET /estatisticas` - Estatísticas gerais
- `GET /lideres` - Produtos líderes por segmento  
- `GET /:id` - Buscar produto por ID

### Exemplos de Uso
```bash
# Todos os produtos
curl http://localhost:3001/api/concorrentes

# Filtrar por segmento
curl "http://localhost:3001/api/concorrentes?segmento=Vegetativo"

# Estatísticas gerais
curl http://localhost:3001/api/concorrentes/estatisticas

# Produtos líderes
curl http://localhost:3001/api/concorrentes/lideres
```

## 📈 Dashboard Features

### Aba "Visão Geral"
- **KPIs**: Total de produtos, preço médio, custo médio
- **Gráfico de Pizza**: Distribuição por BU
- **Gráfico de Barras**: Segmentos vs. classificação
- **Alertas**: Produtos com dose alta e custo elevado

### Aba "Explorar" 
- **Filtros Avançados**: Por segmento, BU, classificação, etc.
- **Scatter Plot**: Preço vs. Custo (tamanho = menções)
- **Top Produtos**: Ranking por menções
- **Tabela Interativa**: Dados filtráveis e ordenáveis
- **Export CSV**: Dados filtrados

### Aba "Qualidade de Dados"
- Indicadores de completude por campo
- Análise de dados faltantes

### Aba "Upload/Sheets"
- Upload de arquivos CSV locais
- Integração com Google Sheets (em desenvolvimento)

## 🛠️ Scripts Úteis

```bash
# Importar dados do CSV
node scripts/import-csv-data.js

# Testar integração completa
node scripts/test-integration.js

# Iniciar em modo desenvolvimento
npm run dev
```

## 📝 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **@neondatabase/serverless** - Cliente Neon PostgreSQL
- **dotenv** - Gerenciamento de variáveis de ambiente

### Frontend  
- **Bootstrap 5** - Framework CSS
- **D3.js v7** - Visualizações de dados
- **DC.js** - Gráficos interativos com Crossfilter
- **Crossfilter2** - Análise dimensional de dados
- **Papa Parse** - Parser de CSV
- **Select2** - Dropdowns avançados

### Banco de Dados
- **Neon PostgreSQL** - Banco serverless
- **Triggers** - Atualização automática de timestamps
- **Índices** - Otimização de consultas

## 📊 Métricas dos Dados

### Top 5 Produtos por Menções
1. **Mover** (Stoller) - 23 menções - Enchimento
2. **Re-Leaf** - 21 menções - Indutores de Resistência  
3. **Stimulate** - 19 menções - Tratamento de Sementes
4. **Li 700** - 17 menções - Adjuvantes
5. **Hold** (Stoller) - 13 menções - Florescimento

### Estatísticas por Segmento
- **Vegetativo**: 10 produtos, preço médio R$ 38,56
- **Florescimento**: 5 produtos, preço médio R$ 39,26
- **Enchimento**: 2 produtos, custo médio R$ 1.169,61
- **Adjuvantes**: 2 produtos, custo médio R$ 8,34

## 🔧 Configuração Avançada

### Variáveis de Ambiente
```env
DATABASE_URL=postgresql://neondb_owner:***@ep-***.neon.tech/neondb?sslmode=require
NEON_PROJECT_ID=dark-meadow-05653794
NEON_BRANCH_ID=br-frosty-firefly-adfuj3q8
PORT=3001
```

### Estrutura de Arquivos
```
agrococorrentes/
├── app.js                 # Servidor principal
├── config.js             # Configurações
├── db/
│   ├── index.js          # Conexão Neon
│   └── schema.sql        # Schema de backup
├── routes/
│   └── produtos.js       # Rotas da API
├── scripts/
│   ├── import-csv-data.js    # Importação de dados
│   └── test-integration.js  # Testes
├── public/
│   ├── index.html        # Dashboard
│   ├── js/main.js        # JavaScript do frontend
│   └── style.css         # Estilos personalizados
└── middlewares/
    └── errorHandler.js   # Tratamento de erros
```

## 🚀 Deploy

Para deploy em produção, configure as variáveis de ambiente adequadas e use a string de conexão do Neon em produção.

---

**Desenvolvido com ❤️ para análise de concorrentes agrícolas** 