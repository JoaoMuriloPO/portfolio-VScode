// src/programa/js/utils/KeyboardShortcuts.js

// Função para inicializar os atalhos de teclado
export function initKeyboardShortcuts() {
  document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + W para fechar tab ativa
    if ((e.ctrlKey || e.metaKey) && e.key === "w") {
      e.preventDefault();
      const activeTab = document.querySelector(".tab.active");
      if (activeTab) {
        const contentId = activeTab.id.replace("tab-", "");
        window.closeTab(contentId);
      }
    }

    // Ctrl/Cmd + B para alternar sidebar (como no VS Code)
    if ((e.ctrlKey || e.metaKey) && e.key === "b") {
      e.preventDefault();
      window.toggleSidebar();
    }

    // Ctrl/Cmd + T para focar no terminal
    if ((e.ctrlKey || e.metaKey) && e.key === "t") {
      e.preventDefault();
      const terminal = document.getElementById("terminal");
      if (terminal.style.display === "none") {
        window.showTerminal();
      }
      document.querySelector(".terminal-content").focus();
    }

    // Ctrl/Cmd + ` para alternar terminal
    if ((e.ctrlKey || e.metaKey) && e.key === "`") {
      e.preventDefault();
      window.toggleTerminal();
    }

    // Ctrl/Cmd + I para mostrar informações de contato
    if ((e.ctrlKey || e.metaKey) && e.key === "i") {
      e.preventDefault();
      window.showContactInfo();
    }

    // Ctrl/Cmd + J para alternar terminal (como no VS Code)
    if ((e.ctrlKey || e.metaKey) && e.key === "j") {
      e.preventDefault();
      window.toggleTerminal();
    }
  });

  // Easter egg - comando secreto
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
      window.terminalInstance.addTerminalCommand(
        'echo "Desenvolvido com ❤️ por João Murilo"',
        "🎉 Obrigado por visitar meu portfólio!\n💼 Sempre aberto a novas oportunidades!\n🚀 Vamos construir algo incrível juntos!"
      );
    }
  });
}
