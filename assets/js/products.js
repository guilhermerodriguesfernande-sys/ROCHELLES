/**
 * ROCHELLES Streetwear - Base de Dados de Produtos
 * Coleção Drop 01: Your Style. Your Rules.
 */

const PRODUCTS = [
  {
    id: "hoodie-swag-baddie",
    name: "Moletom Heavyweight \"Swag Baddie\"",
    category: "moletons",
    categoryLabel: "Moletom Streetwear",
    price: 249.90,
    originalPrice: 299.90,
    tag: "Destaque Drop 01",
    isFeatured: true,
    frontImage: "assets/images/products/hoodie-swag-baddie-front.png",
    backImage: "assets/images/products/hoodie-swag-baddie-back.png",
    fullImage: "assets/images/products/hoodie-swag-baddie-full.png",
    description: "Moletom streetwear confeccionado em algodão premium heavyweight de altíssima gramatura (380g/m²). Apresenta estampa caligráfica autoral 'Swag Baddie' no peito acompanhada de estrela de quatro pontas e, no verso, um impactante grid editorial fotográfico 3x3 com divisor geométrico. Capuz transpassado e bolso canguru anatômico.",
    specs: [
      "Algodão sustentável Heavyweight 380g/m² com interior felpado",
      "Modelagem boxy oversized com caimento despojado",
      "Estampa em Silk-Screen HD monocromático de alta durabilidade",
      "Gola e punhos com ribana 2x1 canelada reforçada",
      "Ilhós e cordão premium com ponteiras pretas foscas"
    ],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: "tee-swag-baddie",
    name: "Camiseta Boxy Fit \"Swag Baddie\"",
    category: "camisetas",
    categoryLabel: "Camiseta Streetwear",
    price: 129.90,
    originalPrice: 159.90,
    tag: "Bestseller",
    isFeatured: true,
    frontImage: "assets/images/products/tee-swag-baddie-front.png",
    backImage: "assets/images/products/tee-swag-baddie-back.png",
    fullImage: "assets/images/products/tee-swag-baddie-full.png",
    description: "Camiseta streetwear em modelagem boxy fit exclusiva com ombros caídos e gola espessa canelada de 3cm. Grafia caligráfica 'Swag Baddie' em branco óptico na parte frontal e painel fotográfico de 9 retratos urbanos no verso, traduzindo atitude e elegância dark luxury.",
    specs: [
      "100% Algodão Penteado Fio 26.1 encorpado (220g/m²)",
      "Corte Boxy Streetwear estruturado (não deforma na lavagem)",
      "Gola gorda canelada de 3,0 cm com costura pespontada",
      "Estampa silk screen com toque zero e definição fotográfica",
      "Etiqueta interna em silk para máximo conforto ao vestir"
    ],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: "tee-swag-boys",
    name: "Camiseta Oversized \"Swag Boys\"",
    category: "camisetas",
    categoryLabel: "Camiseta Streetwear",
    price: 119.90,
    originalPrice: 149.90,
    tag: "Street Icon",
    isFeatured: true,
    frontImage: "assets/images/products/tee-swag-boys-front.png",
    backImage: "assets/images/products/tee-swag-boys-back.png",
    fullImage: "assets/images/products/tee-swag-boys-full.png",
    description: "Inspirada na estética crua da cultura urbana das metrópoles. Caligrafia cursiva fluida 'Swag Boys' no peitoral esquerdo e imponente grid fotográfico em alto contraste monocromático nas costas.",
    specs: [
      "100% Algodão Premium selecionado pré-encolhido",
      "Gramatura densa de 210g/m² com toque macio",
      "Modelagem oversized com mangas amplas alongadas",
      "Reforço de ombro a ombro com pesponto duplo",
      "Design autoral Rochelle Studio"
    ],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: "tee-gang013",
    name: "Camiseta Gothic \"Gang 013\"",
    category: "camisetas",
    categoryLabel: "Camiseta Streetwear",
    price: 119.90,
    originalPrice: 149.90,
    tag: "Underground",
    isFeatured: false,
    frontImage: "assets/images/products/tee-gang013-front.png",
    backImage: "assets/images/products/tee-gang013-back.png",
    fullImage: "assets/images/products/tee-gang013-full.png",
    description: "Uma reverência à atmosfera das ruas e às raízes costeiras e urbanas. Apresenta tipografia em estilo gótico blackletter 'Gang 013' na frente e um mosaico fotográfico expressivo nas costas com ícones urbanos marcantes.",
    specs: [
      "100% Algodão puro Heavyweight 210g/m²",
      "Tipografia gótica medieval em serigrafia de alta resistência",
      "Modelagem reta streetwear unissex",
      "Acabamento premium em costura inglesa lateral",
      "Resistente a desbotamento e lavagens intensas"
    ],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: "tee-familia",
    name: "Camiseta Boxy \"Familia\"",
    category: "camisetas",
    categoryLabel: "Camiseta Streetwear",
    price: 119.90,
    originalPrice: 149.90,
    tag: "Heritage",
    isFeatured: false,
    frontImage: "assets/images/products/tee-familia-front.png",
    backImage: "assets/images/products/tee-familia-back.png",
    fullImage: "assets/images/products/tee-familia-full.png",
    description: "Símbolo de lealdade, força e união. Carrega caligrafia artística 'Familia' coroada em destaque no peito, acompanhada de composição de fotos de união e vivência periférica no painel traseiro.",
    specs: [
      "100% Algodão penteado com toque aveludado",
      "Detalhe gráfico em coroa bordada/silkada minimalista",
      "Caimento estruturado com barras reforçadas",
      "Gramatura 210g/m² que assegura caimento reto perfeito",
      "Resistência superior com costuras travadas nos pontos de tensão"
    ],
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: "tee-realgs",
    name: "Camiseta Oversized \"Real G's\"",
    category: "camisetas",
    categoryLabel: "Camiseta Streetwear",
    price: 119.90,
    originalPrice: 149.90,
    tag: "Classic Street",
    isFeatured: false,
    frontImage: "assets/images/products/tee-realgs-front.png",
    backImage: "assets/images/products/tee-realgs-back.png",
    fullImage: "assets/images/products/tee-realgs-full.png",
    description: "Inspirada na era dourada do streetwear internacional. Tipografia refinada em script 'Real G's' na frontal e grid fotográfico com enquadramentos de lifestyle, carros e cultura hip-hop no verso.",
    specs: [
      "100% Algodão Premium brasileiro Fio 26.1",
      "Gola canelada de alta densidade sem relaxamento",
      "Estampa em técnica silk screen monocromática premium",
      "Modelagem oversized contemporânea unissex",
      "Produção consciente e limitada"
    ],
    sizes: ["P", "M", "G", "GG"]
  }
];

// Helper para formatar moeda em Reais
function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
