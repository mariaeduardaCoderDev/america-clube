// ==================== ESCUDO VETORIAL SVG OFICIAL DO AMÉRICA CLUBE ====================
function getAmericaCrestSVG(className = "w-full h-full") {
  return `
            <svg viewBox="0 0 220 220" class="${className} drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <path id="topArc" d="M 33,110 A 77,77 0 1,1 187,110" />
                    <radialGradient id="emeraldBg" cx="40%" cy="35%" r="70%">
                        <stop offset="0%" stop-color="#008546"/>
                        <stop offset="65%" stop-color="#006B38"/>
                        <stop offset="100%" stop-color="#003D1F"/>
                    </radialGradient>
                </defs>
                <!-- Círculo Externo Verde Escuro e Borda Branca -->
                <circle cx="110" cy="110" r="105" fill="#003D1F" stroke="#FFFFFF" stroke-width="5"/>
                <circle cx="110" cy="110" r="99" fill="url(#emeraldBg)"/>
                
                <!-- Texto Curvo Superior: AMÉRICA CLUBE -->
                <text fill="#FFFFFF" font-family="Montserrat, sans-serif" font-weight="900" font-size="18.5" letter-spacing="2.2">
                    <textPath href="#topArc" startOffset="50%" text-anchor="middle">AMÉRICA CLUBE</textPath>
                </text>

                <!-- Anel Branco Interno -->
                <circle cx="110" cy="110" r="65" fill="#FFFFFF" stroke="#003D1F" stroke-width="2.5"/>
                <circle cx="110" cy="110" r="59" fill="#FFFFFF" stroke="#006B38" stroke-width="2"/>

                <!-- Gomos Estilizados da Bola -->
                <g stroke="#006B38" stroke-width="2" fill="none" opacity="0.85">
                    <polygon points="110,72 134,88 125,116 95,116 86,88" />
                    <line x1="110" y1="72" x2="110" y2="51" />
                    <line x1="134" y1="88" x2="164" y2="82" />
                    <line x1="125" y1="116" x2="152" y2="146" />
                    <line x1="95" y1="116" x2="68" y2="146" />
                    <line x1="86" y1="88" x2="56" y2="82" />
                </g>

                <!-- Continente Americano Estilizado em Verde Esmeralda ao Centro -->
                <path d="M104,56 L114,58 L119,66 L115,75 L118,83 L112,92 L106,96 L109,103 L113,108 L122,113 L126,123 L121,134 L114,144 L109,158 L105,163 L103,152 L106,138 L102,126 L105,114 L100,104 L96,95 L99,83 L95,72 L100,62 Z" fill="#006B38" stroke="#FFFFFF" stroke-width="1.2"/>

                <!-- Letra 'A' à Esquerda -->
                <text x="76" y="121" font-family="Montserrat, sans-serif" font-weight="900" font-size="36" fill="#006B38" stroke="#FFFFFF" stroke-width="2.5" paint-order="stroke" text-anchor="middle">A</text>
                
                <!-- Letra 'C' à Direita -->
                <text x="144" y="121" font-family="Montserrat, sans-serif" font-weight="900" font-size="36" fill="#006B38" stroke="#FFFFFF" stroke-width="2.5" paint-order="stroke" text-anchor="middle">C</text>

                <!-- Detalhe Inferior (Estrela e Filetes Brancos) -->
                <line x1="65" y1="186" x2="92" y2="186" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
                <polygon points="110,177 112.8,183.5 119.8,184 114.4,188.5 116.1,195.3 110,191.6 103.9,195.3 105.6,188.5 100.2,184 107.2,183.5" fill="#FFFFFF"/>
                <line x1="128" y1="186" x2="155" y2="186" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round"/>
            </svg>`;
}

// ==================== ESTADO DA APLICAÇÃO ====================
let currentState = {
  route: "inicio",
  modalidadeAtiva: "futebol",
  filtroPosicao: "Todos",
  buscaAtleta: "",
  categoriaNoticia: "Todas",
  simuladorJogosMes: 3,
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header-crest-container").innerHTML =
    getAmericaCrestSVG();
  document.getElementById("footer-crest-container").innerHTML =
    getAmericaCrestSVG();
  // Evita que o navegador "pule" a rolagem antes de a página ser desenhada
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  // Abre a página indicada no endereço (#gestao, #modalidades/futebol...)
  const inicial = lerRotaDoHash();
  navigateTo(inicial.route, inicial.param, "inicial");

  // Botão voltar/avançar do navegador
  window.addEventListener("hashchange", () => {
    const r = lerRotaDoHash();
    const mesma =
      r.route === currentState.route &&
      (r.route !== "modalidades" ||
        !r.param ||
        r.param === currentState.modalidadeAtiva);
    if (!mesma) navigateTo(r.route, r.param, "hash");
  });

  // Guarda a posição da rolagem ao recarregar/sair
  window.addEventListener("pagehide", salvarScroll);
  window.addEventListener("beforeunload", salvarScroll);
});

// ==================== MEMÓRIA DA PÁGINA (reload) ====================
const ROTAS_VALIDAS = [
  "inicio",
  "historia",
  "gestao",
  "modalidades",
  "noticias",
  "negocios",
  "contatos",
];

function lerRotaDoHash() {
  let bruto = "";
  try {
    bruto = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
  } catch (e) {}
  const [r, p] = bruto.split("/");
  const route = ROTAS_VALIDAS.includes(r) ? r : "inicio";
  const param =
    route === "modalidades" &&
    p &&
    Object.prototype.hasOwnProperty.call(AMERICA_DATA.modalidades, p)
      ? p
      : null;
  return { route, param };
}

function hashAtual() {
  return (
    "#" +
    (currentState.route === "modalidades"
      ? `modalidades/${currentState.modalidadeAtiva}`
      : currentState.route)
  );
}

// Atualiza o endereço sem rolar a página nem recarregar
function gravarHash() {
  const alvo = hashAtual();
  if (location.hash === alvo) return;
  try {
    history.pushState(null, "", alvo);
  } catch (e) {
    location.hash = alvo;
  }
}

function salvarScroll() {
  try {
    sessionStorage.setItem(
      "ac_scroll",
      JSON.stringify({ hash: hashAtual(), y: window.scrollY }),
    );
  } catch (e) {}
}

function restaurarScroll() {
  try {
    const s = JSON.parse(sessionStorage.getItem("ac_scroll") || "null");
    if (s && s.hash === hashAtual() && s.y > 0) {
      window.scrollTo(0, s.y);
      // Imagens podem aumentar a altura da página: reaplica ao terminar de carregar
      window.addEventListener("load", () => window.scrollTo(0, s.y), {
        once: true,
      });
    }
  } catch (e) {}
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

// ==================== ROTEAMENTO SPA ====================
// origem: "usuario" (clique), "inicial" (carregamento) ou "hash" (voltar/avançar)
function navigateTo(route, param = null, origem = "usuario") {
  currentState.route = route;
  if (route === "modalidades" && param) {
    currentState.modalidadeAtiva = param;
    currentState.filtroPosicao = "Todos";
    currentState.buscaAtleta = "";
  }
  if (origem === "usuario") gravarHash();

  // Atualiza estado ativo no menu
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    if (btn.dataset.nav === route) {
      btn.classList.add("nav-active");
    } else {
      btn.classList.remove("nav-active");
    }
  });

  // Fecha menu mobile se aberto
  document.getElementById("mobile-menu").classList.add("hidden");

  // Renderiza a seção correspondente
  const container = document.getElementById("app-content");
  switch (route) {
    case "inicio":
      container.innerHTML = renderInicio();
      break;
    case "historia":
      container.innerHTML = renderHistoria();
      break;
    case "gestao":
      container.innerHTML = renderGestao();
      break;
    case "modalidades":
      container.innerHTML = renderModalidades();
      break;
    case "noticias":
      container.innerHTML = renderNoticias();
      break;
    case "negocios":
      container.innerHTML = renderNegocios();
      break;
    case "contatos":
      container.innerHTML = renderContatos();
      break;
    default:
      container.innerHTML = renderInicio();
  }

  if (origem === "inicial") {
    restaurarScroll();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ==================== 1. SEÇÃO: Início ====================
function renderInicio() {
  const destaquesNoticias = AMERICA_DATA.noticias.slice(0, 3);
  return `
            <div class="fade-in">
                <!-- HERO BANNER COM ILUMINAÇÃO DE ESTÁDIO -->
                <section class="stadium-hero text-white relative overflow-hidden border-b border-america-700">
                    <!-- Padrão geométrico sutil de gramado -->
                    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.15) 60px, rgba(255,255,255,0.15) 120px);"></div>
                    
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <!-- Coluna Principal -->
                            <div class="lg:col-span-7 space-y-6">
                                <div class="inline-flex items-center gap-2 bg-america-800/90 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-300">
                                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span>Portal Oficial • Temporada 2026</span>
                                </div>
                                <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08]">
                                    A Força de um <span class="text-emerald-400">Continente</span> em Campo.
                                </h1>
                                <p class="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                                    Início de um século de tradição alviverde. Acompanhe os elencos e vibre com cada conquista.
                                </p>
                                <div class="flex flex-wrap gap-4 pt-2">
                                    <button onclick="navigateTo('modalidades')" class="bg-america-800/80 hover:bg-america-700 text-white border border-emerald-500/40 font-display font-bold text-sm uppercase tracking-wider px-7 py-4 rounded-xl transition flex items-center gap-2.5">
                                        <i class="fa-solid fa-users"></i>
                                        <span>Conheça os Elencos</span>
                                    </button>
                                </div>

                                <!-- Indicadores Rápidos -->
                                <div class="grid grid-cols-3 gap-4 pt-6 border-t border-america-700/60 max-w-lg">
                                    <div>
                                        <span class="block font-sport text-2xl sm:text-3xl font-bold text-white"> 0 ANOS</span>
                                        <span class="text-xs text-emerald-300 uppercase tracking-wider">De História</span>
                                    </div>
                                    <div>
                                        <span class="block font-sport text-2xl sm:text-3xl font-bold text-white">0 TÍTULOS</span>
                                        <span class="text-xs text-emerald-300 uppercase tracking-wider">Oficiais</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Card Próximo Jogo em Destaque -->
                            <div class="lg:col-span-5">
                                <div class="bg-america-950/90 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                                    <div class="flex items-center justify-between border-b border-america-800 pb-4 mb-6">
                                        <span class="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                                            <i class="fa-solid fa-calendar-day"></i> Próximo Jogo
                                        </span>
                                        <span class="bg-america-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">Campeonato a definir</span>
                                    </div>

                                    <!-- Confronto -->
                                    <div class="flex items-center justify-between gap-4 my-6">
                                        <div class="flex flex-col items-center text-center w-1/3">
                                            <div class="w-16 h-16 sm:w-20 sm:h-20 mb-2">${getAmericaCrestSVG()}</div>
                                            <span class="font-display font-extrabold text-sm sm:text-base uppercase">América Clube</span>
                                            <span class="text-[11px] text-emerald-400">Mandante</span>
                                        </div>

                                        <div class="flex flex-col items-center justify-center w-1/3">
                                            <span class="font-sport text-3xl sm:text-4xl font-bold text-white tracking-widest"></span></span>
                                            <span class="text-xs font-semibold text-slate-300 mt-1">Data a definir</span>
                                        </div>

                                        <div class="flex flex-col items-center text-center w-1/3">
                                            <div class="w-16 h-16 sm:w-20 sm:h-20 mb-2 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center">
                                                <i class="fa-solid fa-shield text-3xl text-slate-300"></i>
                                            </div>
                                            <span class="font-display font-extrabold text-sm sm:text-base uppercase">Adversário a definir</span>
                                            <span class="text-[11px] text-slate-400">Visitante</span>
                                        </div>
                                    </div>

                                    <div class="bg-america-900/90 rounded-xl p-3.5 text-center text-xs text-slate-300 mb-5 border border-america-800">
                                        <i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> <strong>Local a definir</strong> • Horário a definir
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
 <!-- MODALIDADES EM DESTAQUE -->
                <section class="py-16 bg-white border-b border-slate-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                            <div>
                                <span class="text-xs font-bold uppercase tracking-[0.25em] text-america-700">Excelência Multiesportiva</span>
                                <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900 mt-1">Nossas Modalidades Profissionais</h2>
                            </div>
                            <button onclick="navigateTo('modalidades')" class="text-sm font-bold text-america-700 hover:text-america-900 flex items-center gap-1.5">
                                <span>Ver todos os elencos e comissões técnicas</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${Object.entries(AMERICA_DATA.modalidades)
                              .map(
                                ([key, mod]) => `
                                <div onclick="navigateTo('modalidades', '${key}')" class="group cursor-pointer bg-gelo hover:bg-america-900 border border-slate-200 hover:border-america-700 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <div class="flex items-center justify-between mb-4">
                                        <div class="w-12 h-12 rounded-xl bg-america-100 group-hover:bg-america-700 text-america-700 group-hover:text-white flex items-center justify-center text-xl transition">
                                            <i class="fa-solid ${mod.icone}"></i>
                                        </div>
                                        <span class="text-xs font-bold uppercase tracking-wider text-america-700 group-hover:text-emerald-400">${mod.atletas.length} Atletas</span>
                                    </div>
                                    <h3 class="font-display text-xl font-extrabold text-america-900 group-hover:text-white transition">${mod.nome}</h3>
                                    <p class="text-xs font-semibold text-america-700 group-hover:text-emerald-300 mt-1 mb-3">${mod.competicao}</p>
                                    <p class="text-sm text-slate-600 group-hover:text-slate-300 line-clamp-2 mb-4">${mod.descricao}</p>
                                    <div class="flex items-center text-xs font-bold text-america-800 group-hover:text-white uppercase tracking-wider">
                                        <span>Conhecer Elenco</span>
                                        <i class="fa-solid fa-chevron-right ml-2 transform group-hover:translate-x-1 transition"></i>
                                    </div>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </section>

                <!-- ÚLTIMAS NOTÍCIAS -->
                <section class="py-16 bg-gelo">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                            <div>
                                <span class="text-xs font-bold uppercase tracking-[0.25em] text-america-700">Sala de Imprensa</span>
                                <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900 mt-1">Últimas Notícias do Clube</h2>
                            </div>
                            <button onclick="navigateTo('noticias')" class="text-sm font-bold text-america-700 hover:text-america-900 flex items-center gap-1.5">
                                <span>Acessar portal de notícias</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            ${destaquesNoticias
                              .map(
                                (noticia) => `
                                <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
                                    <div class="h-44 emerald-gradient p-6 flex flex-col justify-between text-white relative overflow-hidden">
                                        ${noticia.imagem ? `<img src="${noticia.imagem}" alt="${noticia.titulo}" class="absolute inset-0 w-full h-full object-cover" onerror="this.style.display='none'"><div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>` : `<i class="fa-solid ${noticia.imagemIcone} text-7xl text-white/10 absolute -right-3 -bottom-3"></i>`}
                                        <span class="relative z-10 bg-america-950/70 backdrop-blur-sm text-emerald-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit">${noticia.categoria}</span>
                                        <span class="relative z-10 text-xs text-emerald-100 font-medium">${noticia.data}</span>
                                    </div>
                                    <div class="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 class="font-display text-lg font-extrabold text-america-900 leading-snug mb-3 hover:text-america-700 cursor-pointer" onclick="openNewsModal(${noticia.id})">${noticia.titulo}</h3>
                                            <p class="text-sm text-slate-600 line-clamp-3 mb-5">${noticia.resumo}</p>
                                        </div>
                                        <button onclick="openNewsModal(${noticia.id})" class="text-xs font-extrabold uppercase tracking-wider text-america-700 hover:text-america-900 flex items-center gap-1.5 pt-3 border-t border-slate-100">
                                            <span>Ler matéria completa</span>
                                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                        </button>
                                    </div>
                                </article>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </section>

            </div>`;
}

// ==================== 2. SEÇÃO: HISTÓRIA ====================
function renderHistoria() {
  return `
            <div class="fade-in">
                <!-- Cabeçalho da Seção -->
                <section class="bg-america-900 text-white py-16 border-b border-america-700">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Legado & Identidade</span>
                        <h1 class="font-display text-3xl sm:text-5xl font-black uppercase mt-2">Mais de um Século de Glórias</h1>
                        <p class="text-slate-300 max-w-3xl mt-4 text-base sm:text-lg">
                            Em 2026, o América Clube começou a construir uma trajetória pautada pela paixão popular, pioneirismo esportivo e orgulho de carregar o mapa do continente no peito.
                        </p>
                    </div>
                </section>

                <!-- Simbologia do Escudo -->
                <section class="py-16 bg-white border-b border-slate-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div class="lg:col-span-4 flex justify-center">
                                <div class="w-56 h-56 sm:w-64 sm:h-64 p-4 bg-america-950 rounded-3xl shadow-2xl border-4 border-america-700">
                                    ${getAmericaCrestSVG()}
                                </div>
                            </div>
                            <div class="lg:col-span-8 space-y-5">
                                <span class="text-xs font-bold uppercase tracking-widest text-america-700">Heráldica Oficial</span>
                                <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900">O Significado do Nosso Escudo</h2>
                                <p class="text-slate-600 leading-relaxed">
                                    O escudo circular do América Clube sintetiza a vocação universal e continental da instituição. O <strong>Verde Esmeralda</strong> representa o gramado sagrado, a vitalidade e a esperança inabalável da torcida alviverde, enquanto o <strong>Branco Puro</strong> simboliza a lealdade, a paz e o espírito olímpico.
                                </p>
                                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                                    <div class="bg-gelo p-4 rounded-xl border border-slate-200">
                                        <h4 class="font-display font-bold text-america-900 text-sm mb-1"><i class="fa-solid fa-earth-americas text-america-700 mr-1.5"></i>O Continente</h4>
                                        <p class="text-xs text-slate-600">O mapa das Américas ao centro simboliza grandeza e ambição internacional.</p>
                                    </div>
                                    <div class="bg-gelo p-4 rounded-xl border border-slate-200">
                                        <h4 class="font-display font-bold text-america-900 text-sm mb-1"><i class="fa-solid fa-font text-america-700 mr-1.5"></i>As Iniciais AC</h4>
                                        <p class="text-xs text-slate-600">Flanqueando a bola em tipografia sólida, reafirmam a identidade do América Clube.</p>
                                    </div>
                                    <div class="bg-gelo p-4 rounded-xl border border-slate-200">
                                        <h4 class="font-display font-bold text-america-900 text-sm mb-1"><i class="fa-solid fa-star text-america-700 mr-1.5"></i>A Estrela Guia</h4>
                                        <p class="text-xs text-slate-600">Na base do anel externo, celebra o início do clube.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Linha do Tempo Interativa -->
                <section class="py-16 bg-gelo border-b border-slate-200">
                    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-12">
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-america-700">Linha do Tempo</span>
                            <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900 mt-1">Marcos da Nossa Trajetória</h2>
                        </div>

                        <div class="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-america-700/30">
                            ${AMERICA_DATA.historia
                              .map(
                                (item, idx) => `
                                <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                    <div class="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-america-700 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-sport text-xs font-bold">
                                        ${idx + 1}
                                    </div>
                                    <div class="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-america-700 transition">
                                        <span class="font-sport text-xl font-bold text-america-700">${item.ano}</span>
                                        <h3 class="font-display text-lg font-extrabold text-america-900 mt-1 mb-2">${item.titulo}</h3>
                                        <p class="text-sm text-slate-600 leading-relaxed">${item.desc}</p>
                                    </div>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </section>

                <!-- Sala de Troféus -->
                <section class="py-16 bg-america-950 text-white">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="text-center mb-12">
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Galeria de Conquistas</span>
                            <h2 class="font-display text-2xl sm:text-4xl font-black uppercase mt-1">Sala de Troféus</h2>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        </div>
                    </div>
                </section>
            </div>`;
}
// ==================== SEÇÃO: GESTÃO ====================
function gestaoIniciais(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

// Avatar: foto (se existir e carregar) -> iniciais -> ícone do cargo
function gestaoAvatar(item, sizeClasses, textClasses) {
  const conteudo = item.ativo
    ? `<span class="font-sport font-bold ${textClasses}">${gestaoIniciais(item.nome)}</span>`
    : `<i class="fa-solid ${item.icone || "fa-user"} ${textClasses} opacity-60"></i>`;
  const foto = item.foto
    ? `<img src="${item.foto}" alt="${item.nome}" class="absolute inset-0 w-full h-full object-cover" onerror="this.remove()">`
    : "";
  return `
          <div class="relative ${sizeClasses} flex items-center justify-center overflow-hidden">
            ${conteudo}
            ${foto}
          </div>`;
}

function renderGestao() {
  const [presidente, ...demais] = AMERICA_DATA.gestao;
  const total = AMERICA_DATA.gestao.length;
  const preenchidos = AMERICA_DATA.gestao.filter((g) => g.ativo).length;
  const abertos = total - preenchidos;
  const faixa = 50 / demais.length; // posição do 1º/último card na barra do organograma

  const cardDemais = (g) =>
    g.ativo
      ? `
            <article class="h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
              <div class="flex items-center gap-4">
                ${gestaoAvatar(g, "w-16 h-16 rounded-xl bg-america-900 text-white border border-america-700 flex-shrink-0", "text-xl")}
                <div class="min-w-0">
                  <span class="block text-xs font-bold uppercase tracking-wider text-america-700">${g.cargo}</span>
                  <h3 class="font-display text-lg font-extrabold text-america-900 leading-tight">${g.nome}</h3>
                </div>
              </div>
              <p class="text-sm text-emerald-800 font-semibold mt-4">${g.subtitulo}</p>
              <p class="text-sm text-slate-600 leading-relaxed mt-1">${g.bio}</p>
            </article>`
      : `
            <article class="h-full bg-white/60 rounded-2xl border-2 border-dashed border-america-700/30 p-6 flex flex-col">
              <div class="flex items-center gap-4">
                ${gestaoAvatar(g, "w-16 h-16 rounded-xl bg-america-100 text-america-700 border border-america-700/20 flex-shrink-0", "text-2xl")}
                <div class="min-w-0">
                  <span class="block text-xs font-bold uppercase tracking-wider text-america-700">${g.cargo}</span>
                  <h3 class="font-display text-lg font-extrabold text-slate-500 leading-tight">${g.nome}</h3>
                  <span class="inline-block mt-1 text-[11px] font-bold text-gold-600 bg-gold-400/15 rounded-full px-2.5 py-0.5">Em aberto</span>
                </div>
              </div>
              <p class="text-sm text-slate-700 font-semibold mt-4">${g.subtitulo}</p>
              <p class="text-sm text-slate-600 leading-relaxed mt-1 flex-grow">${g.bio}</p>
              <button onclick="navigateTo('contatos')" class="mt-5 self-start text-xs font-display font-extrabold uppercase tracking-wider text-america-700 hover:text-america-900 border-b-2 border-america-700/40 hover:border-america-900 transition pb-0.5">
                Quero ajudar nesta área
              </button>
            </article>`;

  return `
          <div class="fade-in">
            <!-- Cabeçalho -->
            <section class="bg-america-900 text-white py-16 border-b border-america-700">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 class="font-display text-3xl sm:text-5xl font-black uppercase">Gestão & Diretoria</h1>
                <p class="text-slate-300 max-w-3xl mt-4 text-base sm:text-lg">
                  O América Clube nasceu em 2026 e sua diretoria está sendo montada. Conheça quem lidera o projeto e quais áreas ainda procuram responsáveis.
                </p>
                <div class="flex flex-wrap gap-3 mt-6 text-sm">
                  <span class="inline-flex items-center gap-2 bg-america-800 border border-america-700 rounded-full px-4 py-1.5">
                    <i class="fa-solid fa-circle-check text-emerald-400"></i>
                    <strong>${preenchidos}</strong> de ${total} cargos preenchidos
                  </span>
                  <span class="inline-flex items-center gap-2 bg-america-800 border border-america-700 rounded-full px-4 py-1.5">
                    <i class="fa-regular fa-circle text-gold-400"></i>
                    <strong>${abertos}</strong> ${abertos === 1 ? "cargo em aberto" : "cargos em aberto"}
                  </span>
                </div>
              </div>
            </section>

            <!-- Presidência + organograma -->
            <section class="py-16 bg-gelo border-b border-slate-200">
              <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Presidente -->
                <article class="bg-america-950 text-white rounded-3xl shadow-2xl border border-america-700 overflow-hidden max-w-4xl mx-auto">
                  <div class="grid grid-cols-1 md:grid-cols-12">
                    <div class="md:col-span-4 bg-america-900 flex items-center justify-center p-8">
                      ${gestaoAvatar(presidente, "w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-emerald-400/60 bg-america-800 shadow-xl", "text-6xl text-white")}
                    </div>
                    <div class="md:col-span-8 p-8 sm:p-10 flex flex-col justify-center">
                      <span class="text-xs font-bold uppercase tracking-widest text-emerald-400">${presidente.cargo}</span>
                      <h2 class="font-display text-3xl sm:text-4xl font-black mt-1">${presidente.nome}</h2>
                      <p class="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm mt-2">
                        <i class="fa-solid fa-star text-xs"></i>${presidente.subtitulo}
                      </p>
                      <p class="text-slate-300 leading-relaxed mt-5 max-w-xl">${presidente.bio}</p>
                    </div>
                  </div>
                </article>

                <!-- Conector do organograma (desktop) -->
                <div class="hidden md:block mx-auto w-px h-10 bg-america-700/40"></div>

                <!-- Demais cargos -->
                <div class="relative grid grid-cols-1 md:grid-cols-${demais.length} gap-6 mt-8 md:mt-0">
                  <div class="hidden md:block absolute top-0 h-px bg-america-700/40" style="left:${faixa}%; right:${faixa}%"></div>
                  ${demais
                    .map(
                      (g) => `
                    <div class="relative md:pt-8 md:before:absolute md:before:top-0 md:before:left-1/2 md:before:w-px md:before:h-8 md:before:bg-america-700/40">
                      ${cardDemais(g)}
                    </div>`,
                    )
                    .join("")}
                </div>
              </div>
            </section>

            <!-- Convite -->
            <section class="py-16 bg-white">
              <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900">Quer fazer parte da diretoria?</h2>
                <p class="text-slate-600 mt-3 leading-relaxed">
                  Se você tem experiência em gestão, futebol, finanças ou comunicação e quer ajudar a construir o clube desde o início, fale com a presidência.
                </p>
                <div class="flex flex-col sm:flex-row gap-3 justify-center mt-7">
                  <button onclick="navigateTo('contatos')" class="emerald-gradient hover:brightness-110 text-white font-display font-extrabold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg transition">
                    Falar com a presidência
                  </button>
                  <button onclick="navigateTo('negocios')" class="bg-gelo border border-slate-200 hover:border-america-700 text-america-900 font-display font-extrabold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl transition">
                    Ver oportunidades de patrocínio
                  </button>
                </div>
              </div>
            </section>
          </div>`;
}

// ==================== 3. SEÇÃO: MODALIDADES & ELENCOS ====================
function renderModalidades() {
  const mod = AMERICA_DATA.modalidades[currentState.modalidadeAtiva];
  const posicoes = ["Todos", ...new Set(mod.atletas.map((a) => a.pos))];

  const atletasFiltrados = mod.atletas.filter((a) => {
    const matchPos =
      currentState.filtroPosicao === "Todos" ||
      a.pos === currentState.filtroPosicao;
    const matchBusca =
      a.nome.toLowerCase().includes(currentState.buscaAtleta.toLowerCase()) ||
      String(a.num).includes(currentState.buscaAtleta);
    return matchPos && matchBusca;
  });

  return `
            <div class="fade-in">
                <!-- Cabeçalho -->
                <section class="bg-america-900 text-white py-14 border-b border-america-700">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Alto Rendimento</span>
                        <h1 class="font-display text-3xl sm:text-5xl font-black uppercase mt-2">Modalidades & Elencos</h1>
                        <p class="text-slate-300 max-w-2xl mt-3 text-sm sm:text-base">
                            Selecione uma modalidade abaixo para consultar a comissão técnica, o elenco oficial e as estatísticas individuais dos atletas do América Clube.
                        </p>

                        <!-- Seletor de Abas das Modalidades -->
                        <div class="flex flex-wrap gap-2.5 mt-8">
                            ${Object.entries(AMERICA_DATA.modalidades)
                              .map(
                                ([key, item]) => `
                                <button onclick="selectModalidade('${key}')" class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold uppercase tracking-wider transition flex items-center gap-2 ${currentState.modalidadeAtiva === key ? "bg-white text-america-900 shadow-lg" : "bg-america-800/80 text-slate-200 hover:bg-america-700 border border-america-700"}">
                                    <i class="fa-solid ${item.icone}"></i>
                                    <span>${item.nome}</span>
                                </button>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </section>

                <!-- Conteúdo da Modalidade Selecionada -->
                <section class="py-12 bg-gelo">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                        
                        <!-- Card Informativo + Comissão Técnica -->
                        <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div class="lg:col-span-6 space-y-3">
                                    <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-america-700 bg-america-100 px-3 py-1 rounded-full">
                                        <i class="fa-solid ${mod.icone}"></i>
                                        <span>${mod.competicao}</span>
                                    </div>
                                    <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900">${mod.nome}</h2>
                                    <p class="text-sm text-slate-600 leading-relaxed">${mod.descricao}</p>
                                    <p class="text-xs font-semibold text-slate-500 pt-2">
                                        <i class="fa-solid fa-location-dot text-america-700 mr-1.5"></i>Sede de Jogos: <strong class="text-america-900">${mod.arena}</strong>
                                    </p>
                                </div>

                                <div class="lg:col-span-6 bg-gelo rounded-xl p-5 border border-slate-200">
                                    <h3 class="font-display text-sm font-extrabold uppercase tracking-wider text-america-900 mb-3 flex items-center gap-2">
                                        <i class="fa-solid fa-clipboard-user text-america-700"></i> Comissão Técnica & Departamento
                                    </h3>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        ${mod.comissao
                                          .map(
                                            (c) => `
                                            <div class="bg-white p-3 rounded-lg border border-slate-200/80 flex items-center gap-3">
                                                <div class="relative w-11 h-11 rounded-full bg-america-100 text-america-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    <i class="fa-solid fa-user text-sm opacity-60"></i>
                                                    ${c.foto ? `<img src="${c.foto}" alt="${c.nome}" class="absolute inset-0 w-full h-full object-cover object-top" onerror="this.remove()">` : ""}
                                                </div>
                                                <div class="min-w-0">
                                                    <span class="block text-[10px] font-bold uppercase tracking-wider text-america-700">${c.cargo}</span>
                                                <span class="block font-display font-bold text-sm text-america-900 mt-0.5">${c.nome}</span>
                                                <span class="block text-[11px] text-slate-400">${c.cert}</span>
                                                </div>
                                            </div>
                                        `,
                                          )
                                          .join("")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Barra de Filtros do Elenco -->
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                            <div class="flex flex-wrap items-center gap-2">
                                <span class="text-xs font-bold uppercase text-slate-400 mr-1">Posição:</span>
                                ${posicoes
                                  .map(
                                    (pos) => `
                                    <button onclick="filterPosicao('${pos}')" class="px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${currentState.filtroPosicao === pos ? "bg-america-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}">
                                        ${pos}
                                    </button>
                                `,
                                  )
                                  .join("")}
                            </div>

                            <div class="relative w-full md:w-64">
                                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                                <input type="text" value="${currentState.buscaAtleta}" oninput="searchAtleta(this.value)" placeholder="Nome ou nº da camisa..." class="w-full pl-9 pr-4 py-2 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                            </div>
                        </div>

                        <!-- Grade de Atletas -->
                        ${
                          atletasFiltrados.length === 0
                            ? `
                            <div class="bg-white rounded-2xl p-12 text-center border border-slate-200">
                                <i class="fa-solid fa-user-slash text-4xl text-slate-300 mb-3"></i>
                                <p class="font-display font-bold text-america-900">Nenhum atleta encontrado com os filtros selecionados.</p>
                            </div>
                        `
                            : `
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                ${atletasFiltrados
                                  .map(
                                    (atleta) => `
                                    <div onclick="openAthleteModal('${currentState.modalidadeAtiva}', ${mod.atletas.indexOf(atleta)})" class="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-america-700 transition-all duration-300 flex flex-col">
                                        <!-- Topo do card: foto do atleta (com fallback para silhueta + número) -->
                                        <div class="emerald-gradient text-white relative overflow-hidden ${atleta.foto ? "aspect-[4/5]" : "h-48"}">
                                            <span class="font-sport text-[9rem] leading-none font-bold text-white/10 absolute -right-2 -bottom-6 select-none">${atleta.num}</span>
                                            <i class="fa-solid fa-user absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 text-6xl text-white/15"></i>
                                            ${atleta.foto ? `<img src="${atleta.foto}" alt="${atleta.nome}" loading="lazy" class="absolute inset-0 w-full h-full object-cover object-top" onerror="this.remove()">` : ""}
                                            <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-america-950/95 via-america-950/55 to-transparent"></div>
                                            <div class="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                                                <span class="font-sport text-xl font-bold bg-america-950/70 px-3 py-0.5 rounded-lg border border-emerald-400/30">#${atleta.num}</span>
                                                <span class="text-[11px] font-bold uppercase tracking-wider bg-america-950/60 px-2.5 py-1 rounded-full">${atleta.pos}</span>
                                            </div>
                                            <div class="absolute bottom-4 inset-x-4 z-10">
                                                <h3 class="font-display text-lg font-extrabold leading-tight group-hover:text-emerald-200 transition">${atleta.nome}</h3>
                                                <p class="text-xs text-emerald-200 mt-0.5">${atleta.nac} • ${atleta.idade} anos</p>
                                            </div>
                                        </div>

                                        <!-- Estatísticas Rápidas -->
                                        <div class="p-4 flex-grow flex flex-col justify-between bg-white">
                                            <div class="grid grid-cols-2 gap-2 text-center border-b border-slate-100 pb-3 mb-3">
                                                <div class="bg-gelo rounded-lg p-2">
                                                    <span class="block text-[10px] font-bold uppercase text-slate-400">Jogos</span>
                                                    <span class="font-sport text-base font-bold text-america-900">${atleta.jogos}</span>
                                                </div>
                                                <div class="bg-gelo rounded-lg p-2">
                                                    <span class="block text-[10px] font-bold uppercase text-slate-400">Minutagem</span>
                                                    <span class="font-sport text-base font-bold text-america-900">${atleta.minutos}</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-between text-xs">
                                                <span class="font-semibold text-america-700 truncate pr-2">${atleta.destaque}</span>
                                                <span class="font-bold text-america-900 group-hover:translate-x-1 transition flex-shrink-0">Ficha <i class="fa-solid fa-chevron-right ml-0.5"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        `
                        }
                    </div>
                </section>
            </div>`;
}
function selectModalidade(key) {
  currentState.modalidadeAtiva = key;
  currentState.filtroPosicao = "Todos";
  currentState.buscaAtleta = "";
  gravarHash();
  document.getElementById("app-content").innerHTML = renderModalidades();
}

function filterPosicao(pos) {
  currentState.filtroPosicao = pos;
  document.getElementById("app-content").innerHTML = renderModalidades();
}

function searchAtleta(val) {
  currentState.buscaAtleta = val;
  document.getElementById("app-content").innerHTML = renderModalidades();
}

// ==================== 5. SEÇÃO: NOTÍCIAS & SALA DE IMPRENSA ====================
function renderNoticias() {
  const categorias = [
    "Todas",
    "Futebol",
    "Modalidades",
    "Institucional",
    "Mercado",
  ];
  const lista =
    currentState.categoriaNoticia === "Todas"
      ? AMERICA_DATA.noticias
      : AMERICA_DATA.noticias.filter(
          (n) => n.categoria === currentState.categoriaNoticia,
        );

  return `
            <div class="fade-in">
                <section class="bg-america-900 text-white py-14 border-b border-america-700">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Comunicação Oficial</span>
                            <h1 class="font-display text-3xl sm:text-5xl font-black uppercase mt-2">Notícias & Sala de Imprensa</h1>
                            <p class="text-slate-300 max-w-2xl mt-3 text-sm sm:text-base">
                                Comunicados oficiais, cobertura das partidas, bastidores e informações para jornalistas e veículos de comunicação.
                            </p>
                        </div>
                    </div>
                </section>

                <section class="py-12 bg-gelo">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <!-- Filtro de Editorias -->
                        <div class="flex flex-wrap gap-2 mb-8">
                            ${categorias
                              .map(
                                (cat) => `
                                <button onclick="filterNoticias('${cat}')" class="px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition ${currentState.categoriaNoticia === cat ? "bg-america-700 text-white shadow" : "bg-white text-slate-600 border border-slate-200 hover:border-america-700"}">
                                    ${cat}
                                </button>
                            `,
                              )
                              .join("")}
                        </div>

                        <!-- Grade de Notícias -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            ${lista
                              .map(
                                (n) => `
                                <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col">
                                    <div class="h-48 emerald-gradient p-6 flex flex-col justify-between text-white relative">
                                        ${n.imagem ? `<img src="${n.imagem}" alt="${n.titulo}" class="absolute inset-0 w-full h-full object-cover" onerror="this.style.display='none'"><div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>` : `<i class="fa-solid ${n.imagemIcone} text-8xl text-white/10 absolute right-4 bottom-2"></i>`}
                                        <div class="relative z-10 flex items-center justify-between">
                                            <span class="bg-america-950/75 text-emerald-300 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">${n.categoria}</span>
                                            <span class="text-xs text-emerald-100">${n.data}</span>
                                        </div>
                                        <span class="relative z-10 text-xs text-emerald-200 font-medium">Por ${n.autor}</span>
                                    </div>
                                    <div class="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h2 onclick="openNewsModal(${n.id})" class="font-display text-xl font-extrabold text-america-900 hover:text-america-700 cursor-pointer transition mb-3">${n.titulo}</h2>
                                            <p class="text-sm text-slate-600 leading-relaxed mb-6">${n.resumo}</p>
                                        </div>
                                        <button onclick="openNewsModal(${n.id})" class="w-fit text-xs font-extrabold uppercase tracking-wider text-america-700 hover:text-america-900 flex items-center gap-2">
                                            <span>Ler Matéria Completa</span>
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </article>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </section>
            </div>`;
}

function filterNoticias(cat) {
  currentState.categoriaNoticia = cat;
  document.getElementById("app-content").innerHTML = renderNoticias();
}

// ==================== 7. SEÇÃO: NEGÓCIOS & PATROCINADORES ====================
function renderNegocios() {
  return `
            <div class="fade-in">
                <section class="stadium-hero text-white py-16 border-b border-america-700">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">América Negócios & Marketing</span>
                        <h1 class="font-display text-3xl sm:text-5xl font-black uppercase mt-2">Negócios & Patrocínios</h1>
                        <p class="text-slate-200 max-w-3xl mt-4 text-sm sm:text-base">
                          Associe sua marca ao novo orgulho esportivo de Mococa. Conecte-se diretamente com a nossa comunidade através de visibilidade nos jogos, presença digital e experiências exclusivas para clientes e parceiros. Seja um patrocinador fundador e cresça junto com o time da nossa cidade.
                        </p>
                    </div>
                </section>

                <section class="py-16 bg-gelo">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
                        
                        <!-- Propriedades Comerciais -->
                        <div>
                            <div class="text-center mb-10">
                                <span class="text-xs font-bold uppercase tracking-[0.25em] text-america-700">Soluções Corporativas</span>
                                <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900 mt-1">Propriedades de Patrocínio</h2>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-america-700 transition">
                                    <div class="w-12 h-12 rounded-xl bg-america-100 text-america-700 flex items-center justify-center text-xl mb-4">
                                        <i class="fa-solid fa-shirt"></i>
                                    </div>
                                    <h3 class="font-display text-lg font-extrabold text-america-900 mb-2">Patrocínio na Camisa</h3>
                                    <p class="text-sm text-slate-600 leading-relaxed">Exposição de marca no uniforme oficial em competições, treinos e viagens.</p>
                                </div>  
                            </div>
                        </div>

                        <!-- Formulário B2B -->
                        <div class="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
                            <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                <div class="lg:col-span-5 space-y-4">
                                    <span class="text-xs font-bold uppercase tracking-widest text-america-700">Diretoria Comercial</span>
                                    <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900">Seja um Patrocinador Oficial do América Clube</h2>
                                    <p class="text-sm text-slate-600 leading-relaxed">
                                        Preencha os dados da sua empresa. Nossa equipe de novos negócios entrará em contato em até 24 horas úteis com uma proposta comercial personalizada.
                                    </p>
                                    <div class="bg-america-900 text-white p-5 rounded-2xl space-y-2 text-xs">
                                        <p class="font-bold text-emerald-400 uppercase tracking-wider">Atendimento Corporativo Direto</p>
                                        <p><i class="fa-solid fa-envelope mr-2 text-emerald-400"></i>comercial@americaclube.com.br</p>
                                        <p><i class="fa-solid fa-phone mr-2 text-emerald-400"></i>+55 (11) 3924-1950</p>
                                    </div>
                                </div>

                                <form onsubmit="handleBusinessSubmit(event)" class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Nome do Responsável *</label>
                                        <input type="text" required placeholder="Ex: Carlos Mendes" class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Empresa / Organização *</label>
                                        <input type="text" required placeholder="Nome da empresa" class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">E-mail Corporativo *</label>
                                        <input type="email" required placeholder="nome@empresa.com.br" class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Propriedade de Interesse</label>
                                        <select class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                            <option>Patrocínio na Camisa</option>
                                        </select>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Mensagem / Objetivos da Parceria</label>
                                        <textarea rows="3" placeholder="Descreva brevemente o projeto comercial..." class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700"></textarea>
                                    </div>
                                    <div class="sm:col-span-2">
                                        <button type="submit" class="w-full emerald-gradient hover:brightness-110 text-white font-display font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg transition">
                                            Solicitar Apresentação Comercial
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>`;
}

function handleBusinessSubmit(e) {
  e.preventDefault();
  showToast(
    "Solicitação comercial registrada! Protocolo #COM-2026 enviado para o seu e-mail.",
  );
  e.target.reset();
} // ==================== 8. SEÇÃO: CONTATOS & OUVIDORIA ====================
function renderContatos() {
  return `
            <div class="fade-in">
                <section class="bg-america-900 text-white py-14 border-b border-america-700">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <span class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">Canais Oficiais</span>
                        <h1 class="font-display text-3xl sm:text-5xl font-black uppercase mt-2">Contatos & Ouvidoria</h1>
                        <p class="text-slate-300 max-w-2xl mt-3 text-sm sm:text-base">
                            Entre em contato diretamente com os departamentos do América Clube ou utilize nossa Ouvidoria Institucional.
                        </p>
                    </div>
                </section>

                <section class="py-16 bg-gelo">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <span class="text-xs font-bold uppercase text-america-700">Comunicação</span>
                                <h3 class="font-display text-lg font-extrabold text-america-900 mt-1 mb-3">Assessoria de Imprensa</h3>
                                <p class="text-xs text-slate-600 mb-3">Credenciamento de jogos, entrevistas e solicitações de mídia.</p>
                                <p class="text-xs font-bold text-america-800"><i class="fa-solid fa-envelope mr-1.5 text-america-700"></i>imprensa@americaclube.com</p>
                                <p class="text-xs font-bold text-america-800 mt-1"><i class="fa-solid fa-phone mr-1.5 text-america-700"></i>(11) 3924-1930</p>
                            </div>

                            <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <span class="text-xs font-bold uppercase text-america-700">Integridade & Ética</span>
                                <h3 class="font-display text-lg font-extrabold text-america-900 mt-1 mb-3">Ouvidoria Institucional</h3>
                                <p class="text-xs text-slate-600 mb-3">Canal confidencial para sugestões, elogios e relatos éticos.</p>
                                <p class="text-xs font-bold text-america-800"><i class="fa-solid fa-envelope mr-1.5 text-america-700"></i>ouvidoria@americaclube.com</p>
                                <p class="text-xs font-bold text-america-800 mt-1"><i class="fa-solid fa-shield-halved mr-1.5 text-america-700"></i>Sigilo Garantido</p>
                            </div>

                         <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <span class="text-xs font-bold uppercase text-america-700">Comercial & Parcerias</span>
                            <h3 class="font-display text-lg font-extrabold text-america-900 mt-1 mb-3">Negócios & Patrocínios</h3>
                            <p class="text-xs text-slate-600 mb-3">Canal exclusivo para empresas e empreendedores interessados em apoiar o América Clube, desenvolver parcerias e investir no crescimento do clube.</p>
                            <p class="text-xs font-bold text-america-800"><i class="fa-solid fa-envelope mr-1.5 text-america-700"></i>comercial@americaclube.com</p>
                            <p class="text-xs font-bold text-america-800 mt-1"><i class="fa-solid fa-handshake mr-1.5 text-america-700"></i>Seja um parceiro do clube</p>
</div>
                        </div>

                        <!-- Formulário de Contato + Localização -->
                        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <form onsubmit="handleContactSubmit(event)" class="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                                <h2 class="font-display text-2xl font-black text-america-900">Envie sua Mensagem</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Nome Completo *</label>
                                        <input type="text" required placeholder="Seu nome" class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-bold uppercase text-slate-600 mb-1">E-mail *</label>
                                        <input type="email" required placeholder="seu@email.com.br" class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Departamento Destinatário</label>
                                    <select class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700">
                                        <option>Assessoria de Imprensa</option>
                                        <option>Diretoria Comercial</option>
                                        <option>Ouvidoria Institucional</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-bold uppercase text-slate-600 mb-1">Mensagem *</label>
                                    <textarea rows="4" required placeholder="Escreva aqui sua solicitação..." class="w-full px-4 py-3 text-sm bg-gelo border border-slate-200 rounded-xl focus:outline-none focus:border-america-700"></textarea>
                                </div>
                                <button type="submit" class="w-full emerald-gradient hover:brightness-110 text-white font-display font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl shadow-lg transition">
                                    Enviar Mensagem Oficial
                                </button>
                            </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>`;
}

function handleContactSubmit(e) {
  e.preventDefault();
  const protocolo = Math.floor(100000 + Math.random() * 900000);
  showToast(`Mensagem enviada com sucesso! Protocolo #AC-${protocolo}.`);
  e.target.reset();
} // ==================== MODAIS INTERATIVOS ====================
function openAthleteModal(modKey, idx) {
  const mod = AMERICA_DATA.modalidades[modKey];
  const atleta = mod.atletas[idx];
  if (!atleta) return;

  document.getElementById("modal-tag").innerText =
    `Ficha Técnica • ${mod.nome}`;
  document.getElementById("modal-body").innerHTML = `
                <div class="space-y-6">
                    <div class="flex items-center gap-5 bg-america-900 text-white p-6 rounded-2xl">
                        <div class="relative w-24 h-28 rounded-xl bg-america-800 border border-emerald-400/40 flex items-center justify-center font-sport text-3xl font-bold flex-shrink-0 overflow-hidden">
                            <span>#${atleta.num}</span>
                            ${atleta.foto ? `<img src="${atleta.foto}" alt="${atleta.nome}" class="absolute inset-0 w-full h-full object-cover object-top" onerror="this.remove()">` : ""}
                        </div>
                        <div>
                            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">#${atleta.num} • ${atleta.pos}</span>
                            <h3 class="font-display text-2xl font-black">${atleta.nome}</h3>
                            <p class="text-xs text-slate-300">${atleta.nac} • ${atleta.idade} anos • Contratado 2024</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-gelo p-4 rounded-xl border border-slate-200 text-center">
                            <span class="block text-xs font-bold uppercase text-slate-500">Jogos na Temporada</span>
                            <span class="font-sport text-2xl font-bold text-america-900 mt-1 block">${atleta.jogos}</span>
                        </div>
                        <div class="bg-gelo p-4 rounded-xl border border-slate-200 text-center">
                            <span class="block text-xs font-bold uppercase text-slate-500">Minutagem em Campo</span>
                            <span class="font-sport text-2xl font-bold text-america-900 mt-1 block">${atleta.minutos}</span>
                        </div>
                    </div>

                    <div class="bg-emerald-50 border border-emerald-500/30 p-4 rounded-xl">
                        <span class="block text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-1">Destaque na Temporada</span>
                        <p class="font-display font-bold text-america-900 text-base">${atleta.destaque}</p>
                    </div>

                    <div>
                        <h4 class="font-display font-bold text-sm text-america-900 mb-2 uppercase tracking-wider">Histórico & Perfil Tático</h4>
                        <p class="text-sm text-slate-600 leading-relaxed">${atleta.bio}</p>
                    </div>

                    <button onclick="closeModal()" class="w-full py-3.5 bg-america-900 text-white hover:bg-america-800 font-display font-extrabold text-xs uppercase tracking-wider rounded-xl transition">
                        Fechar Ficha
                    </button>
                </div>
            `;
  setModalFullscreen(false);
  document.getElementById("universal-modal").classList.remove("hidden");
}
function openNewsModal(id) {
  const noticia = AMERICA_DATA.noticias.find((n) => n.id === id);
  if (!noticia) return;

  document.getElementById("modal-tag").innerText =
    `Sala de Imprensa • ${noticia.categoria}`;
  document.getElementById("modal-body").innerHTML = `
                <div class="space-y-5 max-w-3xl mx-auto">
                    <div class="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-3">
                        <span><i class="fa-solid fa-calendar mr-1 text-america-700"></i>${noticia.data}</span>
                        <span><i class="fa-solid fa-user-pen mr-1 text-america-700"></i>${noticia.autor}</span>
                    </div>
                    <h2 class="font-display text-2xl sm:text-3xl font-black text-america-900 leading-snug">${noticia.titulo}</h2>
                    ${noticia.imagem ? `<div class="rounded-2xl overflow-hidden"><img src="${noticia.imagem}" alt="${noticia.titulo}" class="w-full h-64 sm:h-96 object-cover" onerror="this.parentElement.style.display='none'"></div>` : ""}
                    <div class="text-sm text-slate-700 space-y-4 leading-relaxed pt-2">
                        ${noticia.conteudo}
                    </div>
                    <div class="pt-4 border-t border-slate-100 flex justify-end">
                        <button onclick="closeModal()" class="px-6 py-3 bg-america-900 text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-america-800 transition">
                            Fechar Notícia
                        </button>
                    </div>
                </div>
            `;
  setModalFullscreen(true);
  document.getElementById("universal-modal").classList.remove("hidden");
  document.getElementById("modal-body").scrollTop = 0;
}

// ==================== TELA CHEIA DO MODAL ====================
// Aplica os estilos direto no elemento (não depende do style.css nem de cache)
function setModalFullscreen(ativo) {
  const modal = document.getElementById("universal-modal");
  const panel = document.getElementById("modal-panel");
  const body = document.getElementById("modal-body");
  modal.classList.toggle("modal-fullscreen", ativo);

  const v = (valor) => (ativo ? valor : "");
  Object.assign(modal.style, {
    padding: v("0"),
    alignItems: v("stretch"),
    overflow: v("hidden"),
  });
  Object.assign(panel.style, {
    maxWidth: v("none"),
    width: v("100%"),
    height: v("100%"),
    margin: v("0"),
    border: v("0"),
    borderRadius: v("0"),
    display: v("flex"),
    flexDirection: v("column"),
  });
  Object.assign(body.style, {
    maxHeight: v("none"),
    flex: v("1 1 auto"),
    minHeight: v("0"),
  });
  // Trava a rolagem da página ao fundo enquanto está em tela cheia
  document.body.style.overflow = ativo ? "hidden" : "";
}

// ==================== FECHAR MODAL ====================
function closeModal() {
  setModalFullscreen(false);
  document.getElementById("universal-modal").classList.add("hidden");
  document.getElementById("modal-body").innerHTML = "";
}

// Fecha com a tecla Esc e ao clicar fora da janela
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document.getElementById("universal-modal").addEventListener("click", (e) => {
  if (e.target.id === "universal-modal") closeModal();
});

// ==================== NOTIFICAÇÃO TOAST ====================
function showToast(mensagem) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className =
    "fade-in pointer-events-auto bg-america-900 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl border border-america-700 max-w-xs";
  toast.textContent = mensagem;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Mostra a mensagem e abre o link externo após alguns segundos
function openExternalLink(event, url, mensagem, delayMs = 2500) {
  event.preventDefault();
  showToast(mensagem);
  // Abre a aba já no clique (evita bloqueio de pop-up) e redireciona depois do atraso
  const novaAba = window.open("about:blank", "_blank");
  setTimeout(() => {
    if (novaAba) {
      novaAba.opener = null;
      novaAba.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, delayMs);
}
