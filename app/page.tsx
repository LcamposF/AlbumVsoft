"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CREDITOS_DIARIOS = 3;
const CODIGO_DIARIO = "VSOFT2026";

const stickers = [
  {
    id: 1,
    nome: "Hadassa",
    imagem: "/images/hadassa.png",
    raridade: "ÉPICA",
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
  raridade: "ÉPICA",
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
  imagem: "/images/vinicius-cruz.png",
  raridade: "LENDÁRIA",
  stats: { caf: 91, foc: 95, bug: 90, call: 82, res: 87 },
},
  {
    id: 13,
    nome: "Boss Final",
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
  const [raridadeSuspense, setRaridadeSuspense] = useState("");
  const [nomeDono, setNomeDono] = useState("");
  const [editandoNome, setEditandoNome] = useState(false);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [codigoUsadoHoje, setCodigoUsadoHoje] = useState(false);
  const [mensagemCodigo, setMensagemCodigo] = useState("");

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

  function resgatarCodigo() {
    const hoje = new Date().toDateString();
    const codigoTratado = codigoDigitado.trim().toUpperCase();

    if (codigoUsadoHoje) {
      setMensagemCodigo("Código diário já usado hoje.");
      return;
    }

    if (codigoTratado !== CODIGO_DIARIO) {
      setMensagemCodigo("Código inválido.");
      return;
    }

    setCreditos(creditos + 1);
    setCodigoUsadoHoje(true);
    setCodigoDigitado("");
    setMensagemCodigo("Código aceito! +1 crédito.");
    localStorage.setItem("team-vsoft-codigo-data", hoje);
  }

  function salvarNome() {
    const nomeTratado = nomeDono.trim();

    if (!nomeTratado) return;

    setNomeDono(nomeTratado);
    setEditandoNome(false);
  }

  function sortearRaridade() {
    const numero = Math.random() * 100;

    if (numero > 98) return "SECRETA";
    if (numero > 92) return "LENDÁRIA";
    if (numero > 70) return "RARA";

    return "ÉPICA";
  }

  function abrirPacotinho() {
    if (creditos <= 0 || abrindo) return;

    setCreditos(creditos - 1);
    setAbrindo(true);
    setRepetida(false);
    setMensagemTroca("");
    setRaridadeSuspense("ÉPICA");

    setTimeout(() => {
      setRaridadeSuspense("RARA");
    }, 350);

    setTimeout(() => {
      setRaridadeSuspense("LENDÁRIA");
    }, 700);

    setTimeout(() => {
      setRaridadeSuspense("SECRETA");
    }, 950);

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

      const opcoesParaSortear =
        novasDaRaridade.length > 0 ? novasDaRaridade : filtradas;

      const aleatoria =
        opcoesParaSortear[Math.floor(Math.random() * opcoesParaSortear.length)];

      setTimeout(() => {
        setFigurinha(aleatoria);

        const jaTem = colecao.find((item) => item.id === aleatoria.id);

        if (jaTem) {
          setRepetida(true);
          setCoins((valorAtual) => valorAtual + 50);
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
    if (duplicatas < 3) {
      setMensagemTroca("Você precisa de 3 duplicatas para trocar.");
      return;
    }

    const faltantes = stickers.filter(
      (item) => !colecao.some((card) => card.id === item.id)
    );

    if (faltantes.length === 0) {
      setMensagemTroca("Seu álbum já está completo.");
      return;
    }

    const nova = faltantes[Math.floor(Math.random() * faltantes.length)];

    setColecao([...colecao, nova]);
    setFigurinha(nova);
    setRepetida(false);
    setDuplicatas(duplicatas - 3);
    setMensagemTroca(`Troca realizada! Você recebeu ${nova.nome}.`);
  }

  function resetarAlbum() {
    setColecao([]);
    setFigurinha(null);
    setRepetida(false);
    setCreditos(CREDITOS_DIARIOS);
    setCoins(0);
    setDuplicatas(0);
    setMensagemTroca("");
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

          <button
            className="botao-troca"
            onClick={trocarDuplicatas}
            disabled={duplicatas < 3 || albumCompleto}
          >
            Trocar 3 por 1 faltante
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
                🔁 Repetida! +50 coins e +1 duplicata
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
        <h1>🏆 TEAM VSOFT</h1>
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