"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CREDITOS_DIARIOS = 3;

const stickers = [
  { id: 1, nome: "Hadassa", imagem: "/images/hadassa.png", raridade: "ÉPICA" },
  { id: 2, nome: "Hélio", imagem: "/images/helio.png", raridade: "ÉPICA" },
  { id: 3, nome: "Jéssica", imagem: "/images/jessica.png", raridade: "LENDÁRIA" },
  { id: 4, nome: "Keren", imagem: "/images/keren.png", raridade: "RARA" },
  { id: 5, nome: "Luana", imagem: "/images/luana.png", raridade: "ÉPICA" },
  { id: 6, nome: "Egliselma", imagem: "/images/egliselma.png", raridade: "LENDÁRIA" },
  { id: 7, nome: "Vinicius Sena", imagem: "/images/sena.png", raridade: "RARA" },
];

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
  const [nomeDono, setNomeDono] = useState("");
const [editandoNome, setEditandoNome] = useState(false);

  useEffect(() => {
    const hoje = new Date().toDateString();

    const colecaoSalva = localStorage.getItem("team-vsoft-colecao");
    const creditosSalvos = localStorage.getItem("team-vsoft-creditos");
    const dataSalva = localStorage.getItem("team-vsoft-data");
    const coinsSalvas = localStorage.getItem("team-vsoft-coins");
    const duplicatasSalvas = localStorage.getItem("team-vsoft-duplicatas");
    const nomeSalvo = localStorage.getItem("team-vsoft-nome-dono");

    if (colecaoSalva) setColecao(JSON.parse(colecaoSalva));
    if (coinsSalvas) setCoins(Number(coinsSalvas));
    if (duplicatasSalvas) setDuplicatas(Number(duplicatasSalvas));
    if (nomeSalvo) setNomeDono(nomeSalvo);

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

function salvarNome() {
  const nomeTratado = nomeDono.trim();

  if (!nomeTratado) {
    return;
  }

  setNomeDono(nomeTratado);
  setEditandoNome(false);
}

  function sortearRaridade() {
    const numero = Math.random() * 100;

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

    setTimeout(() => {
      const raridadeEscolhida = sortearRaridade();

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
    }, 900);
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

    localStorage.removeItem("team-vsoft-colecao");
    localStorage.removeItem("team-vsoft-coins");
    localStorage.removeItem("team-vsoft-duplicatas");
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
      <button
        className="album-dono"
        onClick={() => setEditandoNome(true)}
      >
        {nomeDono}
      </button>
    )}

    {!editandoNome && !nomeDono && (
      <button
        className="album-dono"
        onClick={() => setEditandoNome(true)}
      >
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
                    <div className="slot-vazio">?</div>
                    <span>{item.nome}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="area-figurinha">
        {abrindo && (
          <div className="pack">
            <div className="pack-card">🇧🇷</div>
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

        <div className="progresso">
          <span>
            {colecao.length}/{stickers.length} figurinhas
          </span>

          <div className="barra">
            <div
              className="barra-preenchida"
              style={{ width: `${progresso}%` }}
            />
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

        <button
          className="botao-loja"
          onClick={comprarCredito}
          disabled={coins < 100}
        >
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

              <button
                className="botao-fechar"
                onClick={() => setAlbumAberto(false)}
              >
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
                      </>
                    ) : (
                      <>
                        <div className="card-bloqueado">?</div>
                        <h3>{item.nome}</h3>
                        <strong>Não obtida</strong>
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