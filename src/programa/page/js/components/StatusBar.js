// src/programa/js/components/StatusBar.js

class StatusBar {
  constructor() {
    this.init();
  }

  init() {
    // Inicializa o relógio
    this.updateClock();

    // Atualiza o relógio a cada minuto
    setInterval(this.updateClock.bind(this), 60000);

    // Inicia atualização de status de desenvolvimento
    setTimeout(this.updateDevStatus.bind(this), 5000);
  }

  // Função para atualizar o relógio na status bar
  updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Adiciona o relógio na status bar se não existir
    const statusRight = document.querySelector(".status-right");
    let clockElement = document.getElementById("status-clock");

    if (!clockElement) {
      clockElement = document.createElement("span");
      clockElement.id = "status-clock";
      clockElement.className = "status-item";
      statusRight.appendChild(clockElement);
    }

    clockElement.textContent = timeString;
  }

  // Função para simular status de desenvolvimento
  updateDevStatus() {
    const statusLeft = document.querySelector(".status-left");
    const statuses = [
      "🌿 main ✓ CI&T",
      "🚀 deploy ready",
      "⚡ ReactJS + TypeScript",
      "🔧 Node.js running",
      "📦 npm packages updated",
    ];

    let statusIndex = 0;

    setInterval(() => {
      const statusItems = statusLeft.querySelectorAll(".status-item");
      if (statusItems.length > 1) {
        statusItems[0].textContent = statuses[statusIndex];
        statusIndex = (statusIndex + 1) % statuses.length;
      }
    }, 15000);
  }
}

// Exporta a classe StatusBar
export default StatusBar;
