// src/programa/js/main.js

// Importa os componentes
import MenuBar from "./components/MenuBar.js";
import Sidebar, {
  toggleFolder,
  showSidebar,
  toggleSidebar,
} from "./components/Sidebar.js";
import TabSystem, {
  openTab,
  closeTab,
  activateTab,
} from "./components/TabSystem.js";
import Terminal, {
  toggleTerminal,
  minimizeTerminal,
  maximizeTerminal,
  closeTerminal,
  showContactInfo,
} from "./components/Terminal.js";
import StatusBar from "./components/StatusBar.js";
import { initKeyboardShortcuts } from "./utils/KeyboardShortcuts.js";
import { addVisualEffects, handleWindowResize } from "./utils/DOMUtils.js";

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa os componentes
  const menuBar = new MenuBar();
  const sidebar = new Sidebar();
  const tabSystem = new TabSystem();
  const terminal = new Terminal();
  const statusBar = new StatusBar();

  // Armazena instâncias em variáveis globais para acesso de outros scripts
  window.menuBarInstance = menuBar;
  window.sidebarInstance = sidebar;
  window.tabSystemInstance = tabSystem;
  window.terminalInstance = terminal;
  window.statusBarInstance = statusBar;

  // Expõe funções globais para uso em HTML
  window.toggleTerminal = toggleTerminal;
  window.minimizeTerminal = minimizeTerminal;
  window.maximizeTerminal = maximizeTerminal;
  window.closeTerminal = closeTerminal;
  window.showContactInfo = showContactInfo;
  window.toggleFolder = toggleFolder;
  window.openTab = openTab;
  window.closeTab = closeTab;
  window.activateTab = activateTab;
  window.showSidebar = showSidebar;
  window.toggleSidebar = toggleSidebar;

  // Inicializa atalhos de teclado
  initKeyboardShortcuts();

  // Abre a pasta portfolio por padrão
  toggleFolder("portfolio");

  // Ativa a tab home por padrão
  activateTab("home");

  // Adiciona efeitos visuais
  setTimeout(() => {
    addVisualEffects();
  }, 1000);

  // Configura o redimensionamento da janela
  handleWindowResize();
});
