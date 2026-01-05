/**
 * ============================================
 * PRODUCT MODAL - Popup de detalhes dos produtos
 * ============================================
 */

(function() {
    'use strict';
    
    // Dados dos produtos
    const productsData = {
        corporativo: {
            title: 'Link de Internet Corporativo',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>`,
            description: 'O Link de Internet Corporativo é uma solução de conectividade dedicada, projetada para atender às demandas de empresas que necessitam de alta performance, estabilidade e segurança em suas operações online. Diferente da internet convencional, oferece banda 100% garantida, sem compartilhamento com outros usuários.',
            benefits: [
                'Banda garantida 100% - velocidade contratada é a velocidade entregue',
                'IP Fixo dedicado para acesso remoto e servidores',
                'SLA (Acordo de Nível de Serviço) com garantia de disponibilidade',
                'Monitoramento proativo 24 horas por dia, 7 dias por semana',
                'Suporte técnico especializado com equipe NOC',
                'Baixa latência ideal para videoconferências e VoIP',
                'Prioridade no atendimento em caso de falhas'
            ],
            useCases: [
                'Empresas com sistemas em nuvem (ERP, CRM)',
                'Escritórios que utilizam videoconferência',
                'Negócios com operações críticas online',
                'Empresas com servidores internos',
                'Comércios com múltiplos PDVs conectados'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Olá! Tenho interesse no Link de Internet Corporativo e gostaria de mais informações.'
        },
        mpls: {
            title: 'Link Lan to Lan | MPLS',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="3" width="6" height="6" rx="1"/>
                <rect x="16" y="3" width="6" height="6" rx="1"/>
                <rect x="2" y="15" width="6" height="6" rx="1"/>
                <rect x="16" y="15" width="6" height="6" rx="1"/>
                <path d="M8 6h8M8 18h8M5 9v6M19 9v6"/>
            </svg>`,
            description: 'O Link Lan to Lan é uma solução de rede privada que interconecta múltiplas unidades da sua empresa de forma segura e eficiente. Ideal para empresas com filiais, escritórios remotos ou que precisam integrar diferentes localidades em uma única rede corporativa.',
            benefits: [
                'Rede privada exclusiva entre suas unidades',
                'Comunicação segura sem exposição à internet pública',
                'Baixa latência para aplicações em tempo real',
                'Alta disponibilidade com redundância de rotas',
                'Qualidade de Serviço (QoS) para priorização de tráfego',
                'Escalabilidade para adicionar novas unidades facilmente',
                'Gerenciamento centralizado da rede'
            ],
            useCases: [
                'Redes de lojas e franquias',
                'Empresas com matriz e filiais',
                'Instituições financeiras',
                'Hospitais e clínicas com múltiplas unidades',
                'Indústrias com plantas em diferentes localidades',
                'Empresas que precisam compartilhar dados entre unidades'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Olá! Tenho interesse no Link Lan to Lan / MPLS e gostaria de mais informações.'
        },
        eventos: {
            title: 'Link para Eventos',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 2v4M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>`,
            description: 'O Link para Eventos é uma solução temporária de internet de alta capacidade, desenvolvida para garantir conectividade estável e de qualidade durante eventos de qualquer porte. Oferecemos instalação rápida, suporte técnico dedicado no local e flexibilidade na contratação.',
            benefits: [
                'Instalação rápida e prática no local do evento',
                'Alta capacidade de banda para muitos usuários simultâneos',
                'Suporte técnico presencial durante todo o evento',
                'Conexão estável mesmo com alta demanda',
                'Contratação flexível por período (dias, semanas)',
                'Wi-Fi corporativo com gestão de acessos',
                'Backup de conexão para maior segurança'
            ],
            useCases: [
                'Feiras e exposições',
                'Congressos e convenções',
                'Shows e festivais',
                'Eventos corporativos',
                'Transmissões ao vivo (lives)',
                'Casamentos e festas',
                'Eventos esportivos'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Olá! Tenho interesse no Link para Eventos e gostaria de mais informações.'
        }
    };
    
    // Elementos do DOM
    let modal, overlay, closeBtn;
    let modalTitle, modalIcon, modalDescription, modalBenefits, modalCases, modalWhatsapp;
    
    function init() {
        modal = document.getElementById('productModal');
        if (!modal) return;
        
        overlay = modal.querySelector('.product-modal-overlay');
        closeBtn = modal.querySelector('.product-modal-close');
        modalTitle = modal.querySelector('.product-modal-title');
        modalIcon = modal.querySelector('.product-modal-icon');
        modalDescription = modal.querySelector('.product-modal-description');
        modalBenefits = modal.querySelector('.product-modal-benefits');
        modalCases = modal.querySelector('.product-modal-cases');
        modalWhatsapp = modal.querySelector('.btn-whatsapp');
        
        // Event listeners para abrir modal
        const buttons = document.querySelectorAll('.btn-ver-mais');
        buttons.forEach(btn => {
            btn.addEventListener('click', handleOpenModal);
        });
        
        // Event listeners para fechar modal
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    function handleOpenModal(e) {
        const card = e.target.closest('.product-card');
        if (!card) return;
        
        const productKey = card.dataset.product;
        const product = productsData[productKey];
        
        if (!product) return;
        
        // Preencher conteúdo
        modalTitle.textContent = product.title;
        modalIcon.innerHTML = product.icon;
        modalDescription.textContent = product.description;
        
        // Benefícios
        modalBenefits.innerHTML = product.benefits.map(b => `<li>${b}</li>`).join('');
        
        // Casos de uso
        modalCases.innerHTML = product.useCases.map(c => `<li>${c}</li>`).join('');
        
        // Link WhatsApp
        modalWhatsapp.href = product.whatsapp;
        
        // Abrir modal
        openModal();
    }
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.querySelector('.product-modal-content').style.transform = 'translateY(0) scale(1)';
            modal.querySelector('.product-modal-content').style.opacity = '1';
        }, 10);
    }
    
    function closeModal() {
        const content = modal.querySelector('.product-modal-content');
        content.style.transform = 'translateY(20px) scale(0.95)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Inicializar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
