"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [ph, setPh] = useState("");
  const [fosforo, setFosforo] = useState("");
  const [potassio, setPotassio] = useState("");
  const [calcio, setCalcio] = useState("");
  const [magnesio, setMagnesio] = useState("");
  const [ctc, setCtc] = useState("");

  const [resultado, setResultado] = useState("");
  const [vBase, setVBase] = useState("");

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
    }

    if (Number(ph) >= 5.5) {
      recomendacoes.push(
        "pH adequado para desenvolvimento da pastagem."
      );
    }

    // =========================
    // FÓSFORO
    // =========================

    if (Number(fosforo) < 15) {
      recomendacoes.push(
        "Fósforo baixo. Realizar adubação fosfatada."
      );
    }

    if (Number(fosforo) >= 15) {
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
    }

    if (Number(potassio) >= 40) {
      recomendacoes.push(
        "Potássio adequado."
      );
    }

    // =========================
    // V%
    // =========================

    if (v < 50) {
      recomendacoes.push(
        "Baixa saturação por bases. Necessária calagem."
      );
    }

    if (v >= 50 && v < 70) {
      recomendacoes.push(
        "Saturação por bases adequada para pastagem."
      );
    }

    if (v >= 70) {
      recomendacoes.push(
        "Solo com excelente fertilidade química."
      );
    }

    const textoFinal = recomendacoes.join(" ");

    setResultado(textoFinal);

    // =========================
    // PEGAR USUÁRIO
    // =========================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // =========================
    // SALVAR NO BANCO
    // =========================

    const { error } = await supabase
      .from("analises_solo")
      .insert([
        {
          usuario_id: user.id,
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

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#06152b",
        padding: "40px",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* TOPO */}
      <div
        style={{
          background:
            "linear-gradient(90deg, #00c853, #009624)",
          padding: "40px",
          borderRadius: "25px",
          marginBottom: "30px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            marginBottom: "10px",
          }}
        >
          AgroSolo Tech
        </h1>

        <p
          style={{
            fontSize: "30px",
          }}
        >
          Inteligência em Interpretação de Solo
        </p>

        <p
          style={{
            marginTop: "10px",
            opacity: 0.9,
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
            background: "#1e2d44",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              marginBottom: "20px",
              color: "#00ff88",
            }}
          >
            Dados da Análise
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <input
              type="number"
              placeholder="pH"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
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
              placeholder="Cálcio (Ca)"
              value={calcio}
              onChange={(e) =>
                setCalcio(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Magnésio (Mg)"
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
                background: "#00c853",
                border: "none",
                padding: "20px",
                borderRadius: "12px",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              🚜 Gerar Recomendação
            </button>
          </div>
        </div>

        {/* RESULTADO */}
        <div
          style={{
            background: "#1e2d44",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              marginBottom: "20px",
              color: "#00ff88",
            }}
          >
            Resultado da Análise
          </h2>

          <Card titulo="pH" valor={ph} />
          <Card titulo="Fósforo" valor={fosforo} />
          <Card titulo="Potássio" valor={potassio} />
          <Card titulo="Cálcio" valor={calcio} />
          <Card titulo="Magnésio" valor={magnesio} />
          <Card titulo="CTC" valor={ctc} />
          <Card titulo="V%" valor={vBase} />

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
              marginTop: "20px",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "15px",
                color: "#00ff88",
              }}
            >
              Recomendação Técnica
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
        background: "#06152b",
        padding: "20px",
        borderRadius: "15px",
        marginBottom: "15px",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: "#00ff88",
        }}
      >
        {titulo}
      </h3>

      <p
        style={{
          fontSize: "22px",
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
  borderRadius: "10px",
  border: "none",
  fontSize: "18px",
  background: "#06152b",
  color: "white",
};