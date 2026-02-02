/**
 * ============================================
 * AUDICOM TELECOM - Coverage Map (English)
 * ============================================
 * 
 * Interactive map showing cities covered
 * by Audicom Telecom's network.
 * 
 * Uses Leaflet.js (open source) with OpenStreetMap tiles
 */

(function() {
    'use strict';

    // ============================================
    // CITIES COVERED (coordinates)
    // ============================================
    const CIDADES = [
        {
            nome: 'Igarapava',
            id: 'igarapava',
            lat: -20.0417952,
            lng: -47.7644634,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Uberaba',
            id: 'uberaba',
            lat: -19.7533377,
            lng: -47.9907325,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Uberlândia',
            id: 'uberlandia',
            lat: -18.9145008,
            lng: -48.2401006,
            principal: true,  // Company headquarters
            descricao: 'Headquarters – Full coverage'
        },
        {
            nome: 'Tapuirama',
            id: 'tapuirama',
            lat: -19.1446483,
            lng: -47.9354456,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Martinésia',
            id: 'martineza',
            lat: -18.7474385,
            lng: -48.4217583,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Cruzeiro dos Peixotos',
            id: 'cruzeirodospeixotos',
            lat: -18.7294246,
            lng: -48.3698932,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Tupaciguara',
            id: 'tupaciguara',
            lat: -18.5987669,
            lng: -48.6941603,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Araguari',
            id: 'araguari',
            lat: -18.6458792,
            lng: -48.1982406,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Indianópolis',
            id: 'indianopolis',
            lat: -19.0379526,
            lng: -47.9177702,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Delta',
            id: 'delta',
            lat: -19.9728552,
            lng: -47.7762221,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'Cristalina',
            id: 'cristalina',
            lat: -16.7672778,
            lng: -47.6090289,
            principal: false,
            descricao: 'Full coverage available'
        },
        {
            nome: 'São Paulo',
            id: 'saopaulo',
            lat: -23.5494593,
            lng: -46.6279256,
            principal: false,
            descricao: 'Full coverage available'
        }
    ];

    // ============================================
    // MAP CONFIGURATION
    // ============================================
    const CONFIG = {
        // Map center (average of cities)
        centerLat: -18.9,
        centerLng: -48.5,
        zoom: 8,
        minZoom: 5,
        maxZoom: 15
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    let mapa = null;
    let markers = [];

    function init() {
        const container = document.getElementById('mapa-cobertura');
        if (!container) return;

        // Create map with Leaflet
        mapa = L.map('mapa-cobertura', {
            center: [CONFIG.centerLat, CONFIG.centerLng],
            zoom: CONFIG.zoom,
            minZoom: CONFIG.minZoom,
            maxZoom: CONFIG.maxZoom,
            scrollWheelZoom: false,  // Disable scroll zoom
            zoomControl: true
        });

        // Esri WorldGrayCanvas (light gray, free)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri, HERE, Garmin, FAO, NOAA, USGS',
            maxZoom: 16
        }).addTo(mapa);

        // Esri labels overlay
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16
        }).addTo(mapa);

        // Add city markers
        adicionarMarcadores();

        // Hover events on city list
        configurarHoverCidades();

        console.log('Coverage Map: Initialized');
    }

    // ============================================
    // ADD MARKERS TO MAP
    // ============================================
    function adicionarMarcadores() {
        CIDADES.forEach(cidade => {
            // Custom icon
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

            // Create marker (no popup)
            const marker = L.marker([cidade.lat, cidade.lng], { icon: icone })
                .addTo(mapa);

            // Store reference
            marker.cidadeId = cidade.id;
            markers.push(marker);
        });

        // Adjust bounds to show all cities
        const bounds = L.latLngBounds(CIDADES.map(c => [c.lat, c.lng]));
        mapa.fitBounds(bounds, { padding: [50, 50] });
    }

    // ============================================
    // HOVER ON CITY LIST
    // ============================================
    function configurarHoverCidades() {
        const itens = document.querySelectorAll('.city-item[data-cidade]');
        
        itens.forEach(item => {
            const cidadeId = item.getAttribute('data-cidade');
            
            // "General" button - returns to original zoom
            if (cidadeId === 'geral') {
                item.addEventListener('click', () => {
                    // Smooth scroll to map
                    scrollToMapa();
                    
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
                // Hover - visual highlight only
                item.addEventListener('mouseenter', () => {
                    item.classList.add('active');
                });
                
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                });
                
                // Click - center city on map
                item.addEventListener('click', () => {
                    // Smooth scroll to map
                    scrollToMapa();
                    
                    // Recalculate map size to ensure correct centering
                    mapa.invalidateSize();
                    
                    // Specific zoom for Tapuirama, Martinésia and Cruzeiro dos Peixotos (closer)
                    const zoomLevel = (cidadeId === 'tapuirama' || cidadeId === 'martineza' || cidadeId === 'cruzeirodospeixotos') ? 15 : 12;
                    
                    // Use flyTo to smoothly center
                    mapa.flyTo(marker.getLatLng(), zoomLevel, { 
                        animate: true,
                        duration: 0.5
                    });
                });
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL TO MAP
    // ============================================
    function scrollToMapa() {
        const mapaElement = document.getElementById('mapa-cobertura');
        if (!mapaElement) return;
        
        // Use getBoundingClientRect for precise positioning
        const rect = mapaElement.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - 100;
        const startY = window.scrollY;
        const difference = targetY - startY;
        const duration = 800;
        const startTime = performance.now();
        
        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + difference * easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }

    // ============================================
    // EXECUTE WHEN DOM IS READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
