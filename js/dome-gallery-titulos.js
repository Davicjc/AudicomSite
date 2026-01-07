/**
 * Títulos das imagens do DomeGallery
 * Arquivo: dome-gallery-titulos.js
 * 
 * Formato: 'nome-do-arquivo': 'Título que aparece ao clicar'
 * 
 * Para adicionar uma nova imagem:
 * 1. Coloque a imagem na pasta assets/logos/
 * 2. Adicione o mapeamento abaixo seguindo o padrão
 */

const DomeGalleryTitulos = {
    // ============================================
    // MAPEAMENTO DE IMAGENS E TÍTULOS
    // ============================================
    
    // Formato: 'nome-do-arquivo.extensao': 'Título/Nome do Cliente'
    
    '1.jpg': 'SUPPORTE',
    '2.png': 'CALLINK',
    '3.png': 'KIBON',
    '4.png': 'BRASMIX',
    '5.jpg': 'MERCURE HOTEL',
    '6.jpg': 'EDGEUNO',
    '7.png': 'DECIO',
    '8.webp': 'BR.DIGITAL',
    '9.png': 'ECOVIAS',
    '10.jpg': 'BESTWAY',
    '11.jpg': 'POLITIZ',
    '12.png': 'STARS',
    '13.jpg': 'GLOBAL TRANSPORTES',
    '14.jpg': 'BAND',
    '15.jpg': 'VITORIOSA',
    '16.jpg': 'BOM JESUS',
    '17.png': 'MERCADO LIVRE',
    '18.png': 'OBRAMAX',
    '19.jpg': 'ITV URBANISMO',
    '20.png': 'GIGA+',
    '21.png': 'EPS',

    
    // ============================================
    // ADICIONE NOVOS CLIENTES ABAIXO
    // ============================================
    
    // Exemplo:
    // '22.png': 'Nome da Empresa',
    // '23.jpg': 'Outro Cliente',
};

/**
 * Função para obter o título de uma imagem
 * @param {string} src - Caminho completo ou nome do arquivo
 * @returns {string} - Título da imagem ou nome do arquivo se não encontrado
 */
function getDomeGalleryTitulo(src) {
    // Extrair apenas o nome do arquivo do caminho
    const fileName = src.split('/').pop();
    
    // Retornar o título mapeado ou o nome do arquivo sem extensão
    if (DomeGalleryTitulos[fileName]) {
        return DomeGalleryTitulos[fileName];
    }
    
    // Se não encontrar, retornar nome do arquivo sem extensão
    return fileName.replace(/\.[^/.]+$/, '');
}
