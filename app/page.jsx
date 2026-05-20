"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  // =========================
  // STATES
  // =========================

  const [cultura, setCultura] =
    useState("Pastagem");

  const [ph, setPh] = useState("");
  const [fosforo, setFosforo] = useState("");
  const [potassio, setPotassio] = useState("");
  const [calcio, setCalcio] = useState("");
  const [magnesio, setMagnesio] = useState("");
  const [ctc, setCtc] = useState("");

  const [resultado, setResultado] = useState("");
  const [vBase, setVBase] = useState("");

  // =========================
  // ANALISAR SOLO
  // =========================

  async function analisarSolo() {
    let recomendacoes = [];

    // =========================
    // CÁLCULO V%
    // =========================

    const v =
      ((Number(calcio) +
        Number(magnesio) +
        Number(potassio)) /
        Number(ctc)) *
      100;

    setVBase(v.toFixed(1));

    // =========================
    // pH
    // =========================

    if (Number(ph) < 5.5) {
      recomendacoes.push(
        "Aplicar calcário para correção da acidez."
      );
    } else {
      recomendacoes.push(
        "pH adequado para desenvolvimento."
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
        "Fósforo em nível adequado."
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
    // CULTURAS
    // =========================

    if (
      cultura === "Pastagem" &&
      v < 50
    ) {
      recomendacoes.push(
        "Pastagem com baixa saturação por bases."
      );
    }

    if (
      cultura === "Soja" &&
      v < 60
    ) {
      recomendacoes.push(
        "Soja necessita maior correção de solo."
      );
    }

    if (
      cultura === "Milho" &&
      v < 65
    ) {
      recomendacoes.push(
        "Milho exige maior fertilidade."
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

    // =========================
    // RESULTADO FINAL
    // =========================

    const textoFinal =
      recomendacoes.join(" ");

    setResultado(textoFinal);

    // =========================
    // PEGAR USUÁRIO
    // =========================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // =========================
    // SALVAR NO SUPABASE
    // =========================

    const { error } = await supabase
      .from("analises_solo")
      .insert([
        {
          usuario_id: user?.id,
          cultura,
          ph: Number(ph),
          fosforo: Number(fosforo),
          potassio: Number(potassio),
          calcio: Number(calcio),
          magnesio: Number(magnesio),
          ctc: Number(ctc),
          v_percentual: Number(v.toFixed(1)),
          recomendacao: textoFinal,
        },
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Análise salva com sucesso 🚜");
    }
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
            fontWeight: "bold",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            fontSize: "30px",
            marginBottom: "10px",
            color: "white",
          }}
        >
          Inteligência em Interpretação de Solo
        </p>

        <p
          style={{
            opacity: 0.8,
            fontSize: "18px",
            color: "white",
          }}
        >
          Baseado no Boletim 100 de São Paulo
        </p>
      </div>

      {/* GRID */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* FORMULÁRIO */}

        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            borderRadius: "25px",
            padding: "30px",
            border:
              "1px solid rgba(255,255,255,0.1)",
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
                setCultura(e.target.value)
              }
              style={inputStyle}
            >
              <option>Pastagem</option>
              <option>Soja</option>
              <option>Milho</option>
              <option>Café</option>
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
                setFosforo(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Potássio"
              value={potassio}
              onChange={(e) =>
                setPotassio(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Cálcio"
              value={calcio}
              onChange={(e) =>
                setCalcio(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Magnésio"
              value={magnesio}
              onChange={(e) =>
                setMagnesio(e.target.value)
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
                marginTop: "10px",
              }}
            >
              🚜 Gerar Recomendação
            </button>
          </div>
        </div>

        {/* RESULTADOS */}

        <div
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
            borderRadius: "25px",
            padding: "30px",
            border:
              "1px solid rgba(255,255,255,0.1)",
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

          <Card titulo="pH" valor={ph} />

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

          <Card titulo="CTC" valor={ctc} />

          <Card titulo="V%" valor={vBase} />

          <div
            style={{
              background: "rgba(0,0,0,0.45)",
              padding: "20px",
              borderRadius: "20px",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                color: "#00ff88",
                marginBottom: "15px",
                fontSize: "28px",
              }}
            >
              🌾 Recomendação Técnica
            </h3>

            <p
              style={{
                lineHeight: "32px",
                fontSize: "18px",
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

function Card({ titulo, valor }) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.06)",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "15px",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: "#00ff88",
          fontSize: "22px",
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
// INPUT STYLE
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