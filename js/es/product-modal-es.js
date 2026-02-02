/**
 * ============================================
 * PRODUCT MODAL - Popup de detalles del producto (Español)
 * ============================================
 */

(function() {
    'use strict';
    
    // Datos de productos
    const productsData = {
        corporativo: {
            title: 'Enlace de Internet Corporativo',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>`,
            description: 'El Enlace de Internet Corporativo es una solución de conectividad dedicada diseñada para satisfacer las demandas de empresas que requieren alto rendimiento, estabilidad y seguridad en sus operaciones en línea. A diferencia del internet convencional, ofrece un 100% de ancho de banda garantizado sin compartir con otros usuarios.',
            benefits: [
                '100% de ancho de banda garantizado - la velocidad contratada es la velocidad entregada',
                'IP estático dedicado para acceso remoto y servidores',
                'SLA (Acuerdo de Nivel de Servicio) con garantía de disponibilidad',
                'Monitoreo proactivo 24/7',
                'Soporte técnico especializado con equipo NOC',
                'Baja latencia ideal para videoconferencias y VoIP',
                'Servicio prioritario en caso de fallas'
            ],
            useCases: [
                'Empresas con sistemas en la nube (ERP, CRM)',
                'Oficinas que utilizan videoconferencias',
                'Negocios con operaciones críticas en línea',
                'Empresas con servidores internos',
                'Comercio minorista con múltiples terminales POS conectados'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=¡Hola! Estoy interesado en el Enlace de Internet Corporativo y me gustaría obtener más información.'
        },
        mpls: {
            title: 'Enlace LAN a LAN | MPLS',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="3" width="6" height="6" rx="1"/>
                <rect x="16" y="3" width="6" height="6" rx="1"/>
                <rect x="2" y="15" width="6" height="6" rx="1"/>
                <rect x="16" y="15" width="6" height="6" rx="1"/>
                <path d="M8 6h8M8 18h8M5 9v6M19 9v6"/>
            </svg>`,
            description: 'El Enlace LAN a LAN es una solución de red privada que interconecta múltiples unidades de su empresa de forma segura y eficiente. Ideal para empresas con sucursales, oficinas remotas o aquellas que necesitan integrar diferentes ubicaciones en una única red corporativa.',
            benefits: [
                'Red privada exclusiva entre sus ubicaciones',
                'Comunicación segura sin exposición a internet público',
                'Baja latencia para aplicaciones en tiempo real',
                'Alta disponibilidad con redundancia de rutas',
                'Calidad de Servicio (QoS) para priorización de tráfico',
                'Escalabilidad para agregar nuevas ubicaciones fácilmente',
                'Gestión de red centralizada'
            ],
            useCases: [
                'Cadenas de tiendas y franquicias',
                'Empresas con sede central y sucursales',
                'Instituciones financieras',
                'Hospitales y clínicas con múltiples ubicaciones',
                'Industrias con plantas en diferentes ubicaciones',
                'Empresas que necesitan compartir datos entre unidades'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=¡Hola! Estoy interesado en el Enlace LAN a LAN / MPLS y me gustaría obtener más información.'
        },
        eventos: {
            title: 'Enlace para Eventos',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 2v4M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>`,
            description: 'El Enlace para Eventos es una solución de internet de alta capacidad temporal desarrollada para garantizar conectividad estable y de calidad durante eventos de cualquier tamaño. Ofrecemos instalación rápida, soporte técnico dedicado en sitio y opciones de contratación flexibles.',
            benefits: [
                'Instalación rápida y práctica en el sitio',
                'Alta capacidad de ancho de banda para muchos usuarios simultáneos',
                'Soporte técnico en sitio durante todo el evento',
                'Conexión estable incluso bajo alta demanda',
                'Contratación flexible por período (días, semanas)',
                'Wi-Fi corporativo con gestión de acceso',
                'Conexión de respaldo para mayor seguridad'
            ],
            useCases: [
                'Ferias y exposiciones',
                'Conferencias y convenciones',
                'Conciertos y festivales',
                'Eventos corporativos',
                'Transmisiones en vivo (streaming)',
                'Bodas y fiestas',
                'Eventos deportivos'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=¡Hola! Estoy interesado en el Enlace para Eventos y me gustaría obtener más información.'
        },
        rural: {
            title: 'Internet Rural | Radio',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 20V10"/>
                <path d="M18 20v-4"/>
                <path d="M6 20v-6"/>
                <circle cx="12" cy="6" r="2"/>
                <path d="M8.5 3.5a5 5 0 0 1 7 0"/>
                <path d="M5.5 1a9 9 0 0 1 13 0"/>
                <path d="M2 12c0-3 1.5-5.5 4-7"/>
                <path d="M22 12c0-3-1.5-5.5-4-7"/>
            </svg>`,
            description: 'Internet Rural vía Radio es la solución ideal para quienes están en áreas donde la fibra óptica aún no ha llegado. Utilizamos tecnología de radio de alto rendimiento que ofrece conectividad de calidad a granjas, haciendas, fincas y regiones remotas. Nuestra red de radio es robusta y cubre gran parte de nuestra área de servicio, incluyendo dentro de las ciudades, proporcionando una alternativa confiable a la fibra.',
            benefits: [
                'Cobertura en áreas rurales, granjas, haciendas y fincas',
                'Tecnología de radio de alta frecuencia y baja latencia',
                'Instalación rápida sin infraestructura de cables',
                'Conexión estable incluso en terrenos irregulares',
                'Equipos resistentes a las condiciones climáticas',
                'Soporte técnico especializado para soluciones de radio',
                'Planes flexibles y personalizables',
                'Alternativa viable donde la fibra no es posible'
            ],
            useCases: [
                'Granjas y propiedades rurales',
                'Haciendas y fincas de campo',
                'Agronegocios y cooperativas',
                'Áreas urbanas sin cobertura de fibra',
                'Comunidades y distritos remotos',
                'Empresas en regiones remotas',
                'Monitoreo agrícola e IoT rural',
                'Redundancia para enlaces de fibra óptica'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=¡Hola! Estoy interesado en Internet Rural vía Radio y me gustaría obtener más información.'
        }
    };
    
    // Elementos DOM
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
        
        // Event listeners para cerrar modal
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        // Cerrar con ESC
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
        
        // Llenar contenido
        modalTitle.textContent = product.title;
        modalIcon.innerHTML = product.icon;
        modalDescription.textContent = product.description;
        
        // Beneficios
        modalBenefits.innerHTML = product.benefits.map(b => `<li>${b}</li>`).join('');
        
        // Casos de uso
        modalCases.innerHTML = product.useCases.map(c => `<li>${c}</li>`).join('');
        
        // Enlace de WhatsApp
        modalWhatsapp.href = product.whatsapp;
        
        // Abrir modal
        openModal();
    }
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animación de entrada
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
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
