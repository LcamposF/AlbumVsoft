"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

const CREDITOS_DIARIOS = 3;


const CUSTO_TROCA: Record<string, number> = {
  ÉPICA: 3,
  RARA: 5,
  LENDÁRIA: 8,
  SECRETA: 15,
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const stickers = [
  {
    id: 1,
    nome: "Hadassa",
    imagem: "/images/hadassa.png",
    raridade: "RARA",
    stats: { caf: 92, foc: 88, bug: 81, call: 75, res: 96 },
  },
  {
    id: 2,
    nome: "Hélio",
    imagem: "/images/helio.png",
    raridade: "ÉPICA",
    stats: { caf: 80, foc: 91, bug: 86, call: 70, res: 78 },
  },
  {
    id: 3,
    nome: "Jéssica",
    imagem: "/images/jessica.png",
    raridade: "LENDÁRIA",
    stats: { caf: 97, foc: 94, bug: 90, call: 89, res: 85 },
  },
  {
    id: 4,
    nome: "Keren",
    imagem: "/images/keren.png",
    raridade: "RARA",
    stats: { caf: 85, foc: 90, bug: 76, call: 98, res: 88 },
  },
  {
    id: 5,
    nome: "Luana",
    imagem: "/images/luana.png",
    raridade: "ÉPICA",
    stats: { caf: 99, foc: 87, bug: 79, call: 92, res: 91 },
  },
  {
    id: 6,
    nome: "Egliselma",
    imagem: "/images/egliselma.png",
    raridade: "LENDÁRIA",
    stats: { caf: 89, foc: 96, bug: 88, call: 83, res: 93 },
  },
  {
    id: 7,
    nome: "Vinicius Sena",
    imagem: "/images/sena.png",
    raridade: "RARA",
    stats: { caf: 78, foc: 92, bug: 84, call: 74, res: 80 },
  },
  {
    id: 8,
    nome: "Lara",
    imagem: "/images/lara.png",
    raridade: "ÉPICA",
    stats: { caf: 86, foc: 91, bug: 78, call: 84, res: 90 },
  },
  {
    id: 9,
    nome: "Gutemberg",
    imagem: "/images/gutemberg.png",
    raridade: "RARA",
    stats: { caf: 88, foc: 93, bug: 89, call: 76, res: 82 },
  },
  {
    id: 10,
    nome: "Bianca",
    imagem: "/images/bianca.png",
    raridade: "RARA",
    stats: { caf: 90, foc: 89, bug: 80, call: 87, res: 94 },
  },
  {
    id: 11,
    nome: "Rayssa",
    imagem: "/images/rayssa.png",
    raridade: "RARA",
    stats: { caf: 84, foc: 92, bug: 83, call: 88, res: 91 },
  },
  {
    id: 12,
    nome: "Vinicius Cruz",
    imagem: "/images/cruz.png",
    raridade: "ÉPICA",
    stats: { caf: 91, foc: 95, bug: 90, call: 82, res: 87 },
  },
  {
    id: 13,
    nome: "Pricilla",
    imagem: "/images/pricilla.png",
    raridade: "ÉPICA",
    stats: { caf: 90, foc: 93, bug: 82, call: 85, res: 80 },
  },
  {
    id: 14,
    nome: "Fábio",
    imagem: "/images/fabio.png",
    raridade: "RARA",
    stats: { caf: 85, foc: 92, bug: 84, call: 79, res: 88 },
  },
  {
    id: 15,
    nome: "Brendo",
    imagem: "/images/brendo.png",
    raridade: "ÉPICA",
    stats: { caf: 84, foc: 88, bug: 89, call: 82, res: 87 },
  },
  {
    id: 16,
    nome: "Weslley",
    imagem: "/images/wes.png",
    raridade: "LENDÁRIA",
    stats: { caf: 94, foc: 98, bug: 92, call: 90, res: 89 },
  },
  {
    id: 17,
    nome: "Vinicius Ribeiro",
    imagem: "/images/ribeiro.png",
    raridade: "ÉPICA",
    stats: { caf: 80, foc: 87, bug: 82, call: 79, res: 81 },
  },
  {
    id: 18,
    nome: "Huily",
    imagem: "/images/huily.png",
    raridade: "ÉPICA",
    stats: { caf: 89, foc: 91, bug: 84, call: 81, res: 80 },
  },
  {
    id: 19,
    nome: "Gabriela",
    imagem: "/images/gabriela.png",
    raridade: "ÉPICA",
    stats: { caf: 89, foc: 87, bug: 88, call: 78, res: 89 },
  },
  {
    id: 20,
    nome: "Louise",
    imagem: "/images/louise.png",
    raridade: "ÉPICA",
    stats: { caf: 86, foc: 90, bug: 85, call: 80, res: 84 },
  },
  {
    id: 21,
    nome: "Wanderson",
    imagem: "/images/wanderson.png",
    raridade: "RARA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 22,
    nome: "Vinicius H.",
    imagem: "/images/viniciush.png",
    raridade: "RARA",
    stats: { caf: 87, foc: 90, bug: 86, call: 80, res: 85 },
  },
  {
    id: 23,
    nome: "João V.",
    imagem: "/images/joaov.png",
    raridade: "RARA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 24,
    nome: "Yago",
    imagem: "/images/yago.png",
    raridade: "ÉPICA",
    stats: { caf: 88, foc: 92, bug: 84, call: 79, res: 90 },
  },
  {
    id: 25,
    nome: "Paulo",
    imagem: "/images/paulo.png",
    raridade: "ÉPICA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 26,
    nome: "Ícaro",
    imagem: "/images/icaro.png",
    raridade: "LENDÁRIA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 27,
    nome: "Flávio B.",
    imagem: "/images/flavio.png",
    raridade: "RARA",
    stats: { caf: 88, foc: 92, bug: 84, call: 79, res: 90 },
  },
  {
    id: 28,
    nome: "Anderson",
    imagem: "/images/anderson.png",
    raridade: "ÉPICA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 29,
    nome: "Carlos",
    imagem: "/images/carlos.png",
    raridade: "LENDÁRIA",
    stats: { caf: 85, foc: 90, bug: 82, call: 78, res: 89 },
  },
  {

    id: 30,
    nome: "Lucas Eduardo",
    imagem: "/images/lucas.png",
    raridade: "RARA",
    stats: { caf: 80, foc: 85, bug: 78, call: 75, res: 82 },
  },
  {
    id: 31,
    nome: "Vivian",
    imagem: "/images/vivian.png",
    raridade: "ÉPICA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 32,
    nome: "Alyne",
    imagem: "/images/alyne.png",
    raridade: "LENDÁRIA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 33,
    nome: "Willian Roberto",
    imagem: "/images/willian.png",
    raridade: "LENDÁRIA",
    stats: { caf: 85, foc: 90, bug: 82, call: 78, res: 89 },
  },
  {
    id: 34,
    nome: "Cleibia",
    imagem: "/images/cleibia.png",
    raridade: "RARA",
    stats: { caf: 80, foc: 85, bug: 78, call: 75, res: 82 },
  },
  {
    id: 35,
    nome: "Renata",
    imagem: "/images/renata.png",
    raridade: "RARA",
    stats: { caf: 82, foc: 88, bug: 80, call: 77, res: 86 },
  },
  {
    id: 36,
    nome: "Arthur L.",
    imagem: "/images/arthur.png",
    raridade: "ÉPICA",
    stats: { caf: 88, foc: 92, bug: 84, call: 79, res: 90 },
  },
  {
    id: 37,
    nome: "josé",
    imagem: "/images/jose.png",
    raridade: "LENDÁRIA",
    stats: { caf: 80, foc: 85, bug: 78, call: 75, res: 82 },
  },
  {
    id: 50,
    nome: "The Boss",
    imagem: "/images/boss.png",
    raridade: "SECRETA",
    secreto: true,
    stats: { caf: 100, foc: 100, bug: 100, call: 100, res: 100 },
  },
];

function Stats({ stats, menor = false }: any) {
  return (
    <div className={menor ? "stats stats-menor" : "stats"}>
      <div>
        <span title="Sobrevive no café">CAF</span>
        <strong>{stats.caf}</strong>
      </div>

      <div>
        <span title="Foco na missão">FOC</span>
        <strong>{stats.foc}</strong>
      </div>

      <div>
        <span title="Detector de bugs">BUG</span>
        <strong>{stats.bug}</strong>
      </div>

      <div>
        <span title="Modo reunião">CALL</span>
        <strong>{stats.call}</strong>
      </div>

      <div>
        <span title="Resenha">RES</span>
        <strong>{stats.res}</strong>
      </div>
    </div>
  );
}

function classeRaridade(raridade: string) {
  if (raridade === "ÉPICA") return "epica";
  if (raridade === "RARA") return "rara";
  if (raridade === "LENDÁRIA") return "lendaria";
  return "secreta";
}

export default function Home() {
  const [figurinha, setFigurinha] = useState<any>(null);
  const [colecao, setColecao] = useState<any[]>([]);
  const [repetida, setRepetida] = useState(false);
  const [abrindo, setAbrindo] = useState(false);
  const [creditos, setCreditos] = useState(CREDITOS_DIARIOS);
  const [coins, setCoins] = useState(0);
  const [albumAberto, setAlbumAberto] = useState(false);
  const [duplicatas, setDuplicatas] = useState(0);
  const [mensagemTroca, setMensagemTroca] = useState("");
  const [figurinhaEscolhidaTroca, setFigurinhaEscolhidaTroca] = useState("");
  const [trocaAberta, setTrocaAberta] = useState(false);
  const [raridadeSuspense, setRaridadeSuspense] = useState("");
  const [nomeDono, setNomeDono] = useState("");
  const [editandoNome, setEditandoNome] = useState(false);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [codigoUsadoHoje, setCodigoUsadoHoje] = useState(false);
  const [mensagemCodigo, setMensagemCodigo] = useState("");
  const [codigoDiario, setCodigoDiario] = useState("");
const [creditosCodigo, setCreditosCodigo] = useState(1);
  const [ranking, setRanking] = useState<any[]>([]);
  const [carregandoRanking, setCarregandoRanking] = useState(false);

  useEffect(() => {
    const hoje = new Date().toDateString();

    const colecaoSalva = localStorage.getItem("team-vsoft-colecao");
    const creditosSalvos = localStorage.getItem("team-vsoft-creditos");
    const dataSalva = localStorage.getItem("team-vsoft-data");
    const coinsSalvas = localStorage.getItem("team-vsoft-coins");
    const duplicatasSalvas = localStorage.getItem("team-vsoft-duplicatas");
    const nomeSalvo = localStorage.getItem("team-vsoft-nome-dono");
    const dataCodigoUsado = localStorage.getItem("team-vsoft-codigo-data");

    if (colecaoSalva) setColecao(JSON.parse(colecaoSalva));
    if (coinsSalvas) setCoins(Number(coinsSalvas));
    if (duplicatasSalvas) setDuplicatas(Number(duplicatasSalvas));
    if (nomeSalvo) setNomeDono(nomeSalvo);
    if (dataCodigoUsado === hoje) setCodigoUsadoHoje(true);

    if (dataSalva === hoje && creditosSalvos) {
      setCreditos(Number(creditosSalvos));
    } else {
      setCreditos(CREDITOS_DIARIOS);
      localStorage.setItem("team-vsoft-creditos", String(CREDITOS_DIARIOS));
      localStorage.setItem("team-vsoft-data", hoje);
    }

    carregarRanking();
    carregarCodigoDiario();
  }, []);

  useEffect(() => {
    localStorage.setItem("team-vsoft-colecao", JSON.stringify(colecao));
  }, [colecao]);

  useEffect(() => {
    localStorage.setItem("team-vsoft-creditos", String(creditos));
  }, [creditos]);

  useEffect(() => {
    localStorage.setItem("team-vsoft-coins", String(coins));
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("team-vsoft-duplicatas", String(duplicatas));
  }, [duplicatas]);

  useEffect(() => {
    localStorage.setItem("team-vsoft-nome-dono", nomeDono);
  }, [nomeDono]);

  useEffect(() => {
    if (nomeDono.trim()) {
      salvarRanking();
    }
  }, [colecao, coins, duplicatas]);

  async function carregarRanking() {
    setCarregandoRanking(true);

    const { data, error } = await supabase
      .from("ranking")
      .select("*")
      .order("progresso", { ascending: false })
      .order("coletadas", { ascending: false })
      .order("atualizado_em", { ascending: true });

    if (error) {
      console.error("Erro ao carregar ranking:", error);
      setCarregandoRanking(false);
      return;
    }

    if (data) {
      setRanking(data);
    }

    setCarregandoRanking(false);
  }

  async function salvarRanking() {
    const nomeTratado = nomeDono.trim();

    if (!nomeTratado) return;

    const progressoAtual = Math.round((colecao.length / stickers.length) * 100);

    const { error } = await supabase.from("ranking").upsert(
      {
        nome: nomeTratado,
        coletadas: colecao.length,
        total: stickers.length,
        progresso: progressoAtual,
        coins,
        duplicatas,
        atualizado_em: new Date().toISOString(),
      },
      {
        onConflict: "nome",
      }
    );

    if (error) {
      console.error("Erro ao salvar ranking:", error);
      return;
    }

    carregarRanking();
  }
  async function carregarCodigoDiario() {
  const hoje = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("codigos_diarios")
    .select("codigo, creditos")
    .eq("data", hoje)
    .eq("ativo", true)
    .single();

  if (error) {
    console.error("Erro ao carregar código diário:", error);
    setCodigoDiario("");
    return;
  }

  setCodigoDiario(data.codigo.toUpperCase());
  setCreditosCodigo(data.creditos);
}
  function resgatarCodigo() {
  const hoje = new Date().toDateString();
  const codigoTratado = codigoDigitado.trim().toUpperCase();

  if (codigoUsadoHoje) {
    setMensagemCodigo("Código diário já usado hoje.");
    return;
  }

  if (!codigoDiario) {
    setMensagemCodigo("Nenhum código diário ativo hoje.");
    return;
  }

  if (codigoTratado !== codigoDiario) {
    setMensagemCodigo("Código inválido.");
    return;
  }

  setCreditos(creditos + creditosCodigo);
  setCodigoUsadoHoje(true);
  setCodigoDigitado("");
  setMensagemCodigo(`Código aceito! +${creditosCodigo} crédito(s).`);
  localStorage.setItem("team-vsoft-codigo-data", hoje);
}

  function salvarNome() {
    const nomeTratado = nomeDono.trim();

    if (!nomeTratado) return;

    setNomeDono(nomeTratado);
    setEditandoNome(false);

    setTimeout(() => {
      salvarRanking();
    }, 100);
  }
  

  function sortearRaridade() {
    const numero = Math.random() * 100;

    if (numero > 99) return "SECRETA";
    if (numero > 94) return "LENDÁRIA";
    if (numero > 65) return "RARA";

    return "ÉPICA";
  }

  function abrirPacotinho() {
    if (creditos <= 0 || abrindo) return;

    setCreditos(creditos - 1);
    setAbrindo(true);
    setRepetida(false);
    setMensagemTroca("");
    setRaridadeSuspense("ÉPICA");

    setTimeout(() => setRaridadeSuspense("RARA"), 350);
    setTimeout(() => setRaridadeSuspense("LENDÁRIA"), 700);
    setTimeout(() => setRaridadeSuspense("SECRETA"), 950);

    setTimeout(() => {
      const raridadeEscolhida = sortearRaridade();

      setRaridadeSuspense(raridadeEscolhida);

      let filtradas = stickers.filter(
        (item) => item.raridade === raridadeEscolhida
      );

      if (filtradas.length === 0) {
        filtradas = stickers;
      }

      const novasDaRaridade = filtradas.filter(
        (item) => !colecao.some((card) => card.id === item.id)
      );

      const repetidasDaRaridade = filtradas.filter((item) =>
        colecao.some((card) => card.id === item.id)
      );

      const progressoAtual = colecao.length / stickers.length;

      let chanceNova = 0.7;

      if (progressoAtual > 0.3) chanceNova = 0.5;
      if (progressoAtual > 0.5) chanceNova = 0.35;
      if (progressoAtual > 0.7) chanceNova = 0.2;
      if (progressoAtual > 0.9) chanceNova = 0.1;

      if (raridadeEscolhida === "LENDÁRIA") {
        chanceNova -= 0.15;
      }

      if (raridadeEscolhida === "SECRETA") {
        chanceNova -= 0.25;
      }

      chanceNova = Math.max(chanceNova, 0.1);

      const pegarNova =
        novasDaRaridade.length > 0 && Math.random() < chanceNova;

      let opcoesParaSortear = [];

      if (pegarNova) {
        opcoesParaSortear = novasDaRaridade;
      } else if (repetidasDaRaridade.length > 0) {
        opcoesParaSortear = repetidasDaRaridade;
      } else {
        opcoesParaSortear = filtradas;
      }

      const aleatoria =
        opcoesParaSortear[
          Math.floor(Math.random() * opcoesParaSortear.length)
        ];

      setTimeout(() => {
        setFigurinha(aleatoria);

        const jaTem = colecao.find((item) => item.id === aleatoria.id);

        if (jaTem) {
          setRepetida(true);
          setCoins((valorAtual) => valorAtual + 10);
          setDuplicatas((valorAtual) => valorAtual + 1);
        } else {
          setColecao([...colecao, aleatoria]);
        }

        setAbrindo(false);
        setRaridadeSuspense("");
      }, 700);
    }, 1300);
  }

  function comprarCredito() {
    if (coins < 100) return;

    setCoins(coins - 100);
    setCreditos(creditos + 1);
  }

  function trocarDuplicatas() {
    if (!figurinhaSelecionada) {
      setMensagemTroca("Escolha uma figurinha para trocar.");
      return;
    }

    if (colecao.some((card) => card.id === figurinhaSelecionada.id)) {
      setMensagemTroca("Você já tem essa figurinha.");
      return;
    }

    if (duplicatas < custoTroca) {
      setMensagemTroca(
        `Você precisa de ${custoTroca} duplicatas para trocar por ${
          figurinhaSelecionada.secreto
            ? "a carta secreta"
            : figurinhaSelecionada.nome
        }.`
      );
      return;
    }

    setColecao([...colecao, figurinhaSelecionada]);
    setFigurinha(figurinhaSelecionada);
    setRepetida(false);
    setDuplicatas(duplicatas - custoTroca);
    setMensagemTroca(
      `Troca realizada! Você recebeu ${
        figurinhaSelecionada.secreto
          ? "uma carta secreta"
          : figurinhaSelecionada.nome
      }.`
    );
    setFigurinhaEscolhidaTroca("");
    setTrocaAberta(false);
  }

  function resetarAlbum() {
    setColecao([]);
    setFigurinha(null);
    setRepetida(false);
    setCreditos(CREDITOS_DIARIOS);
    setCoins(0);
    setDuplicatas(0);
    setMensagemTroca("");
    setFigurinhaEscolhidaTroca("");
    setRaridadeSuspense("");
    setCodigoDigitado("");
    setCodigoUsadoHoje(false);
    setMensagemCodigo("");

    localStorage.removeItem("team-vsoft-colecao");
    localStorage.removeItem("team-vsoft-coins");
    localStorage.removeItem("team-vsoft-duplicatas");
    localStorage.removeItem("team-vsoft-codigo-data");
    localStorage.setItem("team-vsoft-creditos", String(CREDITOS_DIARIOS));
    localStorage.setItem("team-vsoft-data", new Date().toDateString());
  }

  const progresso = Math.round((colecao.length / stickers.length) * 100);
  const albumCompleto = colecao.length === stickers.length;

  const faltantes = stickers.filter(
    (item) => !colecao.some((card) => card.id === item.id)
  );

  const figurinhaSelecionada = stickers.find(
    (item) => String(item.id) === figurinhaEscolhidaTroca
  );

  const custoTroca = figurinhaSelecionada
    ? CUSTO_TROCA[figurinhaSelecionada.raridade]
    : 0;

  return (
    <main className="home">
      <section className="album">
        <div className="album-topo">
          <div className="album-titulo">
            <h2>📚 Meu álbum</h2>

            {!editandoNome && nomeDono && (
              <button className="album-dono" onClick={() => setEditandoNome(true)}>
                {nomeDono}
              </button>
            )}

            {!editandoNome && !nomeDono && (
              <button className="album-dono" onClick={() => setEditandoNome(true)}>
                Adicionar nome
              </button>
            )}

            {editandoNome && (
              <div className="nome-form">
                <input
                  value={nomeDono}
                  onChange={(event) => setNomeDono(event.target.value)}
                  placeholder="Digite seu nome"
                />

                <button onClick={salvarNome}>OK</button>
              </div>
            )}
          </div>

          <button className="botao-expandir" onClick={() => setAlbumAberto(true)}>
            Visualizar
          </button>
        </div>

        <div className="trocas">
          <span>
            Duplicatas: <strong>{duplicatas}</strong>
          </span>

          <div className="troca-select">
  <button
    type="button"
    className="troca-select-botao"
    onClick={() => setTrocaAberta(!trocaAberta)}
    disabled={albumCompleto}
  >
    <span>
      {figurinhaSelecionada
        ? `${figurinhaSelecionada.secreto ? "?????" : figurinhaSelecionada.nome} - ${
            figurinhaSelecionada.raridade
          }`
        : "Escolha uma figurinha"}
    </span>

    <strong>⌄</strong>
  </button>

  {trocaAberta && !albumCompleto && (
    <div className="troca-menu">
      {faltantes.map((item) => (
        <button
          type="button"
          key={item.id}
          className={`troca-opcao troca-${classeRaridade(item.raridade)}`}
          onClick={() => {
            setFigurinhaEscolhidaTroca(String(item.id));
            setTrocaAberta(false);
          }}
        >
          <span>{item.secreto ? "?????" : item.nome}</span>

          <small>
  Custo: {CUSTO_TROCA[item.raridade]} duplicatas
</small>
        </button>
      ))}
    </div>
  )}
</div>

          <button
            className="botao-troca"
            onClick={trocarDuplicatas}
            disabled={!figurinhaSelecionada || duplicatas < custoTroca || albumCompleto}
          >
            {figurinhaSelecionada
              ? `Trocar por ${custoTroca} duplicatas`
              : "Escolha uma troca"}
          </button>

          {mensagemTroca && <p>{mensagemTroca}</p>}
        </div>

        <div className="grid">
          {stickers.map((item) => {
            const jaTenho = colecao.some((card) => card.id === item.id);

            return (
              <div
                className={jaTenho ? "mini-card" : "mini-card vazio"}
                key={item.id}
              >
                {jaTenho ? (
                  <>
                    <Image src={item.imagem} alt={item.nome} width={80} height={100} />
                    <span>{item.nome}</span>
                  </>
                ) : (
                  <>
                    <div className={item.secreto ? "slot-vazio secreto" : "slot-vazio"}>
                      ?
                    </div>
                    <span>{item.secreto ? "?????" : item.nome}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="area-figurinha">
        {abrindo && (
          <div className={`pack pack-${raridadeSuspense.toLowerCase()}`}>
            <div className="pack-card">
              <span>🇧🇷</span>
            </div>

            <div className="raridade-suspense">
              {raridadeSuspense || "REVELANDO"}
            </div>

            <p>Revelando figurinha...</p>
          </div>
        )}

        {figurinha && !abrindo && (
          <div className={`figurinha ${figurinha.raridade.toLowerCase()}`}>
            <Image
              src={figurinha.imagem}
              alt={figurinha.nome}
              width={250}
              height={350}
            />

            <h2>{figurinha.nome}</h2>
            <strong>{figurinha.raridade}</strong>

            <Stats stats={figurinha.stats} />
            
            

            {repetida && (
              <div className="repetida">
                🔁 Repetida! +10 coins e +1 duplicata
              </div>
            )}
          </div>
        )}

        {!figurinha && !abrindo && (
          <div className="card-vazio">
            <span>?</span>
            <p>Abra um pacotinho para revelar</p>
          </div>
        )}
      </section>

      <section className="card painel-principal">
        <h1>TEAM OPERAÇÕES - VSOFT 🏆</h1>
        <p>Álbum oficial</p>

        <div className="creditos">
          Créditos hoje: <strong>{creditos}/{CREDITOS_DIARIOS}</strong>
        </div>

        <div className="coins">
          🪙 Coins: <strong>{coins}</strong>
        </div>

        <div className="codigo-diario">
          <span>Código diário</span>

          <div>
            <input
              value={codigoDigitado}
              onChange={(event) => setCodigoDigitado(event.target.value)}
              placeholder="Digite o código"
              disabled={codigoUsadoHoje}
            />

            <button onClick={resgatarCodigo} disabled={codigoUsadoHoje}>
              OK
            </button>
          </div>

          {mensagemCodigo && <p>{mensagemCodigo}</p>}
        </div>

        <div className="progresso">
          <span>
            {colecao.length}/{stickers.length} figurinhas
          </span>

          <div className="barra">
            <div className="barra-preenchida" style={{ width: `${progresso}%` }} />
          </div>
        </div>

        {albumCompleto && <div className="completo">🏆 Álbum completo!</div>}

        <button onClick={abrirPacotinho} disabled={abrindo || creditos <= 0}>
          {abrindo
            ? "Abrindo..."
            : creditos > 0
            ? "Abrir pacotinho"
            : "Sem créditos hoje"}
        </button>

        <button className="botao-loja" onClick={comprarCredito} disabled={coins < 100}>
          Comprar +1 crédito por 100 coins
        </button>

        <button className="botao-reset" onClick={resetarAlbum}>
          Resetar álbum
        </button>

        <div className="ranking">
          <h2>🏆 Ranking geral</h2>

          {carregandoRanking && <p>Carregando ranking...</p>}

          {!carregandoRanking && ranking.length === 0 && (
            <p>Ninguém entrou no ranking ainda.</p>
          )}

          {!carregandoRanking &&
            ranking.map((jogador, index) => (
              <div className="ranking-item" key={jogador.id}>
                <strong>
                  {index + 1}. {jogador.nome}
                </strong>

                <span>
                  {jogador.coletadas}/{jogador.total}
                </span>
              </div>
            ))}
        </div>
      </section>

      {albumAberto && (
        <div className="modal-album">
          <div className="modal-conteudo">
            <div className="modal-topo">
              <h2>📚 Meu álbum</h2>

              <button className="botao-fechar" onClick={() => setAlbumAberto(false)}>
                Fechar
              </button>
            </div>

            <div className="album-grande">
              {stickers.map((item) => {
                const jaTenho = colecao.some((card) => card.id === item.id);

                return (
                  <div
                    className={jaTenho ? "card-album" : "card-album vazio"}
                    key={item.id}
                  >
                    {jaTenho ? (
                      <>
                        <Image
                          src={item.imagem}
                          alt={item.nome}
                          width={180}
                          height={250}
                        />

                        <h3>{item.nome}</h3>
                        <strong>{item.raridade}</strong>
                        <Stats stats={item.stats} menor />
                      </>
                    ) : (
                      <>
                        <div
                          className={
                            item.secreto
                              ? "card-bloqueado secreto"
                              : "card-bloqueado"
                          }
                        >
                          ?
                        </div>
                        <h3>{item.secreto ? "?????" : item.nome}</h3>
                        <strong>{item.secreto ? "Carta secreta" : "Não obtida"}</strong>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}