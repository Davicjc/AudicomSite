/**
 * ============================================
 * PRODUCT MODAL - Product details popup (English)
 * ============================================
 */

(function() {
    'use strict';
    
    // Product data
    const productsData = {
        corporativo: {
            title: 'Business Internet Link',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>`,
            description: 'Our Business Internet Link delivers dedicated connectivity built for companies that demand high performance, rock-solid stability, and security for their online operations. Unlike shared internet, you get 100% guaranteed bandwidth—the speed you pay for is the speed you get.',
            benefits: [
                'Guaranteed bandwidth—no sharing, no slowdowns',
                'Static IP for remote access and hosting',
                'SLA-backed uptime guarantee',
                'Proactive 24/7 monitoring',
                'Direct access to our NOC support team',
                'Low latency for video calls and VoIP',
                'Priority response for any issues'
            ],
            useCases: [
                'Companies running cloud systems (ERP, CRM)',
                'Offices with heavy video conferencing',
                'Businesses with mission-critical online operations',
                'Organizations hosting internal servers',
                'Retail stores with multiple POS terminals'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Hi! I\'m interested in the Business Internet Link and would like more info.'
        },
        mpls: {
            title: 'LAN-to-LAN Link | MPLS',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="3" width="6" height="6" rx="1"/>
                <rect x="16" y="3" width="6" height="6" rx="1"/>
                <rect x="2" y="15" width="6" height="6" rx="1"/>
                <rect x="16" y="15" width="6" height="6" rx="1"/>
                <path d="M8 6h8M8 18h8M5 9v6M19 9v6"/>
            </svg>`,
            description: 'Our LAN-to-LAN Link creates a secure private network connecting all your business locations. Perfect for companies with branches, remote offices, or anyone who needs multiple sites working as one unified corporate network.',
            benefits: [
                'Private network exclusively for your locations',
                'Secure communication—never touches the public internet',
                'Ultra-low latency for real-time apps',
                'Built-in redundancy for high availability',
                'QoS traffic prioritization',
                'Easy to add new locations as you grow',
                'Centralized network management'
            ],
            useCases: [
                'Retail chains and franchises',
                'Companies with HQ and branch offices',
                'Financial institutions',
                'Healthcare networks with multiple facilities',
                'Manufacturing with plants in different cities',
                'Any business sharing data across locations'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Hi! I\'m interested in the LAN-to-LAN / MPLS Link and would like more info.'
        },
        eventos: {
            title: 'Event Connectivity',
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M8 2v4M16 2v4"/>
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M3 10h18"/>
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>`,
            description: 'Event Connectivity delivers high-capacity temporary internet designed to keep events of any size running smoothly. We handle everything—fast setup, on-site support, and flexible contracts that fit your schedule.',
            benefits: [
                'Quick on-site installation',
                'High bandwidth for hundreds of simultaneous users',
                'Dedicated tech support throughout your event',
                'Stable connection even under heavy load',
                'Flexible contracts (days or weeks)',
                'Corporate Wi-Fi with access controls',
                'Backup connection for extra peace of mind'
            ],
            useCases: [
                'Trade shows and exhibitions',
                'Conferences and conventions',
                'Concerts and festivals',
                'Corporate events',
                'Live streaming broadcasts',
                'Weddings and private parties',
                'Sporting events'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Hi! I\'m interested in Event Connectivity and would like more info.'
        },
        rural: {
            title: 'Rural Internet | Wireless',
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
            description: 'Rural Internet brings reliable connectivity to areas where fiber hasn\'t arrived yet. Our high-performance wireless technology reaches farms, ranches, estates, and remote areas—plus it works as a solid backup option in urban zones where fiber isn\'t available.',
            benefits: [
                'Coverage for farms, ranches, and rural properties',
                'High-frequency, low-latency wireless tech',
                'Fast installation—no cables needed',
                'Stable connection on any terrain',
                'Weather-resistant equipment',
                'Specialized rural tech support',
                'Flexible, customizable plans',
                'Great backup option when fiber isn\'t possible'
            ],
            useCases: [
                'Farms and agricultural properties',
                'Ranches and country estates',
                'Agribusiness and co-ops',
                'Urban areas without fiber coverage',
                'Remote communities',
                'Businesses in hard-to-reach locations',
                'Agricultural monitoring and IoT',
                'Fiber backup and redundancy'
            ],
            whatsapp: 'https://api.whatsapp.com/send?phone=553491339002&text=Hi! I\'m interested in Rural Internet and would like more info.'
        }
    };
    
    // DOM elements
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
        
        // Event listeners to open modal
        const buttons = document.querySelectorAll('.btn-ver-mais');
        buttons.forEach(btn => {
            btn.addEventListener('click', handleOpenModal);
        });
        
        // Event listeners to close modal
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
        
        // Close with ESC
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
        
        // Fill content
        modalTitle.textContent = product.title;
        modalIcon.innerHTML = product.icon;
        modalDescription.textContent = product.description;
        
        // Benefits
        modalBenefits.innerHTML = product.benefits.map(b => `<li>${b}</li>`).join('');
        
        // Use cases
        modalCases.innerHTML = product.useCases.map(c => `<li>${c}</li>`).join('');
        
        // WhatsApp link
        modalWhatsapp.href = product.whatsapp;
        
        // Open modal
        openModal();
    }
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Entry animation
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
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
