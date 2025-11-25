// src/programa/js/components/Terminal.js

class Terminal {
  constructor() {
    this.isTerminalMinimized = false;
    this.terminalHeight = 200; // Altura padrão do terminal
    this.isResizing = false;

    this.init();
  }

  init() {
    this.terminal = document.getElementById("terminal");
    this.resizeBar = document.getElementById("terminalResizeBar");

    // Inicializa o terminal com altura padrão
    this.terminal.style.height = `${this.terminalHeight}px`;
    this.updateMainContainerHeight();

    // Inicializa o redimensionamento do terminal
    this.initTerminalResize();

    // Adiciona comandos iniciais após um delay
    this.addInitialCommands();

    // Inicia simulação de comandos
    this.simulateDevCommands();
  }

  minimize() {
    if (this.isTerminalMinimized) {
      // Restaurar terminal
      this.terminal.style.height = `${this.terminalHeight}px`;
      this.terminal.classList.remove("minimized");
      this.resizeBar.style.display = "block";
      this.isTerminalMinimized = false;
    } else {
      // Minimizar terminal
      this.terminal.style.height = "35px"; // Apenas o header
      this.terminal.classList.add("minimized");
      this.resizeBar.style.display = "none";
      this.isTerminalMinimized = true;
    }
    this.updateMainContainerHeight();
  }

  maximize() {
    if (this.terminal.classList.contains("maximized")) {
      // Restaurar tamanho normal
      this.terminal.style.height = `${this.terminalHeight}px`;
      this.terminal.classList.remove("maximized");
      this.resizeBar.style.display = "block";
    } else {
      // Maximizar terminal
      this.terminalHeight = parseInt(this.terminal.style.height) || 200; // Salva altura atual
      this.terminal.style.height = "60vh";
      this.terminal.classList.add("maximized");
      this.resizeBar.style.display = "block";
    }
    this.updateMainContainerHeight();
  }

  close() {
    this.terminal.style.display = "none";
    this.resizeBar.style.display = "none";
    this.updateMainContainerHeight();
  }

  show() {
    this.terminal.style.display = "flex";
    this.resizeBar.style.display = "block";
    this.terminal.style.height = `${this.terminalHeight}px`;
    this.updateMainContainerHeight();
  }

  toggle() {
    if (this.terminal.style.display === "none") {
      // Se o terminal estiver fechado, abre e define para metade da tela
      this.show();
      const halfScreenHeight = Math.floor(window.innerHeight * 0.5);
      this.terminal.style.height = `${halfScreenHeight}px`;
      this.terminalHeight = halfScreenHeight;
      this.terminal.classList.remove("minimized");
      this.terminal.classList.remove("maximized");
    } else if (this.terminal.classList.contains("minimized")) {
      // Se estiver minimizado, restaura para metade da tela
      const halfScreenHeight = Math.floor(window.innerHeight * 0.5);
      this.terminal.style.height = `${halfScreenHeight}px`;
      this.terminalHeight = halfScreenHeight;
      this.terminal.classList.remove("minimized");
      this.terminal.classList.remove("maximized");
    } else {
      // Se estiver aberto, fecha
      this.close();
    }
    this.updateMainContainerHeight();
  }

  updateMainContainerHeight() {
    const mainContainer = document.querySelector(".main-container");

    let terminalActualHeight = 0;
    let resizeBarHeight = 0;

    if (this.terminal.style.display !== "none") {
      terminalActualHeight =
        parseInt(this.terminal.style.height) || this.terminalHeight;
      if (this.resizeBar.style.display !== "none") {
        resizeBarHeight = 4; // Altura da barra de redimensionamento
      }
    }

    const newHeight = `calc(100vh - 65px - ${terminalActualHeight}px - ${resizeBarHeight}px - 22px)`;
    mainContainer.style.height = newHeight;
  }

  initTerminalResize() {
    this.resizeBar.addEventListener("mousedown", (e) => {
      this.isResizing = true;
      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";

      const startY = e.clientY;
      const startHeight =
        parseInt(this.terminal.style.height) || this.terminalHeight;

      const handleMouseMove = (e) => {
        if (!this.isResizing) return;

        const deltaY = startY - e.clientY;
        const newHeight = Math.max(
          35,
          Math.min(window.innerHeight * 0.8, startHeight + deltaY)
        );

        this.terminal.style.height = `${newHeight}px`;
        this.terminalHeight = newHeight;
        this.updateMainContainerHeight();
      };

      const handleMouseUp = () => {
        this.isResizing = false;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    // Cursor hover effect
    this.resizeBar.addEventListener("mouseenter", () => {
      if (!this.isResizing) {
        this.resizeBar.style.cursor = "ns-resize";
      }
    });
  }

  typeInTerminal(text, delay = 50) {
    const terminalContent = document.querySelector(".terminal-content");
    const newLine = document.createElement("div");
    newLine.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.className = "terminal-prompt";
    prompt.textContent = "joaomurilo@portfolio:~$ ";

    const command = document.createElement("span");
    command.className = "terminal-command";

    newLine.appendChild(prompt);
    newLine.appendChild(command);
    terminalContent.appendChild(newLine);

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        command.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, delay);
      }
    };

    typeWriter();
  }

  addTerminalCommand(command, output) {
    const terminalContent = document.querySelector(".terminal-content");

    // Linha do comando
    const commandLine = document.createElement("div");
    commandLine.className = "terminal-line";
    commandLine.innerHTML = `
      <span class="terminal-prompt">joaomurilo@portfolio:~$</span>
      <span class="terminal-command">${command}</span>
    `;

    // Linha da saída
    const outputLine = document.createElement("div");
    outputLine.className = "terminal-line";
    outputLine.innerHTML = `<span class="terminal-output">${output}</span>`;

    terminalContent.appendChild(commandLine);
    terminalContent.appendChild(outputLine);

    // Scroll para o final
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }

  simulateDevCommands() {
    const commands = [
      {
        cmd: "npm run dev",
        output: "✓ Development server started on port 3000",
      },
      {
        cmd: "git status",
        output: "On branch main\nYour branch is up to date with 'origin/main'.",
      },
      { cmd: "npm test", output: "✓ All tests passed successfully!" },
      { cmd: "npm run build", output: "✓ Build completed successfully!" },
      { cmd: "docker ps", output: "CONTAINER ID   IMAGE     COMMAND   STATUS" },
      { cmd: "yarn install", output: "✓ Dependencies installed successfully!" },
    ];

    let commandIndex = 0;

    const executeCommand = () => {
      if (commandIndex < commands.length) {
        const { cmd, output } = commands[commandIndex];
        this.addTerminalCommand(cmd, output);
        commandIndex++;

        // Próximo comando em 8-12 segundos
        setTimeout(executeCommand, Math.random() * 4000 + 8000);
      } else {
        // Reinicia o ciclo após 20 segundos
        setTimeout(() => {
          commandIndex = 0;
          executeCommand();
        }, 20000);
      }
    };

    // Inicia após 10 segundos
    setTimeout(executeCommand, 10000);
  }

  addInitialCommands() {
    setTimeout(() => {
      this.addTerminalCommand(
        "whoami",
        "João Murilo Pereira de Oliveira - Front-End Developer"
      );
    }, 2000);

    setTimeout(() => {
      this.addTerminalCommand("pwd", "/home/joaomurilo/portfolio");
    }, 4000);

    setTimeout(() => {
      this.addTerminalCommand(
        "ls -la",
        "total 12\ndrwxr-xr-x  portfolio/\n-rw-r--r--  README.md\n-rw-r--r--  about.html\n-rw-r--r--  skills.js\n-rw-r--r--  projects.json\n-rw-r--r--  experience.tsx\n-rw-r--r--  contact.css"
      );
    }, 6000);

    setTimeout(() => {
      this.addTerminalCommand("node --version", "v18.17.0");
    }, 8000);
  }

  showContactInfo() {
    const contactCommands = [
      { cmd: "cat contact.info", output: "📧 j.murilo.mobilegmail.com" },
      { cmd: "", output: "📞 (21) 98540-5690" },
      { cmd: "", output: "💼 linkedin.com/in/joaomurilopoo" },
      { cmd: "", output: "🐙 github.com/JoaoMuriloPO" },
      { cmd: "", output: "📍 Rio de Janeiro - RJ" },
    ];

    contactCommands.forEach((item, index) => {
      setTimeout(() => {
        if (item.cmd) {
          this.addTerminalCommand(item.cmd, item.output);
        } else {
          const terminalContent = document.querySelector(".terminal-content");
          const outputLine = document.createElement("div");
          outputLine.className = "terminal-line";
          outputLine.innerHTML = `<span class="terminal-output">${item.output}</span>`;
          terminalContent.appendChild(outputLine);
        }
      }, index * 1000);
    });
  }
}

// Exporta a classe Terminal
export default Terminal;

// Exporta funções específicas para uso global
export function toggleTerminal() {
  const terminalInstance = window.terminalInstance;
  if (terminalInstance) {
    terminalInstance.toggle();
  }
}

export function minimizeTerminal() {
  const terminalInstance = window.terminalInstance;
  if (terminalInstance) {
    terminalInstance.minimize();
  }
}

export function maximizeTerminal() {
  const terminalInstance = window.terminalInstance;
  if (terminalInstance) {
    terminalInstance.maximize();
  }
}

export function closeTerminal() {
  const terminalInstance = window.terminalInstance;
  if (terminalInstance) {
    terminalInstance.close();
  }
}

export function showContactInfo() {
  const terminalInstance = window.terminalInstance;
  if (terminalInstance) {
    terminalInstance.showContactInfo();
  }
}
