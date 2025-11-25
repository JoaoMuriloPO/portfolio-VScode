// src/programa/js/components/TabSystem.js

class TabSystem {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa o sistema de abas
    this.tabBar = document.querySelector('.tab-bar');
  }

  // Função para abrir tabs
  openTab(contentId, fileName) {
    // Se a sidebar estiver escondida, mostra ela automaticamente
    window.showSidebar();

    // Remove active class de todos os file items
    document.querySelectorAll('.file-item').forEach((item) => {
      item.classList.remove('active');
    });

    // Adiciona active class ao item clicado
    event.target.closest('.file-item').classList.add('active');

    // Verifica se a tab já existe
    const existingTab = document.getElementById(`tab-${contentId}`);
    if (existingTab) {
      // Se existe, apenas ativa ela
      this.activateTab(contentId);
      return;
    }

    // Cria nova tab
    this.createTab(contentId, fileName);

    // Ativa o conteúdo correspondente
    this.activateTab(contentId);
  }

  // Função para criar nova tab
  createTab(contentId, fileName) {
    // Remove active class de todas as tabs
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });

    // Cria nova tab
    const newTab = document.createElement('div');
    newTab.className = 'tab active';
    newTab.id = `tab-${contentId}`;

    // Define o ícone baseado no tipo de arquivo
    let icon = '📄';
    if (fileName.endsWith('.html')) icon = '🌐';
    else if (fileName.endsWith('.js')) icon = '📜';
    else if (fileName.endsWith('.tsx')) icon = '💼';
    else if (fileName.endsWith('.json')) icon = '📋';
    else if (fileName.endsWith('.css')) icon = '🎨';

    newTab.innerHTML = `
      <span class="tab-icon">${icon}</span>
      <span class="tab-name">${fileName}</span>
      <span class="tab-close" onclick="closeTab('${contentId}')">×</span>
    `;

    // Adiciona evento de click na tab
    newTab.addEventListener('click', (e) => {
      if (!e.target.classList.contains('tab-close')) {
        this.activateTab(contentId);
      }
    });

    this.tabBar.appendChild(newTab);
  }

  // Função para ativar tab
  activateTab(contentId) {
    // Remove active class de todas as tabs
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.remove('active');
    });

    // Remove active class de todos os conteúdos
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.remove('active');
    });

    // Ativa a tab e conteúdo correspondente
    const tab = document.getElementById(`tab-${contentId}`);
    const content = document.getElementById(`content-${contentId}`);

    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
  }

  // Função para fechar tab
  closeTab(contentId) {
    const tab = document.getElementById(`tab-${contentId}`);
    const content = document.getElementById(`content-${contentId}`);

    if (tab) {
      const wasActive = tab.classList.contains('active');
      tab.remove();

      // Se a tab fechada estava ativa, ativa a primeira tab disponível
      if (wasActive) {
        const firstTab = document.querySelector('.tab');
        if (firstTab) {
          const firstTabId = firstTab.id.replace('tab-', '');
          this.activateTab(firstTabId);

          // Atualiza o file explorer
          this.updateFileExplorerSelection(firstTabId);
        }
      }
    }
  }

  // Função para atualizar seleção no file explorer
  updateFileExplorerSelection(contentId) {
    document.querySelectorAll('.file-item').forEach((item) => {
      item.classList.remove('active');
    });

    // Mapeia contentId para file items
    const fileMap = {
      home: 'README.md',
      about: 'about.html',
      skills: 'skills.js',
      projects: 'projects.json',
      experience: 'experience.tsx',
      contact: 'contact.css',
    };

    const fileName = fileMap[contentId];
    if (fileName) {
      const fileItem = Array.from(document.querySelectorAll('.file-item')).find(
        (item) => item.querySelector('.file-name').textContent === fileName
      );
      if (fileItem) {
        fileItem.classList.add('active');
      }
    }
  }
}

// Exporta a classe TabSystem
export default TabSystem;

// Exporta funções específicas para uso global
export function openTab(contentId, fileName) {
  const tabSystemInstance = window.tabSystemInstance;
  if (tabSystemInstance) {
    tabSystemInstance.openTab(contentId, fileName);
  }
}

export function closeTab(contentId) {
  const tabSystemInstance = window.tabSystemInstance;
  if (tabSystemInstance) {
    tabSystemInstance.closeTab(contentId);
  }
}

export function activateTab(contentId) {
  const tabSystemInstance = window.tabSystemInstance;
  if (tabSystemInstance) {
    tabSystemInstance.activateTab(contentId);
  }
}
