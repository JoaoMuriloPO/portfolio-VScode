# Portfólio Pessoal - VS Code Interface

## 📋 Sobre o Projeto
Portfólio pessoal interativo com interface inspirada no Visual Studio Code, desenvolvido com HTML, CSS e JavaScript puro.

## 🚀 Funcionalidades
- 📁 Sistema de abas e navegação por arquivos
- 🎯 Menu bar funcional com múltiplas opções
- 📋 Sidebar com explorador de arquivos
- 📊 Barra de status com informações dinâmicas
- 📱 Design responsivo
- 📋 Função de copiar informações de contato
- 🎨 Interface similar ao VS Code

## 🛠️ Tecnologias Utilizadas
- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript ES6+** - Lógica e interatividade
- **Classes ES6** - Organização modular do código

## 📁 Estrutura do Projeto
src/
├── assets/
│   ├── perfil.jpeg
│   └── resume.pdf
│
├── programa/
│   ├── contact/
│   │   ├── contact.html
│   │   ├── script.js        
│   │   └── style.css
│   │
│   ├── curriculo/
│   │   └── curriculo.html
│   │
│   └── page/                       # Página principal / área “do programa”
│       ├── index.html
│       ├── style.css
│       └── js/
│           ├── main.js
│           ├── components/
│           │   ├── MenuBar.js
│           │   ├── Sidebar.js
│           │   ├── StatusBar.js
│           │   ├── TabSystem.js
│           │   └── Terminal.js
│           │
│           └── utils/
│               ├── DOMUtils.js
│               └── KeyboardShortcuts.js
│
└── README.md


## 🔧 Implementação

### Componentes Principais
- **MenuBar.js** - Menu superior com opções de File, Edit, View, Run, Terminal, Help
- **Sidebar.js** - Explorador de arquivos lateral com pastas expansíveis
- **TabSystem.js** - Sistema de abas para navegação entre seções
- **StatusBar.js** - Barra inferior com relógio e status de desenvolvimento

### Funcionalidades Específicas
- **Clipboard API** - Copiar informações de contato
- **DOM Manipulation** - Criação dinâmica de elementos
- **Event Handling** - Interações com menus e navegação
- **Modular Architecture** - Código organizado em classes

## 💡 Principais Conceitos Aplicados
- Programação Orientada a Objetos (Classes ES6)
- Manipulação avançada do DOM
- Event Listeners e handling
- Modularização de código
- Interface responsiva
- Clipboard API

## 🎯 Como Navegar
1. Use o menu superior para acessar diferentes seções
2. Clique nos arquivos da sidebar para abrir conteúdo
3. Navegue pelas abas abertas
4. Use as funções de copiar informações de contato
5. Explore as diferentes seções do portfólio

## 📱 Compatibilidade
- Navegadores modernos com suporte a ES6+
- Interface responsiva para desktop e mobile
- Suporte à Clipboard API
- Design adaptativo similar ao VS Code