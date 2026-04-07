# 🚀 TechForAll — Site de Mentoria Gratuita em Tecnologia

Plataforma de mentoria voluntária em tecnologia desenvolvida com HTML, CSS e JavaScript.

---

## 🌐 Sobre o Projeto

O **Tech for All** é um site criado como projeto acadêmico da disciplina de **Programação Front-End**, com o objetivo de conectar mentores da área de tecnologia a pessoas que desejam aprender programação, informática e novas tecnologias de forma gratuita.

O projeto busca incentivar o aprendizado acessível, promovendo a troca de conhecimento entre profissionais e iniciantes — sem custo, sem barreira.

| | |
|---|---|
| 📍 **Instituição** | Unicesumar |
| 👨‍🏫 **Professor** | José Carlos Domingues Flores |
| 📚 **Disciplina** | Programação Front-End |
| 🎓 **Curso** | Análise e Desenvolvimento de Sistemas (ADS) |
| 📅 **Período** | 3º Período — 2026 |

---

## 🔗 Links

- 📁 **Repositório:** [github.com/seuusuario/techforall](https://github.com/seuusuario/techforall)
- 🌍 **GitHub Pages (site ao vivo):** [seuusuario.github.io/techforall](https://seuusuario.github.io/techforall)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso no Projeto |
|---|---|
| **HTML5** | Estrutura semântica das páginas (`header`, `main`, `section`, `article`, `footer`) |
| **CSS3** | Estilização, layout com Flexbox e Grid, animações, responsividade com Media Queries |
| **JavaScript (ES6+)** | Interatividade, validações, manipulação do DOM, animações |

> ⚠️ Projeto desenvolvido com **JavaScript**, sem uso de frameworks como React, Angular ou Vue.js.

---

## ✨ Funcionalidades Implementadas

O projeto implementa **7 funcionalidades interativas em JavaScript**, superando o requisito mínimo de 3:

### 1. 🍔 Menu Hambúrguer (Mobile Off-Canvas)
Menu de navegação responsivo que desliza da direita em telas mobile. As 3 linhas do ícone se transformam em X ao abrir. Fecha ao clicar fora, em um link ou pressionar `ESC`.

### 2. 👁️ Scroll Reveal (Animação ao Rolar)
Elementos entram na tela com animação suave (fade + slide) ao serem revelados pelo scroll. Utiliza `getBoundingClientRect()` para detectar a posição dos elementos na viewport. Delays escalonados criam efeito de cascata visual.

### 3. 🪟 Modal de Sucesso Dinâmico
Modal criado e inserido dinamicamente no DOM via JavaScript após envio dos formulários. Exibe ícone, título e mensagem personalizada com o nome do usuário. Fecha ao clicar no botão ou fora da caixa. Animação de entrada com efeito *spring*.

### 4. ✅ Validação — Formulário de Aluno
Valida em tempo real antes do envio: nome completo (mín. 3 caracteres), email no formato correto, curso e nível de conhecimento selecionados. Campos inválidos recebem borda vermelha e mensagem de erro abaixo.

### 5. ✅ Validação — Formulário de Mentor
Valida: nome, email, WhatsApp com DDD (mín. 10 dígitos), experiência profissional (mín. 100 caracteres) e ao menos 1 área de ensino selecionada. Inclui **contador de caracteres em tempo real** na textarea.

### 6. 🔍 Filtro de Mentores por Área
Filtra os cards de mentores por área de atuação (Front-end, Back-end, Design) com animação de fade ao mostrar/ocultar. Utiliza atributos `data-area` nos cards e `data-filtro` nos botões.

### 7. 🔢 Contador Animado (Hero Stats)
Números das estatísticas do hero animam de 0 até o valor final ao entrar na viewport. Usa `IntersectionObserver` para detectar visibilidade e `requestAnimationFrame` com easing *easeOut cúbico* para animação suave.

---

## 📂 Estrutura do Projeto

TECH_FOR_ALL/  
├── cadastro/  
│   ├── quero-ser-aluno.html  
│   └── quero-ser-mentor.html  
├── css/  
│   └── style.css  
├── Mentores/  
│   ├── gabriel.html  
│   ├── kaio.html  
│   ├── matheus.html  
│   ├── mentor.html  
│   ├── stefany.html  
│   └── vanessa.html  
├── pages/  
│   ├── imagens/  
│   │   ├── img_mentores/  
│   │   │   ├── gabriel.jpg  
│   │   │   ├── kaio.jpeg  
│   │   │   ├── matheus.jpeg  
│   │   │   └── vanessa.png  
│   │   ├── bancodedados.png  
│   │   ├── cursopy.png  
│   │   ├── devweb.png  
│   │   ├── inteligenciaartificial.png  
│   │   ├── logicadeprog.png  
│   │   └── uiuxdesign.png  
│   └── curso.html  
├── script/  
│   └── script.js  
└── index.html  
---

---
## 👨‍💻 Integrantes do Grupo

| Nome | RA | Área de contribuição (*ilustrativa*)|
|---|---|---|
| Gabriel Saras | 25058772-2 | Desenvolvimento Front-end, HTML/CSS |
| Vanessa C. Souza | 25356515-2 | Back-end concept, Formulários |
| Stefany M. Moreira | 25270134-2 | UI/UX, Design das páginas |
| Kaio Eduardo | 25127228-2 | Design, Assets visuais |
| Matheus R. Rocha | 25161131-2 | Design Gráfico, Identidade visual |

---

## 🎯 Requisitos Técnicos Atendidos

### HTML ✅
- Estrutura semântica com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Formulários com `<form>`, `<input>`, `<select>`, `<textarea>`, `<button>`
- Atributos de acessibilidade: `aria-label`, `aria-expanded`, `aria-pressed`, `role`, `alt` em imagens
- Código indentado e comentado em todos os arquivos

### CSS ✅
- Variáveis CSS (`:root`) para cores, sombras e transições
- Layout com **Flexbox** e **CSS Grid**
- **Media Queries** para 3 breakpoints: 900px, 768px e 480px
- Pseudo-elementos (`::before`, `::after`) e pseudo-classes (`:hover`, `:focus`, `:nth-child`)
- Animações com `@keyframes` e `transition`
- Arquivo único `style.css`

### JavaScript ✅
- 7 funcionalidades interativas com **JS puro** (sem frameworks)
- Boas práticas: `const`/`let`, funções nomeadas com JSDoc, optional chaining (`?.`)
- Manipulação do DOM: criação de elementos, adição/remoção de classes
- Eventos: `click`, `submit`, `scroll`, `keydown`, `input`
- APIs modernas: `IntersectionObserver`, `requestAnimationFrame`, `getBoundingClientRect`
- Arquivo único `script.js`

### Responsividade ✅
- Layout adapta para desktop, tablet e mobile
- Menu off-canvas no mobile
- Grades que colapsam para 1 coluna em telas pequenas

### Acessibilidade ✅
- `alt` em todas as imagens
- `aria-label` em botões e links
- `aria-expanded` no menu hambúrguer
- `aria-pressed` nos botões de filtro
- `role` em listas, navegação e modal
- `:focus-visible` customizado para navegação por teclado
- Contraste adequado entre texto e fundo

---

## 📚 Aprendizados

Durante o desenvolvimento, foram aplicados na prática:

- Estruturação semântica de páginas com HTML5
- Estilização e responsividade com CSS3 moderno
- Interatividade com JavaScript puro (ES6+)
- Organização de projetos web com múltiplos arquivos
- Versionamento de código com Git e GitHub
- Boas práticas de acessibilidade web (WCAG)

---

## 💡 Possíveis Melhorias Futuras

- Integração com banco de dados (backend real)
- Sistema de login e autenticação para alunos e mentores
- Área exclusiva do aluno e do mentor após login
- Melhorias adicionais de acessibilidade
- Modo escuro (dark mode)
- Deploy em plataforma de hospedagem (Vercel, Netlify)

---

## 📌 Status do Projeto

✅ Entregue — Versão 1.0 — Abril/2026

---

## 📄 Licença

Este projeto é desenvolvido exclusivamente para fins educacionais no âmbito da disciplina de Programação Front-End da Unicesumar.
