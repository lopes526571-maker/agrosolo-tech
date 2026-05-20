"use client";

import { useState } from "react";

export default function Home() {
  const [cultura, setCultura] = useState("Pastagem");

  const [ph, setPh] = useState("");
  const [fosforo, setFosforo] = useState("");
  const [potassio, setPotassio] = useState("");
  const [calcio, setCalcio] = useState("");
  const [magnesio, setMagnesio] = useState("");
  const [ctc, setCtc] = useState("");

  const [resultado, setResultado] = useState("");
  const [vBase, setVBase] = useState("");

  function analisarSolo() {
    let recomendacoes = [];

    const v =
      ((Number(calcio) +
        Number(magnesio) +
        Number(potassio)) /
        Number(ctc)) *
      100;

    setVBase(v.toFixed(1));

    // pH

    if (Number(ph) < 5.5) {
      recomendacoes.push(
        "Aplicar calcário para correção da acidez."
      );
    } else {
      recomendacoes.push(
        "pH adequado para desenvolvimento."
      );
    }

    // Fósforo

    if (Number(fosforo) < 15) {
      recomendacoes.push(
        "Fósforo baixo. Fazer adubação fosfatada."
      );
    } else {
      recomendacoes.push(
        "Fósforo adequado."
      );
    }

    // Potássio

    if (Number(potassio) < 40) {
      recomendacoes.push(
        "Potássio baixo. Fazer correção."
      );
    } else {
      recomendacoes.push(
        "Potássio adequado."
      );
    }

    // Cultura

    if (
      cultura === "Pastagem" &&
      v < 50
    ) {
      recomendacoes.push(
        "Pastagem precisa elevar V%."
      );
    }

    if (
      cultura === "Soja" &&
      v < 60
    ) {
      recomendacoes.push(
        "Soja precisa maior fertilidade."
      );
    }

    if (
      cultura === "Milho" &&
      v < 65
    ) {
      recomendacoes.push(
        "Milho exige solo mais corrigido."
      );
    }

    if (
      cultura === "Café" &&
      v < 70
    ) {
      recomendacoes.push(
        "Café necessita alta saturação por bases."
      );
    }

    setResultado(
      recomendacoes.join(" ")
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "30px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* TOPO */}

      <div
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          borderRadius: "25px",
          padding: "40px",
          marginBottom: "30px",
          border:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            color: "#00ff88",
            marginBottom: "10px",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            fontSize: "28px",
            color: "white",
          }}
        >
          Inteligência em Interpretação de Solo
        </p>

        <p
          style={{
            opacity: 0.8,
            marginTop: "10px",
          }}
        >
          Baseado no Boletim 100
        </p>
      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* FORM */}

        <div
          style={{
            background:
              "rgba(0,0,0,0.55)",
            backdropFilter:
              "blur(10px)",
            borderRadius: "25px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              fontSize: "40px",
              marginBottom: "25px",
            }}
          >
            🌱 Dados da Análise
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <select
              value={cultura}
              onChange={(e) =>
                setCultura(
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option>
                Pastagem
              </option>

              <option>
                Soja
              </option>

              <option>
                Milho
              </option>

              <option>
                Café
              </option>
            </select>

            <input
              type="number"
              placeholder="pH"
              value={ph}
              onChange={(e) =>
                setPh(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Fósforo"
              value={fosforo}
              onChange={(e) =>
                setFosforo(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Potássio"
              value={potassio}
              onChange={(e) =>
                setPotassio(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Cálcio"
              value={calcio}
              onChange={(e) =>
                setCalcio(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Magnésio"
              value={magnesio}
              onChange={(e) =>
                setMagnesio(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="CTC"
              value={ctc}
              onChange={(e) =>
                setCtc(e.target.value)
              }
              style={inputStyle}
            />

            <button
              onClick={analisarSolo}
              style={{
                background:
                  "linear-gradient(90deg,#00c853,#00ff88)",
                border: "none",
                padding: "18px",
                borderRadius: "15px",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚜 Gerar Recomendação
            </button>
          </div>
        </div>

        {/* RESULTADO */}

        <div
          style={{
            background:
              "rgba(0,0,0,0.55)",
            backdropFilter:
              "blur(10px)",
            borderRadius: "25px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              color: "#00ff88",
              fontSize: "40px",
              marginBottom: "25px",
            }}
          >
            📊 Resultado da Análise
          </h2>

          <Card
            titulo="Cultura"
            valor={cultura}
          />

          <Card
            titulo="pH"
            valor={ph}
          />

          <Card
            titulo="Fósforo"
            valor={fosforo}
          />

          <Card
            titulo="Potássio"
            valor={potassio}
          />

          <Card
            titulo="Cálcio"
            valor={calcio}
          />

          <Card
            titulo="Magnésio"
            valor={magnesio}
          />

          <Card
            titulo="CTC"
            valor={ctc}
          />

          <Card
            titulo="V%"
            valor={vBase}
          />

          <div
            style={{
              background:
                "rgba(255,255,255,0.06)",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                color: "#00ff88",
                marginBottom: "10px",
              }}
            >
              🌾 Recomendação Técnica
            </h3>

            <p
              style={{
                lineHeight: "30px",
              }}
            >
              {resultado}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

// CARD

function Card({
  titulo,
  valor,
}) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "15px",
      }}
    >
      <h3
        style={{
          color: "#00ff88",
          marginBottom: "10px",
        }}
      >
        {titulo}
      </h3>

      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {valor}
      </p>
    </div>
  );
}

// STYLE INPUT

const inputStyle = {
  padding: "18px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  fontSize: "18px",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  outline: "none",
};