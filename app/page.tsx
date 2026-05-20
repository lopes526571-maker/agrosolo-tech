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
    const recomendacoes = [];

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
      recomendacoes.push("Aplicar calcário.");
    }

    // =========================
    // FÓSFORO
    // =========================

    if (Number(fosforo) < 15) {
      recomendacoes.push("Corrigir fósforo.");
    }

    // =========================
    // POTÁSSIO
    // =========================

    if (Number(potassio) < 40) {
      recomendacoes.push("Potássio baixo.");
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
        "Solo com boa fertilidade química."
      );
    }

    const textoFinal = recomendacoes.join(" ");

    setResultado(textoFinal);

    // =========================
    // SALVAR NO SUPABASE
    // =========================

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("analises_solo").insert([
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
      <div
        style={{
          background: "#00c853",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "60px" }}>
          AgroSolo Tech
        </h1>

        <p style={{ fontSize: "28px" }}>
          Inteligência em Interpretação de Solo
        </p>

        <p>Baseado no Boletim 100 de São Paulo</p>
      </div>

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
              onChange={(e) => setCtc(e.target.value)}
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
              }}
            >
              🌱 Gerar Recomendação
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

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>pH</h3>
            <p>{ph}</p>
          </div>

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Fósforo</h3>
            <p>{fosforo}</p>
          </div>

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>Potássio</h3>
            <p>{potassio}</p>
          </div>

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          >
            <h3>V%</h3>
            <p>{vBase}</p>
          </div>

          <div
            style={{
              background: "#06152b",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <h3>Recomendação Técnica</h3>

            <p
              style={{
                marginTop: "15px",
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

const inputStyle = {
  padding: "18px",
  borderRadius: "10px",
  border: "none",
  fontSize: "18px",
  background: "#06152b",
  color: "white",
};