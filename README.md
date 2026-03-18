# 🌐 Audicom Telecom - Site Institucional

![Audicom Telecom](assets/biglogo.webp)

## 📋 Sobre o Projeto

Site institucional da **Audicom Telecom**, provedor de internet fibra óptica empresarial em Uberlândia e região do Triângulo Mineiro, Minas Gerais, Brasil.

### 🏢 Sobre a Audicom

A Audicom Telecom é uma empresa de telecomunicações fundada em **2001**, especializada em soluções de conectividade empresarial. Com infraestrutura própria e compromisso inabalável com a qualidade, atendemos empresas de todos os portes com:

- **Link de Internet Corporativo** - Conexão dedicada com banda garantida
- **Link Lan to Lan (MPLS)** - Interconexão privada entre matriz e filiais
- **Internet Rural** - Conectividade via rádio onde a fibra não chega
- **Link Temporário** - Soluções para eventos e necessidades pontuais

---

## 🚀 Tecnologias Utilizadas

O site foi desenvolvido priorizando **código local** e performance, minimizando dependências externas:

### Frontend
- **HTML5** semântico com Schema.org (JSON-LD)
- **CSS3** puro com variáveis CSS
- **JavaScript** vanilla (sem frameworks)
- **WebGL** para efeitos visuais de fundo

### Efeitos Visuais (100% código próprio)
- `fiber-canvas.js` - Teia de conexões animada
- `orb.js` - Esfera fluida WebGL
- `floating-lines.js` - Ondas animadas
- `ripple-grid.js` - Grade com ondas interativas
- `fiber-trail.js` - Rastro de fibra no mouse
- `electric-border.js` - Bordas elétricas animadas

### Internacionalização
- 🇧🇷 Português (BR) - `index.html`
- 🇺🇸 Inglês - `en.html`
- 🇪🇸 Espanhol - `es.html`

---

## 📁 Estrutura do Projeto

```
AudicomSite/
├── index.html              # Página principal (PT-BR)
├── en.html                 # Versão em inglês
├── es.html                 # Versão em espanhol
├── robots.txt              # Configurações para crawlers
├── sitemap.xml             # Mapa do site para SEO
│
├── assets/                 # Recursos estáticos
│   ├── logos/              # Logotipos
│   ├── flags/              # Bandeiras dos idiomas
│   └── depoimentos/        # Imagens de depoimentos
│
├── background/             # Efeitos visuais WebGL
│   ├── fiber-canvas.js     # Teia de conexões
│   ├── orb.js              # Esfera fluida
│   ├── floating-lines.js   # Ondas animadas
│   └── ripple-grid.js      # Grade com ripples
│
├── css/
│   └── style.css           # Estilos principais
│
└── js/
    ├── onoff.js            # Configurações ON/OFF do site
    ├── pt/                 # Scripts em português
    ├── en/                 # Scripts em inglês
    ├── es/                 # Scripts em espanhol
    └── outros/             # Scripts compartilhados
```

---

## 🎨 Identidade Visual

### Paleta de Cores
| Nome | Hex | Uso |
|------|-----|-----|
| Azul Conexão | `#00249C` | Destaque, hover, accent |
| Azul Estrutura | `#081535` | Fundo principal |
| Cinza Operacional | `#8F99A8` | Textos secundários |
| Grafite Infra | `#2A2F36` | Elementos de fundo |
| Branco Técnico | `#F4F6F9` | Textos principais |

### Tipografia
- **Títulos**: Space Grotesk (Semibold 600)
- **Textos**: Inter (Regular 400)
- **Logo "Audicom"**: Poppins (Bold 700)
- **Logo "Telecom"**: Montserrat (Semibold 600)

---

## ⚙️ Sistema de Configuração

O arquivo `js/onoff.js` permite ativar/desativar recursos do site sem alterar código:

```javascript
const SiteConfig = {
    // Efeitos visuais
    fiberTrail: true,           // Rastro de fibra no mouse
    electricBorder: true,       // Bordas elétricas
    fiberCanvas: true,          // Teia de conexões
    orb: true,                  // Esfera fluida
    floatingLines: false,       // Ondas animadas
    rippleGrid: false,          // Grade com ripples
    // ... e muito mais
};
```

---

## 📍 Área de Cobertura

- Uberlândia - MG
- Triângulo Mineiro
- Alto Paranaíba
- Áreas rurais (via tecnologia de rádio)

---

## 📞 Contato

- **WhatsApp**: [(34) 9133-9002](https://api.whatsapp.com/send?phone=553491339002)
- **Website**: [audicom.com.br](https://audicom.com.br)
- **Central do Cliente**: [central.audicom.hubsoft.com.br](https://central.audicom.hubsoft.com.br/)

### Redes Sociais
- [Facebook](https://www.facebook.com/audicomtelecom)
- [Instagram](https://www.instagram.com/audicomtelecom)
- [LinkedIn](https://www.linkedin.com/company/audicomtelecom)

---

## ⚖️ Direitos Autorais e Licença

### © 2024-2026 Audicom Telecom - Todos os direitos reservados.

Este repositório contém o código-fonte do site institucional da **Audicom Telecom**.

### ⚠️ AVISO IMPORTANTE

Este projeto é **proprietário** e **confidencial**. O código, design, textos, imagens, logotipos e todos os outros materiais contidos neste repositório são de propriedade exclusiva da **Audicom Telecom**.

#### Restrições:

- ❌ **PROIBIDO** copiar, modificar, distribuir ou usar qualquer parte deste código sem autorização expressa por escrito da Audicom Telecom
- ❌ **PROIBIDO** usar a marca, logotipos ou identidade visual da Audicom Telecom
- ❌ **PROIBIDO** criar trabalhos derivados baseados neste projeto
- ❌ **PROIBIDO** usar este código para fins comerciais ou não comerciais sem permissão
- ❌ **PROIBIDO** remover ou alterar avisos de direitos autorais

#### Marcas Registradas:

- **Audicom®** é marca registrada da Audicom Telecom
- **Audicom Telecom®** é marca registrada da Audicom Telecom
- Todas as outras marcas mencionadas pertencem aos seus respectivos proprietários

#### Proteção Legal:

Este projeto está protegido pela Lei de Direitos Autorais (Lei nº 9.610/98) e demais leis de propriedade intelectual brasileiras e internacionais. Qualquer uso não autorizado pode resultar em ações legais civis e criminais.

### Contato para Licenciamento

Para solicitar permissão de uso ou licenciamento, entre em contato:
- **WhatsApp**: (34) 9133-9002
- **Website**: [audicom.com.br](https://audicom.com.br)

---

## 🛠️ Desenvolvimento

Este site foi desenvolvido exclusivamente para a Audicom Telecom, seguindo as diretrizes do documento de instruções em `.github/instructions/instrucoes.instructions.md`.

### Princípios de Desenvolvimento:
1. **Código local primeiro** - Minimizar dependências externas
2. **Performance** - WebGL puro ao invés de bibliotecas pesadas
3. **Configurabilidade** - Sistema ON/OFF para todos os recursos
4. **Transparência** - Fundos que permitem visualização dos efeitos
5. **Responsividade** - Design adaptável para todos os dispositivos

---

<div align="center">

**Audicom Telecom** - *Compromisso inabalável com a qualidade*

Desde 2001 conectando empresas no Triângulo Mineiro

</div>
