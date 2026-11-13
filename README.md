# ROCHELLES ✦ Streetwear & Dark Luxury

> *"YOUR STYLE. YOUR RULES."*  
> Mais que roupas, uma expressão de personalidade.

Protótipo de e-commerce front-end para a marca de moda urbana e streetwear independente **ROCHELLES**. Desenvolvido para apresentação acadêmica e composição de portfólio de desenvolvimento web.

---

## ✦ Identidade Visual & Conceito

- **Estética**: Black Design / Dark Luxury / Streetwear Contemporâneo.
- **Paleta de Cores**:
  - `#080808` — Fundo principal (Preto profundo)
  - `#171717` e `#121212` — Superfícies e cards
  - `#FFFFFF` — Textos principais e contrastes gráficos
  - `#999999` — Textos secundários e metadados
- **Tipografia**:
  - `Cinzel` & `Italiana` — Elegância dark luxury e serifas imponentes.
  - `Pinyon Script` — Acentos caligráficos fluidos inspirados nas estampas das roupas.
  - `Plus Jakarta Sans` — Interface limpa, moderna e altamente legível.

---

## ✦ Funcionalidades Principais

1. **Catálogo New Collection**:
   - Cards com fotografia autoral de cada peça.
   - Alternância automática entre visão **Frente** e **Costas** ao passar o cursor ou tocar no card.
   - Filtros por categoria (*Todos*, *Moletons*, *Camisetas Boxy*).
2. **Modal de Detalhes da Peça**:
   - Galeria de imagens em alta definição (*Frente*, *Costas*, *Visão Geral*).
   - Ficha técnica completa de fabricação (gramatura, tipo de fio, acabamento).
   - Seleção obrigatória de tamanhos (*P, M, G, GG*).
   - Simulador demonstrativo de frete (CEP).
3. **Sacola de Compras Reativa**:
   - Drawer lateral retrátil com persistência no `localStorage`.
   - Adicionar, remover e alterar quantidades em tempo real.
   - Barra de progresso para meta de Frete Grátis.
4. **Checkout Demonstrativo**:
   - Modal com resumo do pedido e aviso de projeto acadêmico/portfólio.
5. **100% Responsivo**:
   - Experiência otimizada para smartphones, tablets e desktops.

---

## ✦ Estrutura do Projeto

```
ROCHELLES/
├── index.html                  # Estrutura semântica principal
├── assets/
│   ├── css/
│   │   └── style.css           # Estilos e design system Dark Luxury
│   ├── js/
│   │   ├── products.js         # Base de dados dos produtos da coleção
│   │   ├── cart.js             # Gerenciamento de estado da sacola
│   │   └── app.js              # Interações, modais, filtros e toasts
│   └── images/
│       └── products/           # Fotografias tratadas (frente e verso)
├── server.js                   # Servidor HTTP local para testes
└── README.md
```

---

## ✦ Como Rodar Localmente

Basta abrir o arquivo `index.html` em qualquer navegador web, ou iniciar o servidor local com Node.js:

```bash
node server.js
```
Acesse em seu navegador: `http://localhost:3000`

---

## ✦ Deploy no Netlify

O projeto é 100% estático (HTML, CSS e JavaScript puros), pronto para publicação direta no **Netlify**:

1. Acesse [Netlify](https://app.netlify.com/).
2. Clique em **"Add new site"** > **"Import an existing project"** > **GitHub**.
3. Selecione o repositório **ROCHELLES**.
4. Deixe o diretório raiz como `.` e Publish directory vazio ou `.`.
5. Clique em **"Deploy ROCHELLES"**.

---

© 2026 ROCHELLES STREETWEAR. Projeto acadêmico para portfólio de desenvolvimento web.
