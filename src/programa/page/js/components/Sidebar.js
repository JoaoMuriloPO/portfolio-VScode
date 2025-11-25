// src/programa/js/components/Sidebar.js

class Sidebar {
  constructor() {
    this.isSidebarHidden = false;
    this.init();
  }

  init() {
    // Inicializa a sidebar
    this.sidebar = document.querySelector(".sidebar");
    this.contentArea = document.querySelector(".content-area");

    // Adiciona evento de clique ao botão dos três pontos (⋯) para alternar sidebar
    const sidebarToggle = document.querySelector(".action-icon");
    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", this.toggleSidebar.bind(this));
      sidebarToggle.style.cursor = "pointer";
      sidebarToggle.title = "Alternar barra lateral (Ctrl+B)";
    }
  }

  // Função para alternar pastas no explorer
  toggleFolder(folderId) {
    const folder = document.getElementById(folderId);
    const folderHeader = folder.previousElementSibling;

    if (folder.style.display === "none" || folder.style.display === "") {
      folder.style.display = "block";
      folderHeader.querySelector(".folder-icon").textContent = "📂";
    } else {
      folder.style.display = "none";
      folderHeader.querySelector(".folder-icon").textContent = "📁";
    }
  }

  // Função para mostrar a sidebar (sem alternar)
  showSidebar() {
    if (this.isSidebarHidden) {
      // Mostrar sidebar
      this.sidebar.style.display = "flex";
      this.sidebar.style.width = "300px";
      this.contentArea.style.marginLeft = "0";
      this.isSidebarHidden = false;

      // Adiciona animação suave
      this.sidebar.style.animation = "slideInLeft 0.3s ease-out";
    }
  }

  // Função para alternar a sidebar
  toggleSidebar() {
    if (this.isSidebarHidden) {
      // Mostrar sidebar
      this.sidebar.style.display = "flex";
      this.sidebar.style.width = "300px";
      this.contentArea.style.marginLeft = "0";
      this.isSidebarHidden = false;

      // Adiciona animação suave
      this.sidebar.style.animation = "slideInLeft 0.3s ease-out";
    } else {
      // Esconder sidebar
      this.sidebar.style.animation = "slideOutLeft 0.3s ease-out";

      setTimeout(() => {
        this.sidebar.style.display = "none";
        this.sidebar.style.width = "0";
        this.contentArea.style.marginLeft = "0";
        this.isSidebarHidden = true;
      }, 300);
    }
  }
}

// Exporta a classe Sidebar
export default Sidebar;

// Exporta funções específicas para uso global
export function toggleFolder(folderId) {
  const sidebarInstance = window.sidebarInstance;
  if (sidebarInstance) {
    sidebarInstance.toggleFolder(folderId);
  }
}

export function showSidebar() {
  const sidebarInstance = window.sidebarInstance;
  if (sidebarInstance) {
    sidebarInstance.showSidebar();
  }
}

export function toggleSidebar() {
  const sidebarInstance = window.sidebarInstance;
  if (sidebarInstance) {
    sidebarInstance.toggleSidebar();
  }
}
