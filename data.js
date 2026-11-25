const AMERICA_DATA = {
  gestao: [
    {
      cargo: "Presidência",
      icone: "fa-landmark",
      nome: "Maria Eduarda",
        subtitulo: "Presidente Fundadora",
        foto: "img/gestao/maria-eduarda.jpeg",
      bio: "Responsável pela estruturação institucional, administrativa e esportiva do América Clube em Mococa.",
      ativo: true,
    },
    {
      cargo: "Vice-Presidência",
      icone: "fa-user-tie",
      nome: "A definir",
      subtitulo: "Em processo de nomeação",
      foto: "",
      bio: "Cargo em aberto para composição da diretoria executiva.",
      ativo: false,
    },
    {
      cargo: "Diretoria de Futebol",
      icone: "fa-futbol",
      nome: "A definir",
      subtitulo: "Planejamento esportivo e elenco",
      foto: "",
      bio: "Responsável pela gestão do elenco, comissão técnica e competições.",
      ativo: false,
    },
    {
      cargo: "Comercial & Finanças",
      icone: "fa-handshake",
      nome: "A definir",
      subtitulo: "Captação de recursos e parcerias",
      foto: "",
      bio: "Foco em patrocínios locais, transparência financeira e relacionamento.",
      ativo: false,
    },
  ],
  modalidades: {
    futebol: {
      nome: "Futebol Campo",
      competicao: "A definir",
      arena: "A definir",
      icone: "fa-futbol",
      descricao:
        "Equipe principal do clube, formada por atletas da região e focada em representar Mococa com garra e dedicação. Um projeto independente que está dando os primeiros passos, crescendo jogo a jogo e buscando apoio para construir seu próprio futuro.",
      comissao: [
        { cargo: "Técnico", nome: "A definir", cert: "", foto: "", ativo: false },
        { cargo: "Auxiliar Técnico", nome: "A definir", cert: "", foto: "", ativo: false },
        { cargo: "Preparador Físico", nome: "A definir", cert: "", foto: "", ativo: false },
        { cargo: "Executivo de Futebol", nome: "A definir", cert: "", foto: "", ativo: false },
      ],
      atletas: [
        { num: 4, nome: "Andry Abreu", pos: "Zagueiro", idade: 17, nac: "Brasil", foto: "img/atletas/andry.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 1, nome: "João Vitor", pos: "Zagueiro", idade: 0, nac: "Brasil", foto: "img/atletas/joao-vitor.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 3, nome: "Lucas Gabriel", pos: "Zagueiro", idade: 26, nac: "Brasil", foto: "img/atletas/lucas.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 2, nome: "Vinícius", pos: "Zagueiro", idade: 0, nac: "Brasil", foto: "img/atletas/vinicius.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 0, nome: "Gustavo", pos: "Lateral Esquerdo", idade: 23, nac: "Brasil", foto: "img/atletas/gustavo.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 6, nome: "Ryan Abreu", pos: "Lateral Direito", idade: 24, nac: "Brasil", foto: "img/atletas/ryan.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 15, nome: "Wellington", pos: "Lateral Direito", idade: 0, nac: "Brasil", foto: "img/atletas/wellington.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 12, nome: "Hiago", pos: "Meio Campo", idade: 0, nac: "Brasil", foto: "img/atletas/hiago.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 7, nome: "Valdir Jr", pos: "Meio Campo", idade: 25, nac: "Brasil", foto: "img/atletas/valdir.jpg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 8, nome: "Raul Rocha", pos: "Meio Campo", idade: 0, nac: "Brasil", foto: "img/atletas/raul.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 5, nome: "Renan Henrique", pos: "Volante", idade: 17, nac: "Brasil", foto: "img/atletas/renan.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 10, nome: "Weverton", pos: "Meio Campo", idade: 0, nac: "Brasil", foto: "img/atletas/weverton.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 9, nome: "Luis Henrique", pos: "Atacante", idade: 0, nac: "Brasil", foto: "img/atletas/luis.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
        { num: 15, nome: "Victor Henrique", pos: "Atacante", idade: 17, nac: "Brasil", foto: "img/atletas/victor.jpeg", jogos: 0, minutos: "", bio: "", destaque: "" },
      ],
    },
  },
  noticias: [
    {
      id: 1,
      categoria: "Futebol",
      titulo: "América Clube é oficialmente fundado",
      resumo: "Após longas conversas, o América Clube foi oficialmente fundado.",
      data: "23 Nov 2026",
      autor: "Assessoria de Imprensa AC",
      
      imagemIcone: "fa-futbol",
      imagem: "img/clube/escudo-america.jpeg",
      conteudo: `
        <p class="mb-4">No dia 23 de novembro de 2026, o América Clube foi oficialmente fundado. A criação da equipe aconteceu após diversas conversas para definir cada detalhe minuciosamente, dando o pontapé inicial em um projeto feito com dedicação e paixão pelo futebol amador.</p>
        <p class="mb-4">Com os pés no chão e muita vontade de vencer dentro de campo, o clube inicia sua trajetória em busca da glória, pronto para encarar os desafios e construir uma identidade forte.</p>
        <p>O América Clube convida você, que acompanha este momento desde o início, a fazer parte dessa história e torcer junto ao time em cada passo dessa caminhada.</p>
      `,
    },
  ],
  historia: [
    {
      ano: "2026",
      titulo: "A Fundação Alviverde",
      desc: "Em 23 de novembro de 2026, jovens esportistas fundam o América Clube com a missão de unir excelência atlética, inclusão social e o verde esmeralda como símbolo de esperança e vitória.",
    },
  ],
};
