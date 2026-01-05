/**
 * ============================================
 * AUDICOM TELECOM - Mapa de Cobertura
 * ============================================
 * 
 * Mapa interativo mostrando as cidades atendidas
 * pela rede da Audicom Telecom.
 * 
 * Usa Leaflet.js (open source) com tiles do OpenStreetMap
 */

(function() {
    'use strict';

    // ============================================
    // CIDADES ATENDIDAS (coordenadas)
    // ============================================
    const CIDADES = [
        {
            nome: 'Uberaba',
            id: 'uberaba',
            lat: -19.7472,
            lng: -47.9318,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Uberlândia',
            id: 'uberlandia',
            lat: -18.9186,
            lng: -48.2772,
            principal: true,  // Sede da empresa
            descricao: 'Sede - Cobertura total'
        },
        {
            nome: 'Tapuirama',
            id: 'tapuirama',
            lat: -19.3219,
            lng: -49.3881,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Martinésia',
            id: 'martineza',
            lat: -18.8083,
            lng: -48.7389,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Cruzeiro dos Peixotos',
            id: 'cruzeirodospeixotos',
            lat: -19.4306,
            lng: -48.3711,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Tupaciguara',
            id: 'tupaciguara',
            lat: -18.5931,
            lng: -48.7050,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Araguari',
            id: 'araguari',
            lat: -18.6486,
            lng: -48.1936,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Indianópolis',
            id: 'indianopolis',
            lat: -18.9822,
            lng: -47.9186,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Delta',
            id: 'delta',
            lat: -19.9833,
            lng: -47.7667,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Cristalina',
            id: 'cristalina',
            lat: -16.7694,
            lng: -47.6133,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'São Paulo',
            id: 'saopaulo',
            lat: -23.571931261574285,
            lng: -46.66651968465904,
            principal: false,
            descricao: 'Cobertura completa'
        }
    ];

    // ============================================
    // CONFIGURAÇÕES DO MAPA
    // ============================================
    const CONFIG = {
        // Centro do mapa (média das cidades)
        centerLat: -18.9,
        centerLng: -48.5,
        zoom: 8,
        minZoom: 7,
        maxZoom: 15
    };

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    let mapa = null;
    let markers = [];

    function init() {
        const container = document.getElementById('mapa-cobertura');
        if (!container) return;

        // Criar mapa com Leaflet
        mapa = L.map('mapa-cobertura', {
            center: [CONFIG.centerLat, CONFIG.centerLng],
            zoom: CONFIG.zoom,
            minZoom: CONFIG.minZoom,
            maxZoom: CONFIG.maxZoom,
            scrollWheelZoom: false,  // Desabilita zoom com scroll
            zoomControl: true
        });

        // Tiles de satélite (imagem real)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri, Maxar, Earthstar Geographics',
            maxZoom: 19
        }).addTo(mapa);

        // Adicionar marcadores das cidades
        adicionarMarcadores();

        // Eventos de hover nas cidades da lista
        configurarHoverCidades();

        console.log('Mapa de Cobertura: Inicializado');
    }

    // ============================================
    // ADICIONAR MARCADORES NO MAPA
    // ============================================
    function adicionarMarcadores() {
        CIDADES.forEach(cidade => {
            // Ícone customizado
            const icone = L.divIcon({
                className: 'marcador-cidade' + (cidade.principal ? ' principal' : ''),
                html: `<div class="marcador-pin">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                    </svg>
                </div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            // Criar marcador
            const marker = L.marker([cidade.lat, cidade.lng], { icon: icone })
                .addTo(mapa)
                .bindPopup(`
                    <div class="popup-cidade">
                        <strong>${cidade.nome}</strong>
                        <span>${cidade.descricao}</span>
                    </div>
                `);

            // Guardar referência
            marker.cidadeId = cidade.id;
            markers.push(marker);
        });

        // Ajustar bounds para mostrar todas as cidades
        const bounds = L.latLngBounds(CIDADES.map(c => [c.lat, c.lng]));
        mapa.fitBounds(bounds, { padding: [50, 50] });
    }

    // ============================================
    // HOVER NAS CIDADES DA LISTA
    // ============================================
    function configurarHoverCidades() {
        const itens = document.querySelectorAll('.city-item[data-cidade]');
        
        itens.forEach(item => {
            const cidadeId = item.getAttribute('data-cidade');
            
            // Botão "Geral" - volta ao zoom original
            if (cidadeId === 'geral') {
                item.addEventListener('click', () => {
                    mapa.invalidateSize();
                    const bounds = L.latLngBounds(CIDADES.map(c => [c.lat, c.lng]));
                    mapa.flyToBounds(bounds, { 
                        padding: [50, 50],
                        animate: true,
                        duration: 0.8
                    });
                });
                return;
            }
            
            const marker = markers.find(m => m.cidadeId === cidadeId);
            
            if (marker) {
                // Hover - apenas destaca visualmente
                item.addEventListener('mouseenter', () => {
                    item.classList.add('active');
                });
                
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                });
                
                // Click - centraliza cidade no mapa
                item.addEventListener('click', () => {
                    // Recalcula tamanho do mapa para garantir centralização correta
                    mapa.invalidateSize();
                    // Usa flyTo para centralizar suavemente
                    mapa.flyTo(marker.getLatLng(), 12, { 
                        animate: true,
                        duration: 0.5
                    });
                    // Abre popup após animação
                    setTimeout(() => {
                        marker.openPopup();
                    }, 500);
                });
            }
        });
    }

    // ============================================
    // EXECUTAR QUANDO DOM ESTIVER PRONTO
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
