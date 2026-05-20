"use client";

import { useState } from "react";

export default function Home() {
  // =========================
  // STATES
  // =========================

  const [cultura, setCultura] =
    useState("Pastagem");

  const [ph, setPh] = useState("");

  const [fosforo, setFosforo] =
    useState("");

  const [potassio, setPotassio] =
    useState("");

  const [calcio, setCalcio] =
    useState("");

  const [magnesio, setMagnesio] =
    useState("");

  const [ctc, setCtc] =
    useState("");

  const [area, setArea] =
    useState("");

  const [alqueire, setAlqueire] =
    useState("");

  const [resultado, setResultado] =
    useState("");

  const [vBase, setVBase] =
    useState("");

  // =========================
  // ANALISAR SOLO
  // =========================

  function analisarSolo() {
    let recomendacoes = [];

    // =========================
    // V%
    // =========================

    const V1 =
      ((Number(calcio) +
        Number(magnesio) +
        Number(potassio)) /
        Number(ctc)) *
      100;

    setVBase(V1.toFixed(1));

    // =========================
    // V2 CULTURA
    // =========================

    let V2 = 50;

    if (cultura === "Pastagem") {
      V2 = 50;
    }

    if (cultura === "Soja") {
      V2 = 60;
    }

    if (cultura === "Milho") {
      V2 = 65;
    }

    if (cultura === "Café") {
      V2 = 70;
    }

    // =========================
    // CALAGEM
    // =========================

    const NC =
      ((V2 - V1) *
        Number(ctc)) /
      100;

    // =========================
    // SACOS POR HECTARE
    // =========================

    const sacosCalcario =
      NC * 40;

    // =========================
    // ÁREA EM HECTARES
    // =========================

    const totalCalcario =
      NC * Number(area);

    const totalSacos =
      sacosCalcario *
      Number(area);

    // =========================
    // ALQUEIRE PAULISTA
    // =========================

    const hectaresAlqueire =
      Number(alqueire) * 2.42;

    const totalCalcarioAlqueire =
      NC * hectaresAlqueire;

    const totalSacosAlqueire =
      sacosCalcario *
      hectaresAlqueire;

    // =========================
    // pH
    // =========================

    if (Number(ph) < 5.5) {
      recomendacoes.push(
        "Solo ácido. Necessária correção com calcário."
      );
    } else {
      recomendacoes.push(
        "pH adequado."
      );
    }

    // =========================
    // FÓSFORO
    // =========================

    if (Number(fosforo) < 15) {
      recomendacoes.push(
        "Fósforo baixo. Realizar adubação fosfatada."
      );
    } else {
      recomendacoes.push(
        "Fósforo adequado."
      );
    }

    // =========================
    // POTÁSSIO
    // =========================

    if (Number(potassio) < 40) {
      recomendacoes.push(
        "Potássio baixo. Necessária correção potássica."
      );
    } else {
      recomendacoes.push(
        "Potássio adequado."
      );
    }

    // =========================
    // CALAGEM
    // =========================

    if (NC > 0) {
      recomendacoes.push(
        `Necessidade de calagem:
${NC.toFixed(
  2
)} t/ha de calcário
(${sacosCalcario.toFixed(
          0
        )} sacos por hectare).`
      );
    } else {
      recomendacoes.push(
        "Não há necessidade de calagem."
      );
    }

    // =========================
    // HECTARES
    // =========================

    if (Number(area) > 0) {
      recomendacoes.push(
        `
Para ${area} hectares:
${totalCalcario.toFixed(
          2
        )} toneladas de calcário
(${totalSacos.toFixed(
          0
        )} sacos no total).`
      );
    }

    // =========================
    // ALQUEIRE
    // =========================

    if (Number(alqueire) > 0) {
      recomendacoes.push(
        `
Para ${alqueire} alqueires paulistas:
${totalCalcarioAlqueire.toFixed(
          2
        )} toneladas de calcário
(${totalSacosAlqueire.toFixed(
          0
        )} sacos no total).`
      );
    }

    // =========================
    // RESULTADO FINAL
    // =========================

    setResultado(
      recomendacoes.join(" ")
    );
  }

  // =========================
  // RETURN
  // =========================

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
          background:
            "rgba(0,0,0,0.55)",
          backdropFilter:
            "blur(10px)",
          borderRadius: "25px",
          padding: "40px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            color: "#00ff88",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            fontSize: "28px",
          }}
        >
          Inteligência em
          Interpretação de Solo
        </p>

        <p
          style={{
            opacity: 0.8,
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
        {/* FORMULÁRIO */}

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
            {/* CULTURA */}

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

            {/* INPUTS */}

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

            <input
              type="number"
              placeholder="Área (hectares)"
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Área (alqueire paulista)"
              value={alqueire}
              onChange={(e) =>
                setAlqueire(
                  e.target.value
                )
              }
              style={inputStyle}
            />

            {/* BOTÃO */}

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

          {/* RECOMENDAÇÃO */}

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
                whiteSpace: "pre-line",
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

// =========================
// CARD
// =========================

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

// =========================
// STYLE INPUT
// =========================

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