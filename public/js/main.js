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
    console.log('📊 Inicializando dashboard com os dados:', data);
    currentData = data;
    
    // ... código existente para inicialização do dashboard ...

    // Atualizar gráficos
    dc.redrawAll();
  }

  function resetAllFilters() {
    console.log('🔄 Resetando todos os filtros...');
    
    // ... código existente para resetar filtros ...

    // Atualizar gráficos
    dc.redrawAll();
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

      // Também manter o evento change para quando o usuário pressionar Enter
      csvUpload.addEventListener('change', () => {
        // Automaticamente clica no botão quando um arquivo é selecionado
        csvUploadButton.click();
      });
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

  // ... outras funções existentes ...

})();
