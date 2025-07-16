// Dashboard de Concorrentes Agrícolas - App Principal
// Implementação completa com D3.js v7, Crossfilter2, DC.js e Bootstrap 5

(() => {
  'use strict';

  // =============== CONFIGURAÇÕES INICIAIS ===============
  const COLORS = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];
  const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutos
  
  // Dados iniciais fornecidos
  const initialData = [
    {"segmento":"Florescimento","bu":"BU1","produto":"Hold","marca":"Stoller","precoLitro":69.5,"doseHa":0.5,"custoHa":34.25,"classifDose":"Muito Baixa","classifPreco":"Moderado","reconhecMercado":"Alto","reconhecConsultor":"Muito recomendado","composicao":"Apenas Nutricional","estagioUso":"Intermediário","classificacaoFinal":"Líder","mencoes":13},
    {"segmento":"Enchimento","bu":"BU3","produto":"Mover","marca":"Stoller","precoLitro":42.93,"doseHa":1.8,"custoHa":1693.77,"classifDose":"Baixa","classifPreco":"Baixo","reconhecMercado":"Médio","reconhecConsultor":"Pouco recomendado","composicao":"Apenas Nutricional","estagioUso":"Entrada","classificacaoFinal":"Baixo Potencial","mencoes":23},
    {"segmento":"Adjuvantes","bu":"BU2","produto":"Li 700","marca":"ICL","precoLitro":75.63,"doseHa":0.14,"custoHa":8.07,"classifDose":"Moderado","classifPreco":"Moderado","reconhecMercado":"Baixa","reconhecConsultor":"Excelente","composicao":"Completa","estagioUso":"Consolidado","classificacaoFinal":"Líder","qualidadeTecnica":"Excelente","mencoes":17},
    {"segmento":"Condicionador de Solo","bu":"BU1","produto":"Byofol","marca":"Ubyfol","precoLitro":23.3,"doseHa":5.06,"custoHa":120.04,"reconhecMercado":"Alto","qualidadeTecnica":"Razoável","composicao":"Parcialmente Balanceada","estagioUso":"Intermediário","resultadosCampo":"Muitos positivos","focoEmpresa":"Sim","classificacaoFinal":"Alto Potencial","classifDose":"Alta","classifPreco":"Moderado","mencoes":17},
    {"segmento":"Indutor Res","bu":"BU2","produto":"Re-Leaf","marca":"-","precoLitro":73.9,"doseHa":0.95,"custoHa":70.35,"classifDose":"Moderada","classifPreco":"Alto","reconhecMercado":"Alto","reconhecConsultor":"Pouco Recomendado","composicao":"Parcialmente Balanceada","estagioUso":"Intermediário","classificacaoFinal":"Alto Potencial","mencoes":21}
  ];

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
      initializeDashboard(initialData);
      setupEventListeners();
      setupTabHandlers();
    }, 200);
  });

  // =============== FUNÇÕES PRINCIPAIS ===============
  function initializeDashboard(data) {
    console.log('📊 Configurando dashboard com', data.length, 'registros');
    
    // Limpar gráficos existentes
    if (typeof dc !== 'undefined') {
      dc.chartRegistry.clear();
    }
    
    // Normalizar dados
    currentData = normalizeData(data);
    
    // Criar crossfilter
    ndx = crossfilter(currentData);
    
    // Criar dimensões
    createDimensions();
    
    // Criar grupos
    createGroups();
    
    // Construir gráficos
    buildCharts();
    
    // Configurar filtros
    setTimeout(() => {
      setupFilters();
    }, 100);
    
    // Construir tabela
    buildDataTable();
    
    // Atualizar KPIs
    updateKPIs();
    
    // Atualizar indicadores de qualidade
    updateQualityIndicators();
    
    // Atualizar alertas
    updateAlerts();
    
    // Renderizar todos os gráficos
    setTimeout(() => {
      if (typeof dc !== 'undefined') {
        dc.renderAll();
        console.log('✅ Dashboard renderizado com sucesso');
      }
    }, 300);
  }

  function normalizeData(data) {
    return data.map(d => ({
      segmento: d.segmento || 'Sem Segmento',
      bu: d.bu || 'Sem BU',
      produto: d.produto || 'Sem Nome',
      marca: d.marca || 'Sem Marca',
      precoLitro: +(d.precoLitro || 0),
      doseHa: +(d.doseHa || 0),
      custoHa: +(d.custoHa || 0),
      classifDose: d.classifDose || 'Sem Classificação',
      classifPreco: d.classifPreco || 'Sem Classificação',
      reconhecMercado: d.reconhecMercado || 'Sem Informação',
      reconhecConsultor: d.reconhecConsultor || 'Sem Informação',
      composicao: d.composicao || 'Sem Informação',
      estagioUso: d.estagioUso || 'Sem Informação',
      classificacaoFinal: d.classificacaoFinal || 'Sem Classificação',
      mencoes: +(d.mencoes || 0),
      qualidadeTecnica: d.qualidadeTecnica || 'Sem Informação',
      resultadosCampo: d.resultadosCampo || 'Sem Informação',
      focoEmpresa: d.focoEmpresa || 'Sem Informação'
    }));
  }

  function createDimensions() {
    dimensions = {
      all: ndx.dimension(d => d.produto),
      segmento: ndx.dimension(d => d.segmento),
      bu: ndx.dimension(d => d.bu),
      produto: ndx.dimension(d => d.produto),
      reconhecMercado: ndx.dimension(d => d.reconhecMercado),
      reconhecConsultor: ndx.dimension(d => d.reconhecConsultor),
      composicao: ndx.dimension(d => d.composicao),
      estagioUso: ndx.dimension(d => d.estagioUso),
      classifDose: ndx.dimension(d => d.classifDose),
      classifPreco: ndx.dimension(d => d.classifPreco),
      classificacaoFinal: ndx.dimension(d => d.classificacaoFinal),
      scatter: ndx.dimension(d => [d.precoLitro, d.custoHa]),
      segmentoClassif: ndx.dimension(d => d.segmento + '|' + d.classificacaoFinal)
    };
  }

  function createGroups() {
    groups = {
      buGroup: dimensions.bu.group(),
      segmentoGroup: dimensions.segmento.group(),
      produtoMencoes: dimensions.produto.group().reduceSum(d => d.mencoes),
      segmentoClassifGroup: dimensions.segmentoClassif.group(),
      scatterGroup: dimensions.scatter.group().reduce(
        (p, v) => {
          p.produto = v.produto;
          p.bu = v.bu;
          p.mencoes = v.mencoes;
          p.segmento = v.segmento;
          return p;
        },
        () => ({ produto: '', bu: '', mencoes: 0, segmento: '' }),
        () => ({ produto: '', bu: '', mencoes: 0, segmento: '' })
      )
    };
  }

  function buildCharts() {
    console.log('🎨 Construindo gráficos...');

    // Gráfico de Pizza - BU
    charts.buPie = new dc.PieChart('#bu-pie-chart');
    charts.buPie
      .width(300)
      .height(300)
      .innerRadius(50)
      .dimension(dimensions.bu)
      .group(groups.buGroup)
      .colors(d3.scaleOrdinal(COLORS))
      .legend(dc.legend().x(20).y(10).itemHeight(13).gap(5))
      .on('filtered', refreshDashboard);

    // Gráfico de Barras Empilhadas - Segmento x Classificação
    charts.segmentClass = new dc.BarChart('#segment-class-chart');
    charts.segmentClass
      .width(600)
      .height(300)
      .dimension(dimensions.segmento)
      .group(groups.segmentoGroup)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .colors(d3.scaleOrdinal(COLORS))
      .elasticY(true)
      .yAxisLabel('Quantidade')
      .xAxisLabel('Segmento')
      .on('filtered', refreshDashboard);

    // Scatter Plot - Preço vs Custo
    charts.scatterPlot = new dc.ScatterPlot('#scatter-plot');
    const maxPreco = d3.max(currentData, d => d.precoLitro) || 100;
    const maxCusto = d3.max(currentData, d => d.custoHa) || 2000;
    
    charts.scatterPlot
      .width(700)
      .height(400)
      .dimension(dimensions.scatter)
      .group(groups.scatterGroup)
      .x(d3.scaleLinear().domain([0, maxPreco * 1.1]))
      .y(d3.scaleLinear().domain([0, maxCusto * 1.1]))
      .symbolSize(d => Math.max(8, d.value.mencoes * 2))
      .colors(d => getBUColor(d.value.bu))
      .colorAccessor(d => d.value.bu)
      .title(d => `${d.value.produto}\nBU: ${d.value.bu}\nPreço/L: R$ ${d.key[0].toFixed(2)}\nCusto/ha: R$ ${d.key[1].toFixed(2)}\nMenções: ${d.value.mencoes}`)
      .margins({ top: 20, right: 20, bottom: 50, left: 80 })
      .xAxisLabel('Preço por Litro (R$)')
      .yAxisLabel('Custo por Hectare (R$)')
      .renderHorizontalGridLines(true)
      .renderVerticalGridLines(true)
      .on('filtered', refreshDashboard);

    // Row Chart - Top Produtos
    charts.rowChart = new dc.RowChart('#row-chart');
    charts.rowChart
      .width(700)
      .height(300)
      .dimension(dimensions.produto)
      .group(groups.produtoMencoes)
      .elasticX(true)
      .cap(10)
      .othersGrouper(false)
      .colors(COLORS[0])
      .margins({ top: 20, right: 20, bottom: 30, left: 150 })
      .ordering(d => -d.value)
      .on('filtered', refreshDashboard);

    console.log('✅ Gráficos construídos');
  }

  function setupFilters() {
    console.log('🎛️ Configurando filtros...');
    
    const filterConfigs = [
      { selector: '#filter-segmento', dimension: 'segmento', field: 'segmento' },
      { selector: '#filter-bu', dimension: 'bu', field: 'bu' },
      { selector: '#filter-reconhec-mercado', dimension: 'reconhecMercado', field: 'reconhecMercado' },
      { selector: '#filter-reconhec-consultor', dimension: 'reconhecConsultor', field: 'reconhecConsultor' },
      { selector: '#filter-composicao', dimension: 'composicao', field: 'composicao' },
      { selector: '#filter-estagio-uso', dimension: 'estagioUso', field: 'estagioUso' },
      { selector: '#filter-classif-dose', dimension: 'classifDose', field: 'classifDose' },
      { selector: '#filter-classif-preco', dimension: 'classifPreco', field: 'classifPreco' },
      { selector: '#filter-classificacao-final', dimension: 'classificacaoFinal', field: 'classificacaoFinal' }
    ];

    filterConfigs.forEach(config => {
      setupSelectFilter(config.selector, config.dimension, config.field);
    });
  }

  function setupSelectFilter(selector, dimensionName, field) {
    const selectElement = document.querySelector(selector);
    if (!selectElement) return;

    const uniqueValues = [...new Set(currentData.map(d => d[field]))].sort();
    
    // Limpar opções existentes
    selectElement.innerHTML = '';
    
    // Adicionar opções
    uniqueValues.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      selectElement.appendChild(option);
    });

    // Configurar Select2 se disponível
    if (typeof $ !== 'undefined' && $.fn.select2) {
      $(selector).select2({
        placeholder: 'Selecione...',
        allowClear: true,
        width: '100%'
      });

      // Configurar evento de mudança
      $(selector).on('change', function() {
        const values = $(this).val();
        const dimension = dimensions[dimensionName];
        
        if (values && values.length > 0) {
          dimension.filter(d => values.includes(d));
        } else {
          dimension.filterAll();
        }
        
        refreshDashboard();
      });
    } else {
      // Fallback para select nativo
      selectElement.addEventListener('change', function() {
        const values = Array.from(this.selectedOptions).map(option => option.value);
        const dimension = dimensions[dimensionName];
        
        if (values && values.length > 0) {
          dimension.filter(d => values.includes(d));
        } else {
          dimension.filterAll();
        }
        
        refreshDashboard();
      });
    }
  }

  function setupTabHandlers() {
    console.log('🔧 Configurando manipuladores de abas...');
    
    // Configurar eventos de aba manualmente
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover classes ativas
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => {
          pane.classList.remove('show', 'active');
        });
        
        // Adicionar classe ativa ao botão clicado
        this.classList.add('active');
        
        // Mostrar a aba correspondente
        const targetId = this.getAttribute('data-bs-target');
        const targetPane = document.querySelector(targetId);
        if (targetPane) {
          targetPane.classList.add('show', 'active');
        }
        
        // Re-renderizar gráficos após mudança de aba
        setTimeout(() => {
          if (typeof dc !== 'undefined') {
            dc.renderAll();
          }
          
          // Atualizar conteúdo específico da aba
          if (targetId === '#qualidade') {
            updateQualityIndicators();
          }
        }, 100);
      });
    });
  }

  function buildDataTable() {
    const filteredData = dimensions.all.top(Infinity);
    const tableContainer = document.getElementById('data-table');
    
    if (!tableContainer) return;

    let html = `
      <div class="table-wrapper">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Segmento</th>
              <th>BU</th>
              <th>Marca</th>
              <th>Preço/L</th>
              <th>Custo/ha</th>
              <th>Menções</th>
              <th>Classif. Final</th>
            </tr>
          </thead>
          <tbody>
    `;

    filteredData.forEach(d => {
      html += `
        <tr>
          <td>${d.produto}</td>
          <td>${d.segmento}</td>
          <td>${d.bu}</td>
          <td>${d.marca}</td>
          <td>R$ ${d.precoLitro.toFixed(2)}</td>
          <td>R$ ${d.custoHa.toFixed(2)}</td>
          <td>${d.mencoes}</td>
          <td><span class="status-badge status-${slugify(d.classificacaoFinal)}">${d.classificacaoFinal}</span></td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    tableContainer.innerHTML = html;
  }

  function updateKPIs() {
    const filteredData = dimensions.all.top(Infinity);
    const total = filteredData.length;
    const precoMedio = total > 0 ? filteredData.reduce((sum, d) => sum + d.precoLitro, 0) / total : 0;
    const custoMedio = total > 0 ? filteredData.reduce((sum, d) => sum + d.custoHa, 0) / total : 0;

    const totalEl = document.getElementById('kpi-total');
    const precoEl = document.getElementById('kpi-preco');
    const custoEl = document.getElementById('kpi-custo');

    if (totalEl) totalEl.textContent = total;
    if (precoEl) precoEl.textContent = `R$ ${precoMedio.toFixed(2)}`;
    if (custoEl) custoEl.textContent = `R$ ${custoMedio.toFixed(2)}`;
  }

  function updateQualityIndicators() {
    const filteredData = dimensions.all.top(Infinity);
    const fields = [
      { key: 'segmento', label: 'Segmento' },
      { key: 'bu', label: 'Business Unit' },
      { key: 'reconhecMercado', label: 'Reconhecimento Mercado' },
      { key: 'reconhecConsultor', label: 'Reconhecimento Consultor' },
      { key: 'composicao', label: 'Composição' },
      { key: 'estagioUso', label: 'Estágio de Uso' },
      { key: 'classifDose', label: 'Classificação Dose' },
      { key: 'classifPreco', label: 'Classificação Preço' },
      { key: 'classificacaoFinal', label: 'Classificação Final' }
    ];

    const container = document.getElementById('quality-indicators');
    if (!container) return;

    let html = '';
    fields.forEach(field => {
      const total = filteredData.length;
      const filled = filteredData.filter(d => d[field.key] && d[field.key] !== 'Sem Informação' && d[field.key] !== 'Sem Classificação').length;
      const percentage = total > 0 ? (filled / total) * 100 : 0;
      
      let qualityClass = 'quality-poor';
      if (percentage >= 90) qualityClass = 'quality-good';
      else if (percentage >= 70) qualityClass = 'quality-warning';

      html += `
        <div class="quality-indicator">
          <div class="quality-label">
            <span><strong>${field.label}</strong></span>
            <span>${percentage.toFixed(1)}%</span>
          </div>
          <div class="quality-bar">
            <div class="quality-fill ${qualityClass}" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function updateAlerts() {
    const filteredData = dimensions.all.top(Infinity);
    const custos = filteredData.map(d => d.custoHa).filter(c => c > 0).sort((a, b) => a - b);
    const p75 = d3.quantile(custos, 0.75) || 0;
    
    const alertData = filteredData.filter(d => 
      d.classifDose === 'Alta' || d.custoHa >= p75
    );

    const container = document.getElementById('alerts-container');
    if (!container) return;

    if (alertData.length === 0) {
      container.innerHTML = '<p class="text-muted">Nenhum alerta encontrado.</p>';
      return;
    }

    let html = '';
    alertData.forEach(d => {
      const reasons = [];
      if (d.classifDose === 'Alta') reasons.push('Dose Alta');
      if (d.custoHa >= p75) reasons.push('Custo ≥ 75º percentil');
      
      html += `
        <div class="alert-item" onclick="highlightProduct('${d.produto}')">
          <strong>${d.produto}</strong> (${d.segmento} - ${d.bu})
          <br>
          <small>Motivo: ${reasons.join(', ')} | Custo: R$ ${d.custoHa.toFixed(2)}</small>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function refreshDashboard() {
    if (typeof dc !== 'undefined') {
      dc.redrawAll();
    }
    updateKPIs();
    updateQualityIndicators();
    updateAlerts();
    buildDataTable();
  }

  function resetAllFilters() {
    console.log('🔄 Resetando filtros...');
    
    if (typeof dc !== 'undefined') {
      dc.filterAll();
      dc.redrawAll();
    }
    
    // Resetar Select2
    const selects = [
      '#filter-segmento', '#filter-bu', '#filter-reconhec-mercado',
      '#filter-reconhec-consultor', '#filter-composicao', '#filter-estagio-uso',
      '#filter-classif-dose', '#filter-classif-preco', '#filter-classificacao-final'
    ];
    
    selects.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        if (typeof $ !== 'undefined' && $.fn.select2) {
          $(selector).val(null).trigger('change');
        } else {
          element.selectedIndex = -1;
        }
      }
    });
    
    refreshDashboard();
    showToast('Filtros resetados com sucesso!', 'success');
  }

  function exportCSV() {
    const filteredData = dimensions.all.top(Infinity);
    const csv = Papa.unparse(filteredData);
    downloadFile(csv, 'dados-filtrados.csv', 'text/csv');
    showToast('Dados exportados com sucesso!', 'success');
  }

  function setupEventListeners() {
    console.log('🔗 Configurando event listeners...');
    
    // Reset filters
    const resetBtn = document.getElementById('reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }
    
    // Export CSV
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', exportCSV);
    }
    
    // CSV Upload
    const csvUpload = document.getElementById('csv-upload');
    if (csvUpload) {
      csvUpload.addEventListener('change', handleCSVUpload);
    }
    
    // Google Sheets
    const loadSheetsBtn = document.getElementById('load-sheets');
    if (loadSheetsBtn) {
      loadSheetsBtn.addEventListener('click', handleGoogleSheets);
    }
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

  function handleGoogleSheets() {
    const url = document.getElementById('sheets-url').value.trim();
    if (!url) {
      showToast('Por favor, cole a URL do Google Sheets', 'error');
      return;
    }

    // Converter URL para formato CSV
    const csvUrl = url.replace('/edit#gid=', '/export?format=csv&gid=').replace(/\/edit.*$/, '/export?format=csv');
    
    showToast('Carregando dados do Google Sheets...', 'info');
    
    fetch(csvUrl)
      .then(response => response.text())
      .then(csv => {
        const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const newData = normalizeCsvData(result.data);
        initializeDashboard(newData);
        showToast(`${newData.length} registros carregados do Google Sheets!`, 'success');
        
        // Configurar auto-refresh
        setupAutoRefresh(csvUrl);
      })
      .catch(error => {
        showToast('Erro ao carregar Google Sheets: ' + error.message, 'error');
      });
  }

  function normalizeCsvData(data) {
    return data.map(row => {
      const normalized = {};
      Object.keys(row).forEach(key => {
        const normalizedKey = normalizeHeader(key);
        normalized[normalizedKey] = row[key];
      });
      return normalizeData([normalized])[0];
    });
  }

  function normalizeHeader(header) {
    return header
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .replace(/^(.)/, (match, p1) => p1.toLowerCase());
  }

  function setupAutoRefresh(csvUrl) {
    if (refreshTimer) clearInterval(refreshTimer);
    
    refreshTimer = setInterval(() => {
      fetch(csvUrl)
        .then(response => response.text())
        .then(csv => {
          const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
          const newData = normalizeCsvData(result.data);
          initializeDashboard(newData);
          console.log('📊 Dados atualizados automaticamente');
        })
        .catch(error => {
          console.error('Erro na atualização automática:', error);
        });
    }, REFRESH_INTERVAL);
  }

  // =============== FUNÇÕES UTILITÁRIAS ===============
  function getBUColor(bu) {
    const colorMap = {
      'BU1': COLORS[0],
      'BU2': COLORS[1],
      'BU3': COLORS[2],
      'BU4': COLORS[3]
    };
    return colorMap[bu] || COLORS[4];
  }

  function slugify(text) {
    return text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function showToast(message, type = 'success') {
    // Criar toast simples
    const toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1050;
      background: ${type === 'error' ? '#dc3545' : type === 'info' ? '#17a2b8' : '#28a745'};
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      font-size: 14px;
      max-width: 300px;
    `;
    toastContainer.textContent = message;
    
    document.body.appendChild(toastContainer);
    
    setTimeout(() => {
      toastContainer.remove();
    }, 4000);
  }

  function highlightProduct(productName) {
    // Filtrar por produto específico
    dimensions.produto.filter(productName);
    refreshDashboard();
    showToast(`Produto "${productName}" selecionado`, 'info');
  }

  // Expor funções globais se necessário
  window.highlightProduct = highlightProduct;

  console.log('✅ Dashboard de Concorrentes Agrícolas inicializado com sucesso!');
})();