// Dashboard de Concorrentes Agrícolas - App Principal
// Implementação completa com D3.js v7, Crossfilter2, DC.js e Bootstrap 5

(() => {
  'use strict';

  // =============== CONFIGURAÇÕES INICIAIS ===============
  const COLORS = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
  const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutos
  const API_BASE_URL = '/api/concorrentes';
  
  // =============== VARIÁVEIS GLOBAIS ===============
  let ndx;
  let dimensions = {};
  let groups = {};
  let charts = {};
  let currentData = [];
  let refreshTimer;

  // =============== INICIALIZAÇÃO ===============
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Dashboard de Concorrentes Agrícolas...');
    
    // Aguardar carregamento completo das bibliotecas
    setTimeout(() => {
      loadDataFromAPI();
      setupEventListeners();
      setupTabHandlers();
    }, 200);
  });

  // =============== CARREGAMENTO DE DADOS ===============
  async function loadDataFromAPI() {
    try {
      console.log('📡 Carregando dados da API...');
      const response = await fetch(API_BASE_URL);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Dados carregados:', data);
      
      // Normalizar dados para o formato esperado pelo dashboard
      const normalizedData = normalizeApiData(data);
      initializeDashboard(normalizedData);
      
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
      showToast('Erro ao carregar dados da API: ' + error.message, 'error');
      
      // Fallback para dados de exemplo se a API falhar
      const fallbackData = generateSampleData();
      initializeDashboard(fallbackData);
    }
  }

  // =============== NORMALIZAÇÃO DE DADOS ===============
  function normalizeApiData(apiData) {
    return apiData.map(item => ({
      id: item.id,
      segmento: item.segmento || 'Não informado',
      bu: item.bu || 'Não informado',
      produto: item.nome_produto || 'Produto sem nome',
      marca: item.marca || '-',
      precoLitro: parseFloat(item.preco_l) || 0,
      doseHa: parseFloat(item.dose_ha) || 0,
      custoHa: parseFloat(item.custo_ha) || 0,
      classifDose: item.classif_dose || 'Não classificado',
      classifPreco: item.classif_preco || 'Não classificado',
      reconhecMercado: item.reconhec_mercado || 'Não informado',
      reconhecConsultor: item.reconhec_consultor || 'Não informado',
      composicao: item.composicao || 'Não informado',
      estagioUso: item.estagio_de_uso || 'Não informado',
      classificacaoFinal: item.classificacao_final || 'Não classificado',
      regional: item.regional || 'Não informado',
      mencoes: parseInt(item.mencoes) || 0
    }));
  }

  function generateSampleData() {
    return [
      {
        id: 1,
        segmento: "Florescimento",
        bu: "BU3",
        produto: "Hold",
        marca: "Stoller",
        precoLitro: 69.5,
        doseHa: 0.5,
        custoHa: 34.25,
        classifDose: "Muito Baixa",
        classifPreco: "Moderado",
        reconhecMercado: "Alto",
        reconhecConsultor: "Muito recomendado",
        composicao: "Apenas Nutricional",
        estagioUso: "Intermediário",
        classificacaoFinal: "Líder",
        regional: "Leste",
        mencoes: 13
      },
      {
        id: 2,
        segmento: "Enchimento",
        bu: "BU3",
        produto: "Mover",
        marca: "Stoller",
        precoLitro: 42.93,
        doseHa: 1.8,
        custoHa: 1693.77,
        classifDose: "Baixa",
        classifPreco: "Baixo",
        reconhecMercado: "Médio",
        reconhecConsultor: "Pouco recomendado",
        composicao: "Apenas Nutricional",
        estagioUso: "Entrada",
        classificacaoFinal: "Baixo Potencial",
        regional: "Leste",
        mencoes: 23
      }
    ];
  }

  // =============== FUNÇÕES PRINCIPAIS ===============
  function initializeDashboard(data) {
    console.log('📊 Inicializando dashboard com os dados:', data);
    currentData = data;
    
    if (!data || data.length === 0) {
      showToast('Nenhum dado encontrado', 'warning');
      return;
    }

    try {
      // Criar crossfilter
      ndx = crossfilter(data);
      
      // Criar dimensões
      dimensions.segmento = ndx.dimension(d => d.segmento);
      dimensions.bu = ndx.dimension(d => d.bu);
      dimensions.classificacaoFinal = ndx.dimension(d => d.classificacaoFinal);
      dimensions.produto = ndx.dimension(d => d.produto);
      dimensions.mencoes = ndx.dimension(d => d.mencoes);
      dimensions.precoLitro = ndx.dimension(d => d.precoLitro);
      dimensions.custoHa = ndx.dimension(d => d.custoHa);
      
      // Criar grupos
      groups.segmento = dimensions.segmento.group();
      groups.bu = dimensions.bu.group();
      groups.classificacaoFinal = dimensions.classificacaoFinal.group();
      groups.mencoes = dimensions.mencoes.group();
      
      // Inicializar gráficos
      initializeCharts();
      
      // Atualizar KPIs
      updateKPIs();
      
      // Popular filtros
      populateFilters();
      
      // Renderizar todos os gráficos
      dc.renderAll();
      
      console.log('✅ Dashboard inicializado com sucesso');
      
    } catch (error) {
      console.error('❌ Erro ao inicializar dashboard:', error);
      showToast('Erro ao inicializar dashboard: ' + error.message, 'error');
    }
  }

  function initializeCharts() {
    // Gráfico de pizza - BU
    charts.buPie = dc.pieChart('#bu-pie-chart');
    charts.buPie
      .width(250)
      .height(250)
      .radius(100)
      .dimension(dimensions.bu)
      .group(groups.bu)
      .colors(d3.scaleOrdinal(COLORS))
      .renderLabel(true)
      .renderTitle(true);

    // Gráfico de barras - Segmento x Classificação
    charts.segmentClass = dc.rowChart('#segment-class-chart');
    charts.segmentClass
      .width(600)
      .height(300)
      .dimension(dimensions.segmento)
      .group(groups.segmento)
      .colors(d3.scaleOrdinal(COLORS))
      .elasticX(true)
      .xAxis().ticks(4);

    // Scatter plot
    const scatterDim = ndx.dimension(d => [d.precoLitro, d.custoHa, d.mencoes]);
    const scatterGroup = scatterDim.group();
    
    charts.scatter = dc.scatterPlot('#scatter-plot');
    charts.scatter
      .width(700)
      .height(400)
      .dimension(scatterDim)
      .group(scatterGroup)
      .x(d3.scaleLinear().domain([0, d3.max(currentData, d => d.precoLitro) * 1.1]))
      .y(d3.scaleLinear().domain([0, d3.max(currentData, d => d.custoHa) * 1.1]))
      .radiusValueAccessor(d => Math.sqrt(d.key[2]) * 2)
      .colors(d3.scaleOrdinal(COLORS))
      .colorAccessor(() => Math.floor(Math.random() * COLORS.length))
      .symbolSize(8)
      .clipPadding(10);

    // Row chart - Top menções
    const topMencoesDim = ndx.dimension(d => d.produto);
    const topMencoesGroup = topMencoesDim.group().reduceSum(d => d.mencoes);
    
    charts.rowChart = dc.rowChart('#row-chart');
    charts.rowChart
      .width(700)
      .height(400)
      .dimension(topMencoesDim)
      .group(topMencoesGroup)
      .colors(d3.scaleOrdinal(COLORS))
      .elasticX(true)
      .cap(10)
      .othersGrouper(false)
      .xAxis().ticks(4);

    // Data table
    charts.dataTable = dc.dataTable('#data-table');
    charts.dataTable
      .dimension(dimensions.produto)
      .group(d => d.segmento)
      .size(50)
      .columns([
        'produto',
        'marca',
        'segmento',
        'bu',
        {
          label: 'Preço/L',
          format: d => `R$ ${d.precoLitro.toFixed(2)}`
        },
        {
          label: 'Custo/ha',
          format: d => `R$ ${d.custoHa.toFixed(2)}`
        },
        'classificacaoFinal',
        'mencoes'
      ])
      .sortBy(d => d.mencoes)
      .order(d3.descending);
  }

  function updateKPIs() {
    const totalProdutos = ndx.groupAll().reduceCount().value();
    const precoMedio = ndx.groupAll().reduceSum(d => d.precoLitro).value() / totalProdutos;
    const custoMedio = ndx.groupAll().reduceSum(d => d.custoHa).value() / totalProdutos;
    
    document.getElementById('kpi-total').textContent = totalProdutos;
    document.getElementById('kpi-preco').textContent = `R$ ${precoMedio.toFixed(2)}`;
    document.getElementById('kpi-custo').textContent = `R$ ${custoMedio.toFixed(2)}`;
  }

  function populateFilters() {
    // Popular dropdowns de filtro
    const segmentos = [...new Set(currentData.map(d => d.segmento))].sort();
    const bus = [...new Set(currentData.map(d => d.bu))].sort();
    const reconhecMercados = [...new Set(currentData.map(d => d.reconhecMercado))].sort();
    
    populateSelect('filter-segmento', segmentos);
    populateSelect('filter-bu', bus);
    populateSelect('filter-reconhec-mercado', reconhecMercados);
    populateSelect('filter-reconhec-consultor', [...new Set(currentData.map(d => d.reconhecConsultor))].sort());
    populateSelect('filter-composicao', [...new Set(currentData.map(d => d.composicao))].sort());
    populateSelect('filter-estagio-uso', [...new Set(currentData.map(d => d.estagioUso))].sort());
    populateSelect('filter-classif-dose', [...new Set(currentData.map(d => d.classifDose))].sort());
    populateSelect('filter-classif-preco', [...new Set(currentData.map(d => d.classifPreco))].sort());
    populateSelect('filter-classificacao-final', [...new Set(currentData.map(d => d.classificacaoFinal))].sort());
  }

  function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '';
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
  }

  function resetAllFilters() {
    console.log('🔄 Resetando todos os filtros...');
    
    // Resetar dimensões do crossfilter
    Object.values(dimensions).forEach(dim => dim.filterAll());
    
    // Atualizar gráficos
    dc.redrawAll();
    
    // Atualizar KPIs
    updateKPIs();
    
    showToast('Filtros resetados!', 'success');
  }

  function setupEventListeners() {
    console.log('🔗 Configurando event listeners...');
    
    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }

    // CSV Upload
    const csvUpload = document.getElementById('csv-upload');
    const csvUploadButton = document.getElementById('csv-upload-button');
    
    if (csvUploadButton && csvUpload) {
      csvUploadButton.addEventListener('click', () => {
        if (csvUpload.files.length > 0) {
          handleCSVUpload({ target: csvUpload });
        } else {
          showToast('Por favor, selecione um arquivo CSV primeiro', 'error');
        }
      });

      csvUpload.addEventListener('change', () => {
        if (csvUpload.files.length > 0) {
          csvUploadButton.click();
        }
      });
    }

    // Google Sheets
    const loadSheetsBtn = document.getElementById('load-sheets');
    if (loadSheetsBtn) {
      loadSheetsBtn.addEventListener('click', handleGoogleSheets);
    }

    // Export CSV
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportToCSV);
    }
  }

  function setupTabHandlers() {
    // Aguardar mudanças de tab para recalcular gráficos
    const tabElements = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabElements.forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          dc.redrawAll();
        }, 100);
      });
    });
  }

  function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const csv = e.target.result;
        const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
        
        if (result.errors.length > 0) {
          showToast('Erro ao processar CSV: ' + result.errors[0].message, 'error');
          return;
        }

        const newData = normalizeCsvData(result.data);
        initializeDashboard(newData);
        showToast(`${newData.length} registros carregados!`, 'success');
        
      } catch (error) {
        showToast('Erro ao processar arquivo: ' + error.message, 'error');
      }
    };
    
    reader.readAsText(file);
  }

  function normalizeCsvData(csvData) {
    return csvData.map((row, index) => ({
      id: index + 1,
      segmento: row.Segmento || row.segmento || 'Não informado',
      bu: row.BU || row.bu || 'Não informado',
      produto: row['Nome Produto'] || row.produto || row.nome_produto || 'Produto sem nome',
      marca: row.Marca || row.marca || '-',
      precoLitro: parseFloat(row['Preço/L'] || row.preco_litro || row.precoLitro || 0),
      doseHa: parseFloat(row['Dose/ha'] || row.dose_ha || row.doseHa || 0),
      custoHa: parseFloat(row['Custo/ha'] || row.custo_ha || row.custoHa || 0),
      classifDose: row['Classif. Dose'] || row.classif_dose || row.classifDose || 'Não classificado',
      classifPreco: row['Classif. Preço'] || row.classif_preco || row.classifPreco || 'Não classificado',
      reconhecMercado: row['Reconhec. Mercado'] || row.reconhec_mercado || row.reconhecMercado || 'Não informado',
      reconhecConsultor: row['Reconhec. Consultor'] || row.reconhec_consultor || row.reconhecConsultor || 'Não informado',
      composicao: row.Composição || row.composicao || row.Composicao || 'Não informado',
      estagioUso: row['Estágio de Uso'] || row.estagio_uso || row.estagioUso || 'Não informado',
      classificacaoFinal: row['Classificação Final'] || row.classificacao_final || row.classificacaoFinal || 'Não classificado',
      regional: row.Regional || row.regional || 'Não informado',
      mencoes: parseInt(row.Menções || row.mencoes || row.Mencoes || 0)
    }));
  }

  function handleGoogleSheets() {
    showToast('Funcionalidade em desenvolvimento', 'info');
  }

  function exportToCSV() {
    try {
      const filteredData = dimensions.produto.top(Infinity);
      const csv = Papa.unparse(filteredData);
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `concorrentes_agricolas_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      showToast('CSV exportado com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao exportar CSV: ' + error.message, 'error');
    }
  }

  function showToast(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Criar toast element
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'} border-0`;
    toast.setAttribute('role', 'alert');
    
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove();
    });
  }

  function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1055';
    document.body.appendChild(container);
    return container;
  }

  // =============== AUTO-REFRESH ===============
  function startAutoRefresh() {
    refreshTimer = setInterval(() => {
      console.log('🔄 Auto-refresh dos dados...');
      loadDataFromAPI();
    }, REFRESH_INTERVAL);
  }

  function stopAutoRefresh() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  // Iniciar auto-refresh após carregamento inicial
  setTimeout(startAutoRefresh, 5000);

})();
