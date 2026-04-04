/* ==========================================
   TECH FOR ALL - script.js
   Arquivo principal de interatividade do site
   
   FUNCIONALIDADES:
   1. Menu Hambúrguer (mobile)
   2. Scroll Reveal (animação ao rolar)
   3. Modal de Sucesso (feedback ao usuário)
   4. Validação - Formulário Aluno
   5. Validação - Formulário Mentor
   6. Filtro de Mentores por área
   7. Contador animado (hero stats)
   ========================================== */

/* Aguarda o DOM estar completamente carregado antes de executar */
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       1. MENU HAMBÚRGUER
       Controla abertura/fechamento do menu mobile
       - Botão com 3 linhas vira X ao abrir
       - Overlay escuro fecha ao clicar fora
       - Tecla ESC também fecha o menu
       ======================================== */

    const hamburger = document.querySelector('.hamburger');
    /* Botão hambúrguer (3 linhas) */
    
    const menu = document.querySelector('.menu');
    /* Container do menu de navegação */
    
    const overlay = document.querySelector('.menu-overlay');
    /* Fundo escurecido atrás do menu aberto */

    /* Função para ABRIR o menu mobile */
    function abrirMenu() {
        hamburger?.classList.add('ativo');
        /* Transforma as 3 linhas em X */
        
        menu?.classList.add('aberto');
        /* Desliza o menu da direita para dentro */
        
        overlay?.classList.add('ativo');
        /* Mostra o overlay escuro */
        
        document.body.style.overflow = 'hidden';
        /* Trava o scroll da página enquanto menu está aberto */
    }

    /* Função para FECHAR o menu mobile */
    function fecharMenu() {
        hamburger?.classList.remove('ativo');
        /* Volta as 3 linhas normais */
        
        menu?.classList.remove('aberto');
        /* Esconde o menu para fora da tela */
        
        overlay?.classList.remove('ativo');
        /* Remove o overlay */
        
        document.body.style.overflow = '';
        /* Libera o scroll da página */
    }

    /* Toggle: abre se fechado, fecha se aberto */
    hamburger?.addEventListener('click', () => {
        menu?.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    /* Fecha ao clicar no overlay (fora do menu) */
    overlay?.addEventListener('click', fecharMenu);

    /* Fecha automaticamente ao clicar em qualquer link do menu */
    menu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', fecharMenu);
    });

    /* Fecha ao pressionar a tecla ESC */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharMenu();
    });


    /* ========================================
       2. SCROLL REVEAL
       Anima elementos ao entrar na tela durante o scroll
       - Detecta posição dos elementos com getBoundingClientRect
       - Adiciona classe 'visivel' quando o elemento aparece
       - Aplica delays escalonados em sequência
       ======================================== */

    /* Verifica quais elementos devem ser revelados */
    const revelarElementos = () => {
        const elementos = document.querySelectorAll('.reveal');
        /* Seleciona todos com classe reveal */
        
        const windowHeight = window.innerHeight;
        /* Altura visível da janela */

        elementos.forEach(el => {
            const rect = el.getBoundingClientRect();
            /* Posição do elemento em relação à viewport */
            
            if (rect.top < windowHeight - 80) {
                /* Revela quando 80px do elemento ficam visíveis */
                el.classList.add('visivel');
            }
        });
    };

    /* Adiciona classe reveal automaticamente em elementos interativos */
    document.querySelectorAll('.card, .curso-card, .biografia, .habilidades, .disponibilidade').forEach((el, i) => {
        el.classList.add('reveal');
        /* Delays escalonados para animação em cascata */
        if (i % 5 === 1) el.classList.add('reveal-delay-1');
        if (i % 5 === 2) el.classList.add('reveal-delay-2');
        if (i % 5 === 3) el.classList.add('reveal-delay-3');
        if (i % 5 === 4) el.classList.add('reveal-delay-4');
    });

    /* Escuta o scroll para verificar novos elementos */
    window.addEventListener('scroll', revelarElementos, { passive: true });
    /* passive: true melhora performance do scroll */
    
    revelarElementos();
    /* Roda uma vez ao carregar para elementos já visíveis */


    /* ========================================
       3. MODAL DE SUCESSO
       Exibe feedback visual após ações do usuário
       - Ícone grande + título + mensagem personalizada
       - Fecha clicando no botão ou fora do modal
       - Animação de entrada com spring effect
       ======================================== */

    /* Cria e exibe um modal dinâmico
       @param {string} titulo - Título principal do modal
       @param {string} mensagem - Mensagem explicativa (aceita HTML)
       @param {string} icone - Emoji exibido no topo */
    function criarModal(titulo, mensagem, icone = '✅') {
        /* Remove modal anterior se já existir */
        document.querySelector('.modal-overlay')?.remove();

        /* Cria elemento do modal dinamicamente */
        const modal = document.createElement('div');
        modal.className = 'modal-overlay ativo';
        modal.innerHTML = `
            <div class="modal-box">
                <span class="modal-icone">${icone}</span>
                <h3>${titulo}</h3>
                <p>${mensagem}</p>
                <button onclick="this.closest('.modal-overlay').remove(); document.body.style.overflow=''">
                    Fechar
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        /* Insere o modal no DOM */
        
        document.body.style.overflow = 'hidden';
        /* Trava scroll enquanto modal está aberto */

        /* Fecha ao clicar fora da caixa do modal */
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }


    /* ========================================
       4. VALIDAÇÃO - FORMULÁRIO ALUNO
       Valida dados antes de "enviar" inscrição
       Campos obrigatórios:
       - Nome completo (mín. 3 caracteres)
       - Email válido (formato usuario@dominio.com)
       - Curso preferido (seleção obrigatória)
       - Nível atual (seleção obrigatória)
       ======================================== */

    const formAluno = document.getElementById('formAluno');
    /* Formulário de inscrição do aluno */

    if (formAluno) {
        /* Só executa se o formulário existir na página atual */
        
        formAluno.addEventListener('submit', (e) => {
            e.preventDefault();
            /* Impede envio padrão do formulário (recarregamento de página) */
            
            let valido = true;
            /* Flag de controle: false se qualquer campo falhar */

            /* Limpa todos os erros da validação anterior */
            formAluno.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));
            formAluno.querySelectorAll('.msg-erro').forEach(el => el.remove());

            /* Captura referências dos campos */
            const nome     = document.getElementById('nomeAluno');
            const email    = document.getElementById('emailAluno');
            const curso    = document.getElementById('cursoPreferido');
            const nivel    = document.getElementById('nivelAtual');

            /* VALIDAÇÃO: Nome mínimo 3 caracteres */
            if (!nome.value.trim() || nome.value.trim().length < 3) {
                marcarErro(nome, 'Por favor, insira seu nome completo.');
                valido = false;
            }

            /* VALIDAÇÃO: Email no formato correto */
            if (!validarEmail(email.value)) {
                marcarErro(email, 'Por favor, insira um email válido.');
                valido = false;
            }

            /* VALIDAÇÃO: Curso selecionado */
            if (!curso.value) {
                marcarErro(curso, 'Selecione um curso de sua preferência.');
                valido = false;
            }

            /* VALIDAÇÃO: Nível selecionado */
            if (!nivel.value) {
                marcarErro(nivel, 'Selecione seu nível atual de conhecimento.');
                valido = false;
            }

            /* Se todos os campos passaram na validação */
            if (valido) {
                const nomePrimeiro = nome.value.trim().split(' ')[0];
                /* Extrai apenas o primeiro nome para personalizar a mensagem */

                /* Exibe modal de sucesso personalizado */
                criarModal(
                    'Inscrição Realizada! 🎉',
                    `Olá, <strong>${nomePrimeiro}</strong>! Sua inscrição foi concluída com sucesso.<br><br>
                     Em breve entraremos em contato pelo email <strong>${email.value}</strong> com os próximos passos da sua jornada em tecnologia!`,
                    '🚀'
                );
                
                formAluno.reset();
                /* Limpa todos os campos após envio bem-sucedido */
            }
        });
    }


    /* ========================================
       5. VALIDAÇÃO - FORMULÁRIO MENTOR
       Valida dados do cadastro de mentores voluntários
       Campos obrigatórios:
       - Nome completo (mín. 3 caracteres)
       - Email profissional válido
       - WhatsApp com DDD (mín. 10 dígitos)
       - Experiência em TI (mín. 100 caracteres)
       - Ao menos 1 área de ensino selecionada
       ======================================== */

    const formMentor = document.getElementById('formMentor');
    /* Formulário de cadastro de mentor */

    if (formMentor) {
        /* Só executa se o formulário existir na página atual */
        
        formMentor.addEventListener('submit', (e) => {
            e.preventDefault();
            /* Impede envio padrão do formulário */
            
            let valido = true;
            /* Flag de controle de validação */

            /* Limpa erros da validação anterior */
            formMentor.querySelectorAll('.erro').forEach(el => el.classList.remove('erro'));
            formMentor.querySelectorAll('.msg-erro').forEach(el => el.remove());

            /* Captura referências dos campos */
            const nome        = document.getElementById('nomeMentor');
            const email       = document.getElementById('emailMentor');
            const whatsapp    = document.getElementById('whatsappMentor');
            const experiencia = document.getElementById('experiencia');
            const checkboxes  = formMentor.querySelectorAll('.areas-ensino input[type="checkbox"]:checked');
            /* Checkboxes marcados nas áreas de ensino */

            /* VALIDAÇÃO: Nome mínimo 3 caracteres */
            if (!nome.value.trim() || nome.value.trim().length < 3) {
                marcarErro(nome, 'Por favor, insira seu nome completo.');
                valido = false;
            }

            /* VALIDAÇÃO: Email no formato correto */
            if (!validarEmail(email.value)) {
                marcarErro(email, 'Por favor, insira um email válido.');
                valido = false;
            }

            /* VALIDAÇÃO: WhatsApp com ao menos 10 dígitos (com DDD) */
            if (!whatsapp.value.trim() || whatsapp.value.replace(/\D/g, '').length < 10) {
                marcarErro(whatsapp, 'Insira um WhatsApp válido com DDD. Ex: (11) 99999-9999');
                valido = false;
            }

            /* VALIDAÇÃO: Experiência mínima de 100 caracteres */
            if (experiencia.value.trim().length < 100) {
                const faltam = 100 - experiencia.value.trim().length;
                marcarErro(experiencia, `Escreva mais ${faltam} caractere(s) sobre sua experiência.`);
                valido = false;
            }

            /* VALIDAÇÃO: Ao menos 1 área de ensino selecionada */
            if (checkboxes.length === 0) {
                const areasDiv = formMentor.querySelector('.areas-ensino');
                /* Insere mensagem de erro abaixo das checkboxes */
                const msg = document.createElement('p');
                msg.className = 'msg-erro visivel';
                msg.style.marginTop = '8px';
                msg.textContent = 'Selecione ao menos uma área de ensino.';
                areasDiv.after(msg);
                valido = false;
            }

            /* Se todos os campos passaram na validação */
            if (valido) {
                const nomePrimeiro = nome.value.trim().split(' ')[0];
                /* Extrai primeiro nome para personalizar mensagem */

                /* Lista as áreas selecionadas para exibir no modal */
                const areasSelected = Array.from(checkboxes).map(cb => cb.value).join(', ');

                /* Exibe modal de sucesso para o mentor */
                criarModal(
                    'Cadastro Enviado! 🌟',
                    `Incrível, <strong>${nomePrimeiro}</strong>! Recebemos seu cadastro como mentor voluntário.<br><br>
                     Áreas cadastradas: <strong>${areasSelected}</strong>.<br><br>
                     Nossa equipe analisará seu perfil e entrará em contato em até <strong>3 dias úteis</strong> 
                     pelo email <strong>${email.value}</strong>.`,
                    '👨‍🏫'
                );
                
                formMentor.reset();
                /* Limpa todos os campos após envio bem-sucedido */
                
                /* Reseta o contador de caracteres para 0 */
                const contador = document.querySelector('.contador-chars');
                if (contador) {
                    contador.textContent = '0 / 100 caracteres mínimos';
                    contador.style.color = '#9CA3AF';
                }
            }
        });

        /* CONTADOR DE CARACTERES: Feedback em tempo real na textarea de experiência */
        const textarea = document.getElementById('experiencia');
        
        if (textarea) {
            /* Cria elemento contador abaixo da textarea */
            const contador = document.createElement('p');
            contador.className = 'contador-chars';
            /* Classe para referência no reset do form */
            
            contador.style.cssText = 'font-size:12px; color:#9CA3AF; text-align:right; margin-top:4px; margin-bottom:8px;';
            contador.textContent = '0 / 100 caracteres mínimos';
            textarea.after(contador);

            /* Atualiza contador a cada digitação */
            textarea.addEventListener('input', () => {
                const len = textarea.value.trim().length;
                contador.textContent = `${len} / 100 caracteres mínimos`;
                /* Muda cor para verde ao atingir o mínimo */
                contador.style.color = len >= 100 ? '#2CCB91' : '#9CA3AF';
            });
        }
    }


    /* ========================================
       6. FILTRO DE MENTORES
       Filtra os cards de mentores por área de atuação
       - Botões: Todos | Front-end | Back-end | Design
       - Usa data-area nos cards para identificar categoria
       - Animação suave de fade ao filtrar
       ======================================== */

    const filtroBtns = document.querySelectorAll('.filtro-btn');
    /* Botões de filtro por área */

    if (filtroBtns.length > 0) {
        /* Só executa se existirem botões de filtro na página */
        
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                /* Atualiza botão ativo: remove de todos e adiciona no clicado */
                filtroBtns.forEach(b => b.classList.remove('ativo'));
                btn.classList.add('ativo');

                const filtro = btn.dataset.filtro;
                /* Valor do filtro: 'todos', 'frontend', 'backend', 'design' */
                
                const cards = document.querySelectorAll('.card[data-area]');
                /* Todos os cards que possuem atributo data-area */

                cards.forEach(card => {
                    const area = card.dataset.area || '';
                    /* Área do mentor definida no atributo data-area do HTML */
                    
                    const mostrar = filtro === 'todos' || area.includes(filtro);
                    /* Mostra se for 'todos' ou se a área contém o filtro selecionado */
                    
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

                    if (mostrar) {
                        /* Exibe o card com animação */
                        card.style.opacity = '1';
                        card.style.transform = '';
                        card.style.display = '';
                    } else {
                        /* Esconde o card com fade out */
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            /* Aguarda animação antes de ocultar completamente */
                            if (card.style.opacity === '0') card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }


    /* ========================================
       7. FUNÇÕES AUXILIARES
       Reutilizadas em múltiplos pontos do código
       ======================================== */

    /* Valida formato de email usando regex
       @param {string} email - Email a ser validado
       @returns {boolean} true se válido, false se inválido */
    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        /* Regex: verifica padrão usuario@dominio.extensao */
    }

    /* Marca campo com erro visual e exibe mensagem abaixo dele
       @param {HTMLElement} campo - Input/select/textarea com erro
       @param {string} mensagem - Texto de erro a exibir */
    function marcarErro(campo, mensagem) {
        campo.classList.add('erro');
        /* Aplica borda vermelha via CSS na classe .erro */
        
        const msg = document.createElement('p');
        msg.className = 'msg-erro visivel';
        msg.textContent = mensagem;
        campo.after(msg);
        /* Insere mensagem de erro logo abaixo do campo */
        
        campo.focus();
        /* Move o foco para o primeiro campo com erro */
    }


    /* ========================================
       8. CONTADOR ANIMADO (Hero Stats)
       Anima os números do hero de 0 até o valor final
       - Usa IntersectionObserver para disparar ao entrar na tela
       - Easing easeOut para desaceleração natural
       - Suporta sufixos customizados (%, +, etc.) via data-sufixo
       ======================================== */

    const statsNumericos = document.querySelectorAll('.stat-numero[data-alvo]');
    /* Elementos com valor alvo definido via data-alvo */

    if (statsNumericos.length > 0) {
        /* Só executa se existirem stats na página */
        
        /* Função que anima um número do 0 ao valor alvo
           @param {HTMLElement} el - Elemento a animar */
        const animarContador = (el) => {
            const alvo    = parseInt(el.dataset.alvo);
            /* Valor final do contador */
            
            const duracao = 1500;
            /* Duração da animação em milissegundos */
            
            const inicio  = performance.now();
            /* Timestamp inicial para calcular progresso */

            const atualizar = (agora) => {
                const progresso = Math.min((agora - inicio) / duracao, 1);
                /* Progresso de 0 a 1 */
                
                const easeOut = 1 - Math.pow(1 - progresso, 3);
                /* Curva easeOut cúbica: rápido no início, lento no final */
                
                el.textContent = Math.floor(easeOut * alvo) + (el.dataset.sufixo || '');
                /* Atualiza o texto com número atual + sufixo (ex: "+", "%") */
                
                if (progresso < 1) requestAnimationFrame(atualizar);
                /* Continua animando até atingir 100% */
            };

            requestAnimationFrame(atualizar);
            /* Inicia o loop de animação */
        };

        /* IntersectionObserver: dispara animação ao entrar na viewport */
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animado) {
                    /* Anima apenas uma vez (verifica flag data-animado) */
                    entry.target.dataset.animado = 'true';
                    animarContador(entry.target);
                }
            });
        }, { threshold: 0.5 });
        /* threshold: 0.5 = dispara quando 50% do elemento está visível */

        statsNumericos.forEach(el => observer.observe(el));
        /* Registra cada elemento de stat no observer */
    }

});
/* Fim do DOMContentLoaded */
