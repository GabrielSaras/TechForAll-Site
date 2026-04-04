/* ==========================================
   TECH FOR ALL — script.js
   Arquivo principal de interatividade do site

   FUNCIONALIDADES IMPLEMENTADAS:
   1. Menu Hambúrguer (mobile off-canvas)
   2. Scroll Reveal (animação ao rolar a página)
   3. Modal de Sucesso (feedback visual ao usuário)
   4. Validação — Formulário de Aluno
   5. Validação — Formulário de Mentor
   6. Filtro de Mentores por área de atuação
   7. Contador Animado (números do hero)

   BOAS PRÁTICAS APLICADAS:
   - DOMContentLoaded garante que o HTML está pronto
   - Optional chaining (?.) evita erros em páginas sem os elementos
   - { passive: true } no scroll melhora performance
   - IntersectionObserver é mais eficiente que eventos de scroll
   - Funções nomeadas facilitam leitura e depuração
   - aria-expanded e aria-pressed para acessibilidade
   ========================================== */


/* ==========================================
   PONTO DE ENTRADA
   Tudo é executado após o DOM estar 100% carregado
   para garantir que todos os elementos existem
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {


    /* ==========================================
       1. MENU HAMBÚRGUER
       ==========================================
       COMO FUNCIONA:
       - Botão com 3 linhas (hamburger) aparece no mobile
       - Ao clicar: menu desliza da direita para dentro da tela
       - As 3 linhas viram um X (via CSS + classe .ativo)
       - Overlay escuro cobre o fundo
       - Fecha ao clicar fora, em um link ou pressionar ESC

       ELEMENTOS USADOS:
       .hamburger  → botão com 3 linhas
       .menu       → nav que desliza da direita
       .menu-overlay → fundo escuro clicável
    ========================================== */

    const hamburger = document.querySelector('.hamburger');
    const menu      = document.querySelector('.menu');
    const overlay   = document.querySelector('.menu-overlay');

    /**
     * Abre o menu mobile.
     * - Adiciona classes CSS que disparam as animações
     * - Trava o scroll da página (body.overflow = hidden)
     * - Atualiza aria-expanded para acessibilidade
     */
    function abrirMenu() {
        hamburger?.classList.add('ativo');    /* Transforma as 3 linhas em X */
        menu?.classList.add('aberto');        /* Desliza o menu para dentro */
        overlay?.classList.add('ativo');      /* Mostra o fundo escuro */
        document.body.style.overflow = 'hidden'; /* Trava scroll da página */
        hamburger?.setAttribute('aria-expanded', 'true'); /* Acessibilidade */
    }

    /**
     * Fecha o menu mobile.
     * - Remove as classes CSS que abriram o menu
     * - Libera o scroll da página
     * - Restaura aria-expanded
     */
    function fecharMenu() {
        hamburger?.classList.remove('ativo');
        menu?.classList.remove('aberto');
        overlay?.classList.remove('ativo');
        document.body.style.overflow = ''; /* Libera scroll */
        hamburger?.setAttribute('aria-expanded', 'false'); /* Acessibilidade */
    }

    /* Toggle: se o menu estiver aberto, fecha; senão abre */
    hamburger?.addEventListener('click', () => {
        menu?.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    /* Fecha ao clicar no overlay (área fora do menu) */
    overlay?.addEventListener('click', fecharMenu);

    /* Fecha automaticamente ao navegar por um link do menu */
    menu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    /* Fecha ao pressionar a tecla ESC (acessibilidade por teclado) */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharMenu();
    });


    /* ==========================================
       2. SCROLL REVEAL
       ==========================================
       COMO FUNCIONA:
       - Elementos com classe .reveal começam invisíveis (opacity: 0)
         e deslocados 30px para baixo (CSS: transform: translateY(30px))
       - Ao entrar na viewport, a classe .visivel é adicionada
         e o CSS os anima até a posição e opacidade normais
       - Delays escalonados (.reveal-delay-1 a 5) criam efeito cascata

       TÉCNICA: getBoundingClientRect() verifica se o elemento
       está dentro da janela visível do navegador
    ========================================== */

    /**
     * Verifica todos os elementos .reveal e revela os que
     * já estão dentro da área visível da janela (viewport).
     */
    const revelarElementos = () => {
        const elementos    = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight; /* Altura visível da janela */

        elementos.forEach(el => {
            const rect = el.getBoundingClientRect();
            /* rect.top < windowHeight - 80:
               revela quando o topo do elemento está a 80px do fundo da tela */
            if (rect.top < windowHeight - 80) {
                el.classList.add('visivel');
            }
        });
    };

    /* Adiciona .reveal automaticamente em elementos interativos
       que não tiverem a classe no HTML */
    document.querySelectorAll('.card, .curso-card, .biografia, .habilidades, .disponibilidade')
        .forEach((el, i) => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
            /* Delays escalonados para animação em cascata */
            if (i % 5 === 1) el.classList.add('reveal-delay-1');
            if (i % 5 === 2) el.classList.add('reveal-delay-2');
            if (i % 5 === 3) el.classList.add('reveal-delay-3');
            if (i % 5 === 4) el.classList.add('reveal-delay-4');
        });

    /* { passive: true }: informa ao navegador que não vamos chamar
       preventDefault no scroll, permitindo otimizações de performance */
    window.addEventListener('scroll', revelarElementos, { passive: true });

    /* Executa uma vez imediatamente para revelar elementos já visíveis */
    revelarElementos();


    /* ==========================================
       3. MODAL DE SUCESSO
       ==========================================
       COMO FUNCIONA:
       - Cria um elemento <div> dinâmico no DOM ao ser chamado
       - Exibe ícone + título + mensagem personalizada
       - Animação de entrada definida no CSS (@keyframes modalEntrada)
       - Fecha ao clicar no botão ou no fundo (overlay)

       USO: criarModal('Título', 'Mensagem HTML', '🎉')
    ========================================== */

    /**
     * Cria e exibe um modal de feedback ao usuário.
     * @param {string} titulo   - Título principal do modal
     * @param {string} mensagem - Corpo da mensagem (aceita HTML)
     * @param {string} icone    - Emoji exibido no topo (padrão: ✅)
     */
    function criarModal(titulo, mensagem, icone = '✅') {
        /* Remove modal anterior se ainda estiver aberto */
        document.querySelector('.modal-overlay')?.remove();

        /* Cria o elemento do modal dinamicamente via innerHTML */
        const modal = document.createElement('div');
        modal.className = 'modal-overlay ativo';
        modal.setAttribute('role', 'dialog');           /* Acessibilidade */
        modal.setAttribute('aria-modal', 'true');       /* Leitor de tela sabe que é modal */
        modal.setAttribute('aria-labelledby', 'modal-titulo');
        modal.innerHTML = `
            <div class="modal-box">
                <span class="modal-icone" aria-hidden="true">${icone}</span>
                <h3 id="modal-titulo">${titulo}</h3>
                <p>${mensagem}</p>
                <button type="button"
                        onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow=''">
                    Fechar
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; /* Trava scroll enquanto modal está aberto */

        /* Fecha ao clicar fora da caixa branca (no overlay escuro) */
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });

        /* Move o foco para dentro do modal (acessibilidade por teclado) */
        modal.querySelector('button')?.focus();
    }


    /* ==========================================
       4. VALIDAÇÃO — FORMULÁRIO DE ALUNO
       ==========================================
       CAMPOS VALIDADOS:
       - Nome completo (mínimo 3 caracteres)
       - Email (formato usuario@dominio.com)
       - Curso preferido (seleção obrigatória)
       - Nível atual (seleção obrigatória)

       FLUXO:
       1. Usuário clica em "Inscrever"
       2. JS verifica cada campo com if()
       3. Campos inválidos recebem borda vermelha (.erro)
         e uma mensagem aparece abaixo deles (.msg-erro)
       4. Se tudo ok, exibe modal de sucesso e limpa o form
    ========================================== */

    const formAluno = document.getElementById('formAluno');

    if (formAluno) {
        /* Só executa se este formulário existir na página atual */

        formAluno.addEventListener('submit', (e) => {
            e.preventDefault(); /* Impede recarregamento da página */

            let valido = true; /* Flag: false se algum campo falhar */

            /* Limpa erros visuais da validação anterior */
            formAluno.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));
            formAluno.querySelectorAll('.msg-erro').forEach(el => el.remove());

            /* Referências dos campos */
            const nome  = document.getElementById('nomeAluno');
            const email = document.getElementById('emailAluno');
            const curso = document.getElementById('cursoPreferido');
            const nivel = document.getElementById('nivelAtual');

            /* Valida: nome com mínimo de 3 caracteres */
            if (!nome.value.trim() || nome.value.trim().length < 3) {
                marcarErro(nome, 'Por favor, insira seu nome completo.');
                valido = false;
            }

            /* Valida: email no formato correto */
            if (!validarEmail(email.value)) {
                marcarErro(email, 'Por favor, insira um email válido.');
                valido = false;
            }

            /* Valida: curso selecionado */
            if (!curso.value) {
                marcarErro(curso, 'Selecione um curso de sua preferência.');
                valido = false;
            }

            /* Valida: nível selecionado */
            if (!nivel.value) {
                marcarErro(nivel, 'Selecione seu nível atual de conhecimento.');
                valido = false;
            }

            /* Se todos os campos passaram: exibe modal de sucesso */
            if (valido) {
                const nomePrimeiro = nome.value.trim().split(' ')[0];

                criarModal(
                    'Inscrição Realizada! 🎉',
                    `Olá, <strong>${nomePrimeiro}</strong>! Sua inscrição foi concluída com sucesso.<br><br>
                     Em breve entraremos em contato pelo email <strong>${email.value}</strong>
                     com os próximos passos da sua jornada em tecnologia!`,
                    '🚀'
                );

                formAluno.reset(); /* Limpa todos os campos */
            }
        });
    }


    /* ==========================================
       5. VALIDAÇÃO — FORMULÁRIO DE MENTOR
       ==========================================
       CAMPOS VALIDADOS:
       - Nome completo (mínimo 3 caracteres)
       - Email profissional (formato válido)
       - WhatsApp com DDD (mínimo 10 dígitos numéricos)
       - Experiência em TI (mínimo 100 caracteres)
       - Áreas de ensino (ao menos 1 checkbox marcado)

       EXTRA: Contador de caracteres em tempo real
       na textarea de experiência (inserido via JS)
    ========================================== */

    const formMentor = document.getElementById('formMentor');

    if (formMentor) {
        /* Só executa se este formulário existir na página atual */

        formMentor.addEventListener('submit', (e) => {
            e.preventDefault();

            let valido = true;

            /* Limpa erros da validação anterior */
            formMentor.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));
            formMentor.querySelectorAll('.msg-erro').forEach(el => el.remove());

            /* Referências dos campos */
            const nome        = document.getElementById('nomeMentor');
            const email       = document.getElementById('emailMentor');
            const whatsapp    = document.getElementById('whatsappMentor');
            const experiencia = document.getElementById('experiencia');

            /* Checkboxes marcados nas áreas de ensino */
            const checkboxes = formMentor.querySelectorAll('.areas-ensino input[type="checkbox"]:checked');

            /* Valida: nome com mínimo de 3 caracteres */
            if (!nome.value.trim() || nome.value.trim().length < 3) {
                marcarErro(nome, 'Por favor, insira seu nome completo.');
                valido = false;
            }

            /* Valida: email no formato correto */
            if (!validarEmail(email.value)) {
                marcarErro(email, 'Por favor, insira um email válido.');
                valido = false;
            }

            /* Valida: WhatsApp com ao menos 10 dígitos (DDD + número)
               .replace(/\D/g, '') remove tudo que não for dígito antes de contar */
            if (!whatsapp.value.trim() || whatsapp.value.replace(/\D/g, '').length < 10) {
                marcarErro(whatsapp, 'Insira um WhatsApp válido com DDD. Ex: (11) 99999-9999');
                valido = false;
            }

            /* Valida: experiência com mínimo de 100 caracteres */
            if (experiencia.value.trim().length < 100) {
                const faltam = 100 - experiencia.value.trim().length;
                marcarErro(experiencia, `Escreva mais ${faltam} caractere(s) sobre sua experiência.`);
                valido = false;
            }

            /* Valida: ao menos 1 área de ensino selecionada */
            if (checkboxes.length === 0) {
                const areasDiv = formMentor.querySelector('.areas-ensino');
                const msg = document.createElement('p');
                msg.className = 'msg-erro visivel';
                msg.style.marginTop = '8px';
                msg.textContent = 'Selecione ao menos uma área de ensino.';
                areasDiv.after(msg);
                valido = false;
            }

            /* Se tudo ok: exibe modal de sucesso */
            if (valido) {
                const nomePrimeiro  = nome.value.trim().split(' ')[0];
                const areasSelected = Array.from(checkboxes).map(cb => cb.value).join(', ');

                criarModal(
                    'Cadastro Enviado! 🌟',
                    `Incrível, <strong>${nomePrimeiro}</strong>! Recebemos seu cadastro como mentor voluntário.<br><br>
                     Áreas cadastradas: <strong>${areasSelected}</strong>.<br><br>
                     Nossa equipe analisará seu perfil e entrará em contato em até
                     <strong>3 dias úteis</strong> pelo email <strong>${email.value}</strong>.`,
                    '👨‍🏫'
                );

                formMentor.reset();

                /* Reseta visualmente o contador de caracteres */
                const contador = document.querySelector('.contador-chars');
                if (contador) {
                    contador.textContent = '0 / 100 caracteres mínimos';
                    contador.style.color = '#9CA3AF';
                }
            }
        });

        /* --- CONTADOR DE CARACTERES EM TEMPO REAL ---
           Inserido dinamicamente abaixo da textarea de experiência.
           Muda de cinza para verde ao atingir o mínimo de 100 caracteres. */
        const textarea = document.getElementById('experiencia');

        if (textarea) {
            const contador = document.createElement('p');
            contador.className = 'contador-chars';
            contador.style.cssText = 'font-size:12px; color:#9CA3AF; text-align:right; margin-top:4px; margin-bottom:8px;';
            contador.textContent = '0 / 100 caracteres mínimos';
            textarea.after(contador); /* Insere o contador logo abaixo da textarea */

            /* Atualiza o contador a cada tecla digitada */
            textarea.addEventListener('input', () => {
                const len = textarea.value.trim().length;
                contador.textContent = `${len} / 100 caracteres mínimos`;
                /* Verde quando atingiu o mínimo, cinza caso contrário */
                contador.style.color = len >= 100 ? '#2CCB91' : '#9CA3AF';
            });
        }
    }


    /* ==========================================
       6. FILTRO DE MENTORES POR ÁREA
       ==========================================
       COMO FUNCIONA:
       - Botões de filtro têm data-filtro="frontend|backend|design|todos"
       - Cards de mentor têm data-area="frontend|backend|design"
       - Ao clicar: compara data-filtro com data-area de cada card
       - Cards que não correspondem somem com animação de fade + scale
       - aria-pressed atualizado para acessibilidade

       ANIMAÇÃO:
       - opacity: 0 + scale(0.95) → setTimeout(display: none, 300ms)
       - display: '' + opacity: 1 + scale normal para mostrar
    ========================================== */

    const filtroBtns = document.querySelectorAll('.filtro-btn');

    if (filtroBtns.length > 0) {

        filtroBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                /* Atualiza estado visual e aria-pressed em todos os botões */
                filtroBtns.forEach(b => {
                    b.classList.remove('ativo');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('ativo');
                btn.setAttribute('aria-pressed', 'true');

                const filtro = btn.dataset.filtro; /* "todos", "frontend", "backend", "design" */
                const cards  = document.querySelectorAll('.card[data-area]');

                cards.forEach(card => {
                    const area   = card.dataset.area || '';
                    const mostrar = filtro === 'todos' || area.includes(filtro);

                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                    if (mostrar) {
                        /* Exibe o card com fade in */
                        card.style.display   = '';
                        /* Força reflow para garantir a transição */
                        void card.offsetWidth;
                        card.style.opacity   = '1';
                        card.style.transform = '';
                    } else {
                        /* Oculta o card com fade out */
                        card.style.opacity   = '0';
                        card.style.transform = 'scale(0.95)';
                        /* Aguarda a animação terminar antes de ocultar do layout */
                        setTimeout(() => {
                            if (card.style.opacity === '0') card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }


    /* ==========================================
       7. FUNÇÕES AUXILIARES
       Reutilizadas em múltiplos pontos do código
    ========================================== */

    /**
     * Valida o formato de um email usando expressão regular.
     * Padrão: usuario@dominio.extensao
     * @param {string} email - Email a ser testado
     * @returns {boolean} true se válido, false se inválido
     */
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    /**
     * Marca um campo de formulário com erro visual.
     * - Adiciona classe .erro (borda vermelha via CSS)
     * - Insere uma mensagem de texto abaixo do campo
     * - Move o foco do teclado para o campo com erro
     *
     * @param {HTMLElement} campo    - Input, select ou textarea com erro
     * @param {string}      mensagem - Texto de erro a ser exibido
     */
    function marcarErro(campo, mensagem) {
        campo.classList.add('erro');

        const msg = document.createElement('p');
        msg.className = 'msg-erro visivel';
        msg.textContent = mensagem;
        campo.after(msg); /* Insere a mensagem de erro logo abaixo do campo */

        campo.focus(); /* Move o foco para facilitar correção pelo usuário */
    }


    /* ==========================================
       8. CONTADOR ANIMADO — HERO STATS
       ==========================================
       COMO FUNCIONA:
       - Elementos com data-alvo="N" e data-sufixo="+" ou "%" são detectados
       - IntersectionObserver dispara a animação quando o elemento
         entra 50% dentro da viewport (threshold: 0.5)
       - requestAnimationFrame anima o número de 0 até data-alvo
         com easing easeOut cúbico (rápido → lento)
       - data-animado previne que a animação rode mais de uma vez

       FÓRMULA EASING:
       easeOut = 1 - (1 - progresso)³
       progresso vai de 0 a 1 durante 1500ms
    ========================================== */

    const statsNumericos = document.querySelectorAll('.stat-numero[data-alvo]');

    if (statsNumericos.length > 0) {

        /**
         * Anima um número de 0 até seu valor alvo (data-alvo).
         * @param {HTMLElement} el - Elemento .stat-numero a animar
         */
        const animarContador = (el) => {
            const alvo    = parseInt(el.dataset.alvo); /* Valor final */
            const duracao = 1500; /* Duração total em milissegundos */
            const inicio  = performance.now(); /* Timestamp de início */

            /**
             * Função chamada a cada frame pelo requestAnimationFrame.
             * @param {number} agora - Timestamp atual (fornecido pelo browser)
             */
            const atualizar = (agora) => {
                const progresso = Math.min((agora - inicio) / duracao, 1);

                /* Curva easeOut: começa rápido e desacelera no final */
                const easeOut = 1 - Math.pow(1 - progresso, 3);

                /* Atualiza o texto: número arredondado + sufixo (ex: +, %) */
                el.textContent = Math.floor(easeOut * alvo) + (el.dataset.sufixo || '');

                /* Continua animando enquanto não atingiu 100% */
                if (progresso < 1) requestAnimationFrame(atualizar);
            };

            requestAnimationFrame(atualizar); /* Inicia o loop de animação */
        };

        /* IntersectionObserver: mais eficiente que eventos de scroll
           threshold: 0.5 = dispara quando 50% do elemento está visível */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                /* data-animado evita que o contador recomece ao rolar de volta */
                if (entry.isIntersecting && !entry.target.dataset.animado) {
                    entry.target.dataset.animado = 'true';
                    animarContador(entry.target);
                }
            });
        }, { threshold: 0.5 });

        /* Registra cada stat no observer */
        statsNumericos.forEach(el => observer.observe(el));
    }


}); /* Fim do DOMContentLoaded */
