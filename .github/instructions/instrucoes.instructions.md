---
applyTo: '**/*'
---

# Instruções do Projeto AudicomSite

## Regra de Dependências - CÓDIGO LOCAL
**SEMPRE** priorizar código local. Evitar ao máximo dependências externas (CDNs, bibliotecas de terceiros).

### Ordem de Prioridade:
1. **Código próprio** - Escrever do zero usando JavaScript/CSS/WebGL puros
2. **Código adaptado** - Converter bibliotecas React/Vue para vanilla JS
3. **Arquivo local** - Se precisar de lib, baixar e colocar na pasta `/libs/`
4. **CDN (último recurso)** - Apenas para libs muito complexas (ex: GSAP)

### Bibliotecas Permitidas via CDN:
- **GSAP** - Animações complexas (muito grande para manter local)
- **ScrollToPlugin** - Plugin do GSAP

### Regras:
- ❌ **NUNCA** usar CDN para efeitos visuais simples (WebGL, Canvas, CSS)
- ❌ **NUNCA** depender de APIs externas que podem ficar offline
- ✅ **SEMPRE** converter componentes React/Vue para vanilla JS
- ✅ **SEMPRE** usar WebGL puro ao invés de Three.js/OGL para efeitos simples
- ✅ **SEMPRE** testar se o site funciona offline (exceto fontes Google)

### Estrutura de Pastas para Libs Locais:
```
/libs/
    gsap.min.js          (se decidir baixar)
    outra-lib.min.js
```

---

## Regra de Configuração ON/OFF
Sempre que adicionar algo novo na página (ícones, animações, componentes, seções, etc.), **DEVE** adicionar uma opção correspondente no arquivo `js/onoff.js` para poder ativar ou desativar.

### Estrutura Obrigatória do onoff.js

O arquivo `js/onoff.js` deve seguir **SEMPRE** este padrão para evitar bugs:

```javascript
const SiteConfig = {
    
    // ============================================
    // NOME DA SEÇÃO EM MAIÚSCULO
    // ============================================
    
    // ---- NOME DO RECURSO (descrição curta) ----
    nomeRecurso: true,
        // Subfunções do Nome Recurso:
        nomeRecursoOpcao1: valor,       // Comentário explicativo
        nomeRecursoOpcao2: valor,       // Comentário explicativo
    
    // ---- PRÓXIMO RECURSO ----
    outroRecurso: false,
        outroRecursoSubfuncao: valor,
```

### Regras de Organização:

1. **Separadores de Seção**: Usar `// ============================================`
2. **Separadores de Recurso**: Usar `// ---- NOME (descrição) ----`
3. **Função Principal**: Nome em camelCase, boolean (true/false)
4. **Subfunções**: Sempre indentadas com 4 espaços extras, prefixo igual à função principal
5. **Comentários**: Toda linha deve ter comentário explicativo à direita
6. **Ordem**: Manter agrupados por seção lógica (Backgrounds, Menu, Hero, etc.)
7. **Nomenclatura de Subfunções**: `nomePrincipal` + `NomeDaSubfuncao`
   - Exemplo: `floatingLines` → `floatingLinesTopWave`, `floatingLinesSpeed`

### Padrão para Scripts que Leem Configurações:

```javascript
// No início do script, ler do SiteConfig
const SC = typeof SiteConfig !== 'undefined' ? SiteConfig : {};
const CONFIG = {
    opcao1: SC.nomeRecursoOpcao1 || valorPadrao,
    opcao2: SC.nomeRecursoOpcao2 || valorPadrao
};
```

### Exemplo Completo de Recurso com Subfunções:

```javascript
// ---- FLOATING LINES (ondas animadas WebGL) ----
floatingLines: false,
    // Subfunções do Floating Lines:
    floatingLinesTopWave: true,          // Onda superior
    floatingLinesMiddleWave: true,       // Onda do meio
    floatingLinesBottomWave: true,       // Onda inferior
    floatingLinesLineCount: 4,           // Quantidade de linhas por onda
    floatingLinesAnimationSpeed: 1.5,    // Velocidade da animação
```

---

## Regra de Backgrounds e Fundos
O site possui um fundo animado contínuo (fiber-canvas, orb, floating-lines, etc.) que deve ser visível em TODAS as seções. **NUNCA** adicionar backgrounds sólidos que cubram o fundo principal.

### Regras Obrigatórias:

1. **Seções da Página**:
   - ✅ **SEMPRE** usar `background: transparent;` em seções (`.planos`, `.sobre`, `.insights`, `.cobertura`, etc.)
   - ❌ **NUNCA** usar `background-color: var(--bg-primary)` ou similar em seções
   - ❌ **NUNCA** usar gradientes sólidos que cubram todo o fundo

2. **Cards e Componentes**:
   - ✅ **PODE** usar backgrounds semi-transparentes em cards individuais (ex: `rgba(10, 26, 58, 0.6)`)
   - ✅ **PODE** usar `backdrop-filter: blur()` para efeito glassmorphism
   - Os cards devem permitir que o fundo animado "respire" através deles

3. **Efeitos WebGL (pasta /background)**:
   - ✅ **SEMPRE** usar `alpha: true` no contexto WebGL
   - ✅ **SEMPRE** usar `gl.clearColor(0, 0, 0, 0)` para fundo transparente
   - ✅ **SEMPRE** habilitar blending: `gl.enable(gl.BLEND)`
   - ❌ **NUNCA** usar `gl_FragColor = vec4(col, 1.0)` com alpha fixo opaco
   - ✅ **SEMPRE** calcular alpha baseado na intensidade do efeito

4. **Container de Efeitos**:
   - ❌ **NUNCA** usar `mix-blend-mode` que altere cores do fundo
   - ✅ **SEMPRE** usar `pointer-events: none` para não bloquear cliques
   - ✅ Usar `z-index` apropriado (0 ou 1 para fundos, maior para conteúdo)

### Exemplo de Shader com Transparência Correta:
```glsl
// Calcular alpha baseado na intensidade
float alpha = length(col) * 2.0;
alpha = clamp(alpha, 0.0, 1.0);
gl_FragColor = vec4(col, alpha);
```

### Exemplo de Contexto WebGL Correto:
```javascript
// Criar contexto com alpha
gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });

// Habilitar blending
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

// Limpar com transparente
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
```

---

## Paleta de Cores Oficial
Usar **APENAS** estas cores:

| Nome | Código Hex | Uso |
|------|------------|-----|
| **Azul Conexão** | `#00249C` | Destaque, hover, accent |
| **Azul Estrutura** | `#081535` | Fundo principal |
| **Cinza Operacional** | `#8F99A8` | Textos secundários, animações |
| **Grafite Infra** | `#2A2F36` | Elementos de fundo, blur |
| **Branco Técnico** | `#F4F6F9` | Textos principais, linhas |

### Variáveis CSS correspondentes:
```css
--azul-conexao: #00249C;
--azul-estrutura: #081535;
--cinza-operacional: #8F99A8;
--grafite-infra: #2A2F36;
--branco-tecnico: #F4F6F9;
```

---

## Tipografia Institucional

### Títulos
- **Fonte:** Space Grotesk
- **Peso:** Semibold (600)
- **Uso:** Títulos de seções, headings

### Textos
- **Fonte:** Inter
- **Peso:** Regular (400)
- **Uso:** Parágrafos, descrições, textos gerais

### Estilo de Comunicação
- Clara
- Técnica
- Confiável

---

## Logo da Empresa

### "Audicom"
- **Fonte:** Poppins
- **Peso:** Bold (700)

### "Telecom"
- **Fonte:** Montserrat
- **Peso:** Semibold (600)

---

## Resumo Rápido
- Cores: Azul (#00249C), Azul Escuro (#081535), Cinza (#8F99A8), Grafite (#2A2F36), Branco (#F4F6F9)
- Títulos: Space Grotesk Semibold
- Textos: Inter Regular
- Logo Audicom: Poppins Bold
- Logo Telecom: Montserrat Semibold