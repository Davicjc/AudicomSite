/**
 * ============================================
 * AUDICOM TELECOM - Mapa de Cobertura (Español)
 * ============================================
 * 
 * Mapa interactivo que muestra las ciudades cubiertas
 * por la red de Audicom Telecom.
 * 
 * Utiliza Leaflet.js (código abierto) con tiles de OpenStreetMap
 */

(function() {
    'use strict';

    // ============================================
    // CIUDADES CON COBERTURA (coordenadas)
    // ============================================
    const CIDADES = [
        {
            nome: 'Igarapava',
            id: 'igarapava',
            lat: -20.0417952,
            lng: -47.7644634,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Uberaba',
            id: 'uberaba',
            lat: -19.7533377,
            lng: -47.9907325,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Uberlândia',
            id: 'uberlandia',
            lat: -18.9145008,
            lng: -48.2401006,
            principal: true,  // Sede de la empresa
            descricao: 'Sede central - Cobertura completa'
        },
        {
            nome: 'Tapuirama',
            id: 'tapuirama',
            lat: -19.1446483,
            lng: -47.9354456,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Martinésia',
            id: 'martineza',
            lat: -18.7474385,
            lng: -48.4217583,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Cruzeiro dos Peixotos',
            id: 'cruzeirodospeixotos',
            lat: -18.7294246,
            lng: -48.3698932,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Tupaciguara',
            id: 'tupaciguara',
            lat: -18.5987669,
            lng: -48.6941603,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Araguari',
            id: 'araguari',
            lat: -18.6458792,
            lng: -48.1982406,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Indianópolis',
            id: 'indianopolis',
            lat: -19.0379526,
            lng: -47.9177702,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Delta',
            id: 'delta',
            lat: -19.9728552,
            lng: -47.7762221,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'Cristalina',
            id: 'cristalina',
            lat: -16.7672778,
            lng: -47.6090289,
            principal: false,
            descricao: 'Cobertura completa'
        },
        {
            nome: 'São Paulo',
            id: 'saopaulo',
            lat: -23.5494593,
            lng: -46.6279256,
            principal: false,
            descricao: 'Cobertura completa'
        }
    ];

    // ============================================
    // CONFIGURACIÓN DEL MAPA
    // ============================================
    const CONFIG = {
        // Centro del mapa (promedio de las ciudades)
        centerLat: -18.9,
        centerLng: -48.5,
        zoom: 8,
        minZoom: 5,
        maxZoom: 15
    };

    // ============================================
    // INICIALIZACIÓN
    // ============================================
    let mapa = null;
    let markers = [];

    function init() {
        const container = document.getElementById('mapa-cobertura');
        if (!container) return;

        // Crear mapa con Leaflet
        mapa = L.map('mapa-cobertura', {
            center: [CONFIG.centerLat, CONFIG.centerLng],
            zoom: CONFIG.zoom,
            minZoom: CONFIG.minZoom,
            maxZoom: CONFIG.maxZoom,
            scrollWheelZoom: false,  // Deshabilitar zoom con scroll
            zoomControl: true
        });

        // Esri WorldGrayCanvas (gris claro, gratuito)
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; Esri, HERE, Garmin, FAO, NOAA, USGS',
            maxZoom: 16
        }).addTo(mapa);

        // Capa de etiquetas Esri
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16
        }).addTo(mapa);

        // Agregar marcadores de ciudades
        adicionarMarcadores();

        // Eventos de hover en la lista de ciudades
        configurarHoverCidades();

        console.log('Mapa de Cobertura: Inicializado');
    }

    // ============================================
    // AGREGAR MARCADORES AL MAPA
    // ============================================
    function adicionarMarcadores() {
        CIDADES.forEach(cidade => {
            // Icono personalizado
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

            // Crear marcador (sin popup)
            const marker = L.marker([cidade.lat, cidade.lng], { icon: icone })
                .addTo(mapa);

            // Almacenar referencia
            marker.cidadeId = cidade.id;
            markers.push(marker);
        });

        // Ajustar límites para mostrar todas las ciudades
        const bounds = L.latLngBounds(CIDADES.map(c => [c.lat, c.lng]));
        mapa.fitBounds(bounds, { padding: [50, 50] });
    }

    // ============================================
    // HOVER EN LA LISTA DE CIUDADES
    // ============================================
    function configurarHoverCidades() {
        const itens = document.querySelectorAll('.city-item[data-cidade]');
        
        itens.forEach(item => {
            const cidadeId = item.getAttribute('data-cidade');
            
            // Botón "General" - vuelve al zoom original
            if (cidadeId === 'geral') {
                item.addEventListener('click', () => {
                    // Desplazamiento suave al mapa
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
                // Hover - solo resaltado visual
                item.addEventListener('mouseenter', () => {
                    item.classList.add('active');
                });
                
                item.addEventListener('mouseleave', () => {
                    item.classList.remove('active');
                });
                
                // Clic - centrar ciudad en el mapa
                item.addEventListener('click', () => {
                    // Desplazamiento suave al mapa
                    scrollToMapa();
                    
                    // Recalcular tamaño del mapa para asegurar centrado correcto
                    mapa.invalidateSize();
                    
                    // Zoom específico para Tapuirama, Martinésia y Cruzeiro dos Peixotos (más cercano)
                    const zoomLevel = (cidadeId === 'tapuirama' || cidadeId === 'martineza' || cidadeId === 'cruzeirodospeixotos') ? 15 : 12;
                    
                    // Usar flyTo para centrar suavemente
                    mapa.flyTo(marker.getLatLng(), zoomLevel, { 
                        animate: true,
                        duration: 0.5
                    });
                });
            }
        });
    }

    // ============================================
    // DESPLAZAMIENTO SUAVE AL MAPA
    // ============================================
    function scrollToMapa() {
        const mapaElement = document.getElementById('mapa-cobertura');
        if (!mapaElement) return;
        
        // Usar getBoundingClientRect para posicionamiento preciso
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
    // EJECUTAR CUANDO EL DOM ESTÉ LISTO
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
