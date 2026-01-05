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
    
    // ============================================
    // ADICIONE NOVOS CLIENTES ABAIXO
    // ============================================
    
    // Exemplo:
    // '11.png': 'Nome da Empresa',
    // '12.jpg': 'Outro Cliente',
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
