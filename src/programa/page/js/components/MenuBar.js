// src/programa/js/components/MenuBar.js
class MenuBar {
  constructor() {
    this.menuItems = [
      {
        text: 'File',
        action: this.handleFileMenu.bind(this),
        submenu: [
          { text: 'New Project', action: () => this.showNewProjects() },
          { text: 'Explorer', action: () => this.toggleExplorer() },
          { text: 'Open Resume', action: () => this.openResume() },
          { text: 'Download CV', action: () => this.downloadCV() },
          { text: 'Share Portfolio', action: () => this.sharePortfolio() },
          { text: 'Exit', action: () => this.exitPortfolio() },
        ],
      },
      {
        text: 'Edit',
        action: this.handleEditMenu.bind(this),
        submenu: [
          { text: 'Copy Contact Info', action: () => this.copyContactInfo() },
          { text: 'Find Skills', action: () => this.findSkills() },
          {
            text: 'Replace Technology',
            action: () => this.replaceTechnology(),
          },
          { text: 'Format Code', action: () => this.formatCode() },
        ],
      },
      {
        text: 'View',
        action: this.handleViewMenu.bind(this),
        submenu: [
          { text: 'Command Palette', action: () => this.showCommandPalette() },
          { text: 'Explorer', action: () => this.toggleExplorer() },
          { text: 'Appearance', action: () => this.showAppearance() },
        ],
      },

      {
        text: 'Run',
        action: this.handleRunMenu.bind(this),
        submenu: [
          { text: 'Start Debugging', action: () => this.startDebugging() },
          {
            text: 'Run Without Debugging',
            action: () => this.runWithoutDebugging(),
          },
          { text: 'Run Tests', action: () => this.runTests() },
          { text: 'Build Project', action: () => this.buildProject() },
        ],
      },
      {
        text: 'Terminal',
        action: this.handleTerminalMenu.bind(this),
        submenu: [
          { text: 'New Terminal', action: () => window.toggleTerminal() },
          { text: 'Clear Terminal', action: () => this.clearTerminal() },
          { text: 'Run Active File', action: () => this.runActiveFile() },
        ],
      },
      {
        text: 'Help',
        action: this.handleHelpMenu.bind(this),
        submenu: [
          { text: 'Welcome', action: () => this.showWelcome() },
          { text: 'Get Started', action: () => this.getStarted() },
          { text: 'About Me', action: () => this.showAboutMe() },
          { text: 'Contact', action: () => this.showContact() },
          { text: 'Social Media', action: () => this.showSocialMedia() },
        ],
      },
    ];
    this.activeSubmenu = null;
    this.init();
  }

  init() {
    // Seleciona a barra de menu
    this.menuBar = document.querySelector('.menu-bar');

    // Limpa a barra de menu
    this.menuBar.innerHTML = '';

    // Adiciona os itens de menu
    this.menuItems.forEach((item, index) => {
      const menuItem = document.createElement('span');
      menuItem.className = 'menu-item';
      menuItem.textContent = item.text;
      menuItem.dataset.index = index;

      // Adiciona eventos
      menuItem.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleSubmenu(index);
      });

      menuItem.addEventListener('mouseenter', () => {
        if (this.activeSubmenu !== null && this.activeSubmenu !== index) {
          this.toggleSubmenu(this.activeSubmenu);
          this.toggleSubmenu(index);
        }
      });

      this.menuBar.appendChild(menuItem);
    });

    // Fecha submenus quando clicar fora
    document.addEventListener('click', () => {
      if (this.activeSubmenu !== null) {
        this.toggleSubmenu(this.activeSubmenu);
      }
    });
  }

  toggleSubmenu(index) {
    // Remove submenu existente se houver
    const existingSubmenu = document.querySelector('.submenu');
    if (existingSubmenu) {
      existingSubmenu.remove();
    }

    // Se estamos fechando o submenu ativo
    if (this.activeSubmenu === index) {
      this.activeSubmenu = null;
      return;
    }

    // Cria novo submenu
    const menuItem = this.menuItems[index];
    const menuItemElement = document.querySelector(
      `.menu-item[data-index="${index}"]`
    );
    const rect = menuItemElement.getBoundingClientRect();

    const submenu = document.createElement('div');
    submenu.className = 'submenu';
    submenu.style.position = 'absolute';
    submenu.style.top = `${rect.bottom}px`;
    submenu.style.left = `${rect.left}px`;
    submenu.style.zIndex = '1000';

    // Adiciona itens do submenu
    menuItem.submenu.forEach((subItem) => {
      const subItemElement = document.createElement('div');
      subItemElement.className = 'submenu-item';
      subItemElement.textContent = subItem.text;
      subItemElement.addEventListener('click', (e) => {
        e.stopPropagation();
        subItem.action();
        this.toggleSubmenu(index); // Fecha o submenu após clicar
      });
      submenu.appendChild(subItemElement);
    });

    document.body.appendChild(submenu);
    this.activeSubmenu = index;
  }

  // Métodos para o menu File
  showNewProjects() {
    window.terminalInstance.addTerminalCommand(
      'cat future_projects.md',
      '# Projetos Futuros\n\n- Aplicação React com TypeScript\n- API RESTful com Node.js\n- Integração com IA para análise de dados'
    );
  }

  openResume() {
    window.openTab('resume', 'resume.pdf');
    window.terminalInstance.addTerminalCommand(
      'open resume.pdf',
      'Abrindo currículo completo...'
    );
  }

  downloadCV() {
  try {
    const cvPath = "/src/programa/curriculo/curriculo.html"; 
    window.open(cvPath, '_blank');
    
    window.terminalInstance.addTerminalCommand(
      'open curriculo.html',
      'Abrindo currículo em nova aba...\nCurrículo aberto com sucesso!'
    );
  } catch (error) {
    console.error('Erro ao abrir o currículo:', error);
    window.terminalInstance.addTerminalCommand(
      'open curriculo.html',
      'Erro ao abrir o currículo. Por favor, tente novamente mais tarde.'
    );
  }
}

  sharePortfolio() {
    const link = 'google.com';

    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log('Link copiado para a área de transferência!');
      })
      .catch((err) => {
        console.error('Erro ao copiar link:', err);
      });

    // Comando do terminal
    window.terminalInstance.addTerminalCommand(
      'share --platform=all',
      'Compartilhar portfólio:\n- de CTRL + V em outra aba'
    );
  }

  exitPortfolio() {
    window.terminalInstance.addTerminalCommand(
      'exit',
      'Obrigado por visitar meu portfólio!\nFechando sessão...\n\nPara realmente sair, feche esta aba do navegador 😊'
    );
  }

  // Métodos para o menu Edit
  copyContactInfo() {
    const link =
      'Email: j.murilo.mobilegmail.com - Telefone: (21) 98540-5690 - LinkedIn: linkedin.com/in/joaomurilopoo';
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log('Link copiado para a área de transferência!');
      })
      .catch((err) => {
        console.error('Erro ao copiar link:', err);
      });

    window.terminalInstance.addTerminalCommand(
      'copy contact.info',
      'Informações de contato copiadas para a área de transferência:\n- Email: j.murilo.mobilegmail.com\n- Telefone: (21) 98540-5690\n- LinkedIn: linkedin.com/in/joaomurilopoo'
    );
  }

  findSkills() {
    window.terminalInstance.addTerminalCommand(
      'find --skills',
      'Buscando habilidades...\nEncontrado:\n- ReactJS (Avançado)\n- TypeScript (Intermediário)\n- Node.js (Intermediário)\n- HTML/CSS (Avançado)\n- JavaScript (Avançado)'
    );
  }

  replaceTechnology() {
    window.terminalInstance.addTerminalCommand(
      'replace --old="jQuery" --new="React"',
      'Evolução tecnológica:\n- jQuery → React\n- JavaScript → TypeScript\n- CSS → Styled Components\n- REST → GraphQL'
    );
  }

  formatCode() {
    window.terminalInstance.addTerminalCommand(
      'format --style=clean',
      'Formatando código...\nAplicando boas práticas:\n- ESLint configurado com regras AirBnB\n- Prettier para formatação consistente\n- Comentários significativos\n- Nomes de variáveis descritivos'
    );
  }

  // Métodos para o menu View
  showCommandPalette() {
    window.terminalInstance.addTerminalCommand(
      'show command-palette',
      'Comandos disponíveis:\n- openProject: Abre um projeto específico\n- showSkills: Lista todas as habilidades\n- contactMe: Exibe informações de contato\n- downloadCV: Baixa currículo em PDF\n- showExperience: Mostra experiência profissional'
    );
  }

  toggleExplorer() {
    window.toggleSidebar();
    window.terminalInstance.addTerminalCommand(
      'toggle explorer',
      'Alternando visibilidade do explorador de arquivos...'
    );
  }

  showAppearance() {
    window.terminalInstance.addTerminalCommand(
      'set appearance',
      'Opções de aparência:\n- Tema: Dark (Padrão) / Light\n- Fonte: Fira Code\n- Tamanho da fonte: 14px\n- Ícones: VS Code\n- Animações: Ativadas'
    );
  }

  // Métodos para o menu Run
  startDebugging() {
    window.terminalInstance.addTerminalCommand(
      'debug start',
      'Iniciando depuração...\n\nCaso de estudo: Otimização de Performance\n\n1. Problema identificado: Renderizações desnecessárias em componente React\n2. Uso de React DevTools para profiling\n3. Implementação de useMemo e useCallback\n4. Resultado: Redução de 60% no tempo de renderização'
    );
  }

  runWithoutDebugging() {
    window.terminalInstance.addTerminalCommand(
      'run',
      'Executando demonstração rápida...\n\nProjeto: Portfolio VSCode\nTecnologias: HTML, CSS, JavaScript\nRecursos: Interface interativa, terminal simulado, sistema de abas\n\nDemo disponível em: https://joaomurilo.dev'
    );
  }

  runTests() {
    window.terminalInstance.addTerminalCommand(
      'npm test',
      'Executando testes...\n\nTEST SUITES: 4 passed, 4 total\nTESTS: 24 passed, 24 total\nSNAPSHOTS: 0 total\nTIME: 3.426s\n\nRan all test suites.\n✨ Passed!'
    );
  }

  buildProject() {
    window.terminalInstance.addTerminalCommand(
      'npm run build',
      'Construindo projeto...\n\nCreating an optimized production build...\nCompiled successfully.\n\nFile sizes after gzip:\n\n124.65 KB  build/static/js/main.js\n22.84 KB   build/static/css/main.css\n\nThe build folder is ready to be deployed.'
    );
  }

  // Métodos para o menu Terminal
  runActiveFile() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      const fileName = activeTab.querySelector('.tab-name').textContent;
      window.terminalInstance.addTerminalCommand(
        `node ${fileName}`,
        `Executando ${fileName}...\n\nArquivo executado com sucesso!`
      );
    } else {
      window.terminalInstance.addTerminalCommand(
        'run active-file',
        'Erro: Nenhum arquivo ativo para executar.'
      );
    }
  }

  clearTerminal() {
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
      // Mantém apenas a última linha com o prompt
      terminalContent.innerHTML = '';
      const newLine = document.createElement('div');
      newLine.className = 'terminal-line';
      newLine.innerHTML = `<span class="terminal-prompt">joaomurilo@portfolio:~$</span><span class="terminal-cursor">|</span>`;
      terminalContent.appendChild(newLine);
    }
  }

  // Métodos para o menu Help
  showWelcome() {
    window.openTab('home', 'README.md');
    window.terminalInstance.addTerminalCommand(
      'show welcome',
      'Bem-vindo ao meu portfólio interativo!\n\nEste projeto simula a interface do VSCode para apresentar minhas habilidades e experiências de forma criativa e interativa.\n\nNavegue pelos arquivos na barra lateral ou use os menus para explorar.'
    );
  }

  getStarted() {
    window.terminalInstance.addTerminalCommand(
      'help --get-started',
      'Como navegar pelo portfólio:\n\n1. Use o explorador de arquivos à esquerda para abrir diferentes seções\n2. Interaja com o terminal para ver comandos e informações\n3. Use os menus superiores para acessar funcionalidades adicionais\n4. Atalhos de teclado disponíveis:\n   - Ctrl+B: Alternar barra lateral\n   - Ctrl+J: Alternar terminal\n   - Ctrl+I: Mostrar informações de contato'
    );
  }

  showAboutMe() {
    window.openTab('about', 'about.html');
    window.terminalInstance.addTerminalCommand(
      'cat about.md',
      'Abrindo informações sobre mim...'
    );
  }

  showContact() {
    window.open('/src/programa/contact/contact.html', '_blank');

    window.showContactInfo();
  }

  showSocialMedia() {
    window.terminalInstance.addTerminalCommand(
      'show social-media',
      'Redes sociais e presença online:\n\n- LinkedIn: linkedin.com/in/joaomurilopoo\n- GitHub: github.com/JoaoMuriloPO\n- Email: j.murilo.mobilegmail.com\n- Portfolio: joaomurilo.dev'
    );
  }

  // Handlers principais dos menus - mantidos para compatibilidade
  handleFileMenu() {}
  handleEditMenu() {}
  handleViewMenu() {}
  handleGoMenu() {}
  handleRunMenu() {}
  handleTerminalMenu() {}
  handleHelpMenu() {}
}

// Adicione este CSS ao seu arquivo style.css
const menuBarStyles = `
.submenu {
  background-color: #252526;
  border: 1px solid #3e3e42;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  min-width: 200px;
  z-index: 1000;
}

.submenu-item {
  padding: 8px 12px;
  color: #cccccc;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
}

.submenu-item:hover {
  background-color: #094771;
  color: #ffffff;
}
`;

// Adiciona os estilos ao documento
function addMenuBarStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = menuBarStyles;
  document.head.appendChild(styleElement);
}

// Exporta a classe MenuBar
export default MenuBar;

// Adiciona os estilos quando o módulo é importado
addMenuBarStyles();
