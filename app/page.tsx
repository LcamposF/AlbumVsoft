"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const stickers = [
  {
    id: 1,
    nome: "Hadassa",
    cargo: "Suporte Técnico",
    imagem: "/images/hadassa.png",
    raridade: "RARA",
  },
  {
    id: 2,
    nome: "Hélio",
    cargo: "Operações",
    imagem: "/images/helio.png",
    raridade: "ÉPICA",
  },
  {
    id: 3,
    nome: "Jéssica",
    cargo: "Suporte Técnico",
    imagem: "/images/jessica.png",
    raridade: "LENDÁRIA",
  },
  {
    id: 4,
    nome: "Keren",
    cargo: "Suporte Técnico",
    imagem: "/images/keren.png",
    raridade: "RARA",
  },
  {
    id: 5,
    nome: "Luana",
    cargo: "Suporte Técnico",
    imagem: "/images/luana.png",
    raridade: "ÉPICA",
  },
  {
    id: 6,
    nome: "Egliselma",
    cargo: "Suporte Técnico",
    imagem: "/images/egliselma.png",
    raridade: "LENDÁRIA",
  },
  {
    id: 7,
    nome: "Vinicius Sena",
    cargo: "Suporte Técnico",
    imagem: "/images/sena.png",
    raridade: "ÉPICA",
  },
];

export default function Home() {
  const [figurinha, setFigurinha] = useState<any>(null);
  const [colecao, setColecao] = useState<any[]>([]);
  const [repetida, setRepetida] = useState(false);
  const [abrindo, setAbrindo] = useState(false);
  const [creditos, setCreditos] = useState(3);
  const [coins, setCoins] = useState(0);
  const [albumAberto, setAlbumAberto] = useState(false);

  useEffect(() => {
    const hoje = new Date().toDateString();

    const colecaoSalva = localStorage.getItem("team-cup-colecao");
    const creditosSalvos = localStorage.getItem("team-cup-creditos");
    const dataSalva = localStorage.getItem("team-cup-data");
    const coinsSalvas = localStorage.getItem("team-cup-coins");

    if (colecaoSalva) {
      setColecao(JSON.parse(colecaoSalva));
    }

    if (coinsSalvas) {
      setCoins(Number(coinsSalvas));
    }

    if (dataSalva === hoje && creditosSalvos) {
      setCreditos(Number(creditosSalvos));
    } else {
      setCreditos(3);
      localStorage.setItem("team-cup-creditos", "3");
      localStorage.setItem("team-cup-data", hoje);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("team-cup-colecao", JSON.stringify(colecao));
  }, [colecao]);

  useEffect(() => {
    localStorage.setItem("team-cup-creditos", String(creditos));
  }, [creditos]);

  useEffect(() => {
    localStorage.setItem("team-cup-coins", String(coins));
  }, [coins]);

  function sortearRaridade() {
    const numero = Math.random() * 100;

    if (numero > 95) {
      return "LENDÁRIA";
    }

    if (numero > 80) {
      return "ÉPICA";
    }

    if (numero > 55) {
      return "RARA";
    }

    return "COMUM";
  }

  function abrirPacotinho() {
    if (creditos <= 0 || abrindo) {
      return;
    }

    setCreditos(creditos - 1);
    setAbrindo(true);
    setRepetida(false);

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
        opcoesParaSortear[
          Math.floor(Math.random() * opcoesParaSortear.length)
        ];

      setFigurinha(aleatoria);

      const jaTem = colecao.find((item) => item.id === aleatoria.id);

      if (jaTem) {
        setRepetida(true);
        setCoins((valorAtual) => valorAtual + 50);
      } else {
        setColecao([...colecao, aleatoria]);
      }

      setAbrindo(false);
    }, 900);
  }

  function resetarAlbum() {
    setColecao([]);
    setFigurinha(null);
    setRepetida(false);
    setCreditos(3);
    setCoins(0);

    localStorage.removeItem("team-cup-colecao");
    localStorage.removeItem("team-cup-coins");
    localStorage.setItem("team-cup-creditos", "3");
    localStorage.setItem("team-cup-data", new Date().toDateString());
  }

  function comprarCredito() {
    if (coins < 100) {
      return;
    }

    setCoins(coins - 100);
    setCreditos(creditos + 1);
  }

  const progresso = Math.round((colecao.length / stickers.length) * 100);
  const albumCompleto = colecao.length === stickers.length;

  return (
    <main className="home">
      <div className="card">
        <h1>🏆TEAM VSOFT</h1>

        <p>Álbum oficial do time</p>

        <div className="creditos">
          Créditos hoje: <strong>{creditos}/3</strong>
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
      </div>

      {abrindo && (
        <div className="pack">
          <div className="pack-card">✨</div>
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

          <span>{figurinha.cargo}</span>

          <strong>{figurinha.raridade}</strong>

          {repetida && (
            <div className="repetida">⚠️ Figurinha repetida! +50 coins</div>
          )}
        </div>
      )}

      <div className="album">
  <div className="album-topo">
    <h2>📚 Meu álbum</h2>

    <button
      className="botao-visualizar"
      onClick={() => setAlbumAberto(true)}
    >
      Visualizar
    </button>
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
                    <Image
                      src={item.imagem}
                      alt={item.nome}
                      width={80}
                      height={100}
                    />

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
      </div>
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