// src/programa/js/utils/DOMUtils.js

// Função para adicionar efeitos visuais
export function addVisualEffects() {
  // Efeito de typing no cursor do terminal
  const cursor = document.querySelector(".terminal-cursor");
  if (cursor) {
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 500);
  }

  // Efeito de hover nos file items
  document.querySelectorAll(".file-item").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });
  });
}

// Função para lidar com redimensionamento da janela
export function handleWindowResize() {
  window.addEventListener("resize", () => {
    if (window.terminalInstance) {
      window.terminalInstance.updateMainContainerHeight();
    }
  });
}

// Função para selecionar elementos com segurança
export function safeQuerySelector(selector, parent = document) {
  try {
    return parent.querySelector(selector);
  } catch (error) {
    console.error(`Error selecting ${selector}:`, error);
    return null;
  }
}

// Função para criar elementos com atributos e conteúdo
export function createElement(tag, attributes = {}, content = "") {
  try {
    const element = document.createElement(tag);

    // Adiciona atributos
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    // Adiciona conteúdo de texto se fornecido
    if (content && typeof content === "string") {
      element.textContent = content;
    }

    return element;
  } catch (error) {
    console.error(`Error creating ${tag} element:`, error);
    return null;
  }
}

// Função para adicionar múltiplos event listeners
export function addEventListeners(element, events = {}) {
  if (!element) return;

  Object.entries(events).forEach(([event, handler]) => {
    element.addEventListener(event, handler);
  });
}

// Função para remover múltiplos event listeners
export function removeEventListeners(element, events = {}) {
  if (!element) return;

  Object.entries(events).forEach(([event, handler]) => {
    element.removeEventListener(event, handler);
  });
}
